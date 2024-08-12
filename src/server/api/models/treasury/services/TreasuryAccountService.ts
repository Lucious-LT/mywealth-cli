/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplateTreasuryAccount } from '../models/PageTemplateTreasuryAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TreasuryAccount } from '../models/TreasuryAccount';
import type { TreasuryAccountListSort } from '../models/TreasuryAccountListSort';
import type { TreasuryAccountRequest } from '../models/TreasuryAccountRequest';
import type { TreasuryAccountSearchSort } from '../models/TreasuryAccountSearchSort';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TreasuryAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new treasury account
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TreasuryAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public addTreasuryAccount(
        xTenantId: string,
        requestBody: TreasuryAccountRequest,
    ): CancelablePromise<TreasuryAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/treasury_accounts',
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
     * Retrieve a treasury account
     * Retrieve an treasury account using the treasury account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns TreasuryAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findTreasuryAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<TreasuryAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_accounts/code/{code}',
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
     * List treasury accounts
     * Retrieve treasury accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTreasuryAccount OK
     * @throws ApiError
     */
    public listTreasuryAccount(
        order: Direction,
        sort: TreasuryAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTreasuryAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_accounts/list',
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
     * List treasury accounts for a book
     * Retrieve treasury accounts for a book.
     * @param bookId
     * @param xTenantId The tenant identifier
     * @returns TreasuryAccount OK
     * @throws ApiError
     */
    public listTreasuryBookAccounts(
        bookId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<TreasuryAccount>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_accounts/list/{bookId}',
            path: {
                'bookId': bookId,
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
     * Search for treasury accounts using a full text search engine
     * Search for treasury accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTreasuryAccount OK
     * @throws ApiError
     */
    public searchTreasuryAccount(
        order: Direction,
        sort: TreasuryAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTreasuryAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_accounts/search',
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
     * Retrieve a treasury account
     * Retrieve a treasury account using the treasury account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TreasuryAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findTreasuryAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TreasuryAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_accounts/{id}',
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
     * Update a treasury account record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TreasuryAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTreasuryAccount(
        id: UUID,
        xTenantId: string,
        requestBody: TreasuryAccountRequest,
    ): CancelablePromise<TreasuryAccount> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/treasury/api/v1/treasury_accounts/{id}',
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
     * Delete a treasury account
     * Delete a treasury account using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTreasuryAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/treasury/api/v1/treasury_accounts/{id}',
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
