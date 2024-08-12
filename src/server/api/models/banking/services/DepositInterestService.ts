/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositProductInterest } from '../models/DepositProductInterest';
import type { DepositProductInterestListSort } from '../models/DepositProductInterestListSort';
import type { DepositProductInterestRequest } from '../models/DepositProductInterestRequest';
import type { DepositProductInterestSearchSort } from '../models/DepositProductInterestSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateDepositProductInterest } from '../models/PageTemplateDepositProductInterest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DepositInterestService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new deposit interest
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public addDepositInterest(
        xTenantId: string,
        requestBody: DepositProductInterestRequest,
    ): CancelablePromise<DepositProductInterest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/deposit/interests',
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
     * Retrieve a deposit interest
     * Retrieve an interest using the interest code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns DepositProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositInterestByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<DepositProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/interests/code/{code}',
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
     * List deposit interests
     * Retrieve interests in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateDepositProductInterest OK
     * @throws ApiError
     */
    public listDepositInterest(
        order: Direction,
        sort: DepositProductInterestListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/interests/list',
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
     * Search for deposit interests using a full text search engine
     * Search for interests in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateDepositProductInterest OK
     * @throws ApiError
     */
    public searchDepositInterest(
        order: Direction,
        sort: DepositProductInterestSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/interests/search',
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
     * Retrieve a deposit interest
     * Retrieve an interest using the interest ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositInterestById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/interests/{id}',
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
     * Update a deposit interest record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public updateDepositInterest(
        id: UUID,
        xTenantId: string,
        requestBody: DepositProductInterestRequest,
    ): CancelablePromise<DepositProductInterest> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/deposit/interests/{id}',
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
     * Delete a deposit interest
     * Delete an interest using the interest ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteDepositInterest(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/deposit/interests/{id}',
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
