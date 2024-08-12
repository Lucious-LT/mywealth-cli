/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { FundAccount } from '../models/FundAccount';
import type { FundAccountListSort } from '../models/FundAccountListSort';
import type { FundAccountRequest } from '../models/FundAccountRequest';
import type { FundAccountSearchSort } from '../models/FundAccountSearchSort';
import type { PageTemplateFundAccount } from '../models/PageTemplateFundAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FundAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new funds account
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public addFundAccount(
        xTenantId: string,
        requestBody: FundAccountRequest,
    ): CancelablePromise<FundAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/funds_accounts',
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
     * Retrieve a funds account
     * Retrieve an funds account using the funds account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FundAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FundAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds_accounts/code/{code}',
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
     * List funds accounts
     * Retrieve funds accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFundAccount OK
     * @throws ApiError
     */
    public listFundAccount(
        order: Direction,
        sort: FundAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFundAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds_accounts/list',
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
     * List funds accounts for a fund
     * Retrieve funds accounts for a fund.
     * @param fundId
     * @param xTenantId The tenant identifier
     * @returns FundAccount OK
     * @throws ApiError
     */
    public listFundAccounts(
        fundId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<FundAccount>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds_accounts/list/{fundId}',
            path: {
                'fundId': fundId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Search for funds accounts using a full text search engine
     * Search for funds accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFundAccount OK
     * @throws ApiError
     */
    public searchFundAccount(
        order: Direction,
        sort: FundAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFundAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds_accounts/search',
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
     * Retrieve a funds account
     * Retrieve a funds account using the funds account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FundAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FundAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds_accounts/{id}',
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
     * Update a funds account record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFundAccount(
        id: UUID,
        xTenantId: string,
        requestBody: FundAccountRequest,
    ): CancelablePromise<FundAccount> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/funds_accounts/{id}',
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
     * Delete a funds account
     * Delete a funds account using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFundAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/funds_accounts/{id}',
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
