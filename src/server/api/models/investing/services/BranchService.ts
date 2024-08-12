/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Branch } from '../models/Branch';
import type { BranchRequest } from '../models/BranchRequest';
import type { PageTemplateBranch } from '../models/PageTemplateBranch';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BranchService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new branch
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {branch_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Branch Success
     * @throws ApiError
     */
    public addBranch(
        xTenantId: string,
        requestBody: BranchRequest,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/branches',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve a branch
     * Retrieve a branch using the branch ID. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Branch OK
     * @throws ApiError
     */
    public findBranchById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a branch
     * Delete a branch using the branch ID. **Requires a valid token**. Roles Allowed: {branch_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteBranch(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/branches/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update a branch
     * Update a branch in the system. **Requires a valid token**. Roles Allowed: {branch_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Branch Success
     * @throws ApiError
     */
    public updateBranch(
        recordId: string,
        xTenantId: string,
        requestBody: BranchRequest,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/branches/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Validate a branch ID
     * Validate that a branch ID exists and is active. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateBranchId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for branches
     * Search for branches in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {branch_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateBranch OK
     * @throws ApiError
     */
    public searchBranch(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateBranch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'pattern': pattern,
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * List branches
     * List branches in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {branch_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateBranch OK
     * @throws ApiError
     */
    public listBranch(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'startDate' | 'endDate' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateBranch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * Validate a branch code
     * Validate a branch using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @param recordId
     * @returns BooleanResponse Success
     * @throws ApiError
     */
    public isBranchCodeAvailable(
        code: string,
        xTenantId: string,
        recordId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'recordId': recordId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve a branch
     * Retrieve a branch using the branch code. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Branch OK
     * @throws ApiError
     */
    public findBranchByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Branch> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/branches/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
