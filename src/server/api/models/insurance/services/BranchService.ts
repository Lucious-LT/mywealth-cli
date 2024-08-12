/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Branch } from '../models/Branch';
import type { BranchListSort } from '../models/BranchListSort';
import type { BranchRequest } from '../models/BranchRequest';
import type { BranchSearchSort } from '../models/BranchSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateBranch } from '../models/PageTemplateBranch';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BranchService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new branch
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Branch Indicates that the request was successful.
     * @throws ApiError
     */
    public addBranch(
        xTenantId: string,
        requestBody: BranchRequest,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/branches',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a branch
     * Retrieve a branch using the branch code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Branch Indicates that the request was successful.
     * @throws ApiError
     */
    public findBranchByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/branches/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Validate a branch code
     * Validate a branch using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param branchId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isBranchCodeAvailable(
        code: string,
        xTenantId: string,
        branchId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/branches/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'branchId': branchId,
                'code': code,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List branches
     * Retrieve branches in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBranch OK
     * @throws ApiError
     */
    public listBranch(
        order: Direction,
        sort: BranchListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBranch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/branches/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Search for branches using a full text search engine
     * Search for branches in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateBranch OK
     * @throws ApiError
     */
    public searchBranch(
        order: Direction,
        sort: BranchSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateBranch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/branches/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'pattern': pattern,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a branch
     * Retrieve a branch using the branch ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Branch Indicates that the request was successful.
     * @throws ApiError
     */
    public findBranchById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/branches/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Update a branch record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Branch Indicates that the request was successful.
     * @throws ApiError
     */
    public updateBranch(
        id: UUID,
        xTenantId: string,
        requestBody: BranchRequest,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/branches/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Delete a branch
     * Delete a branch using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteBranch(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/branches/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
