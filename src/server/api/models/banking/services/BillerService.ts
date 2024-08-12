/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Biller } from '../models/Biller';
import type { BillerListSort } from '../models/BillerListSort';
import type { BillerRequest } from '../models/BillerRequest';
import type { BillerSearchSort } from '../models/BillerSearchSort';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { PageTemplateBiller } from '../models/PageTemplateBiller';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BillerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new biller
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Biller Indicates that the request was successful.
     * @throws ApiError
     */
    public addBiller(
        xTenantId: string,
        requestBody: BillerRequest,
    ): CancelablePromise<Biller> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/billers',
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
     * Retrieve a biller
     * Retrieve a biller using the biller code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Biller Indicates that the request was successful.
     * @throws ApiError
     */
    public findBillerByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Biller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/billers/code/{code}',
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
     * Validate a biller code
     * Validate a biller using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param billerId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isBillerCodeAvailable(
        code: string,
        xTenantId: string,
        billerId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/billers/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'billerId': billerId,
                'code': code,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List billers
     * Retrieve billers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBiller OK
     * @throws ApiError
     */
    public listBiller(
        order: Direction,
        sort: BillerListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBiller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/billers/list',
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
     * Search for billers using a full text search engine
     * Search for billers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateBiller OK
     * @throws ApiError
     */
    public searchBiller(
        order: Direction,
        sort: BillerSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateBiller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/billers/search',
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
     * Retrieve a biller
     * Retrieve a biller using the biller ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Biller Indicates that the request was successful.
     * @throws ApiError
     */
    public findBillerById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Biller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/billers/{id}',
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
     * Update a biller record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Biller Indicates that the request was successful.
     * @throws ApiError
     */
    public updateBiller(
        id: UUID,
        xTenantId: string,
        requestBody: BillerRequest,
    ): CancelablePromise<Biller> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/billers/{id}',
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
     * Delete a biller
     * Delete a biller using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteBiller(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/billers/{id}',
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
