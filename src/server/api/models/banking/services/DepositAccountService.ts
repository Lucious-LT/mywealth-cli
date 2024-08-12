/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepositAccount } from '../models/DepositAccount';
import type { DepositAccountListSort } from '../models/DepositAccountListSort';
import type { DepositAccountRequest } from '../models/DepositAccountRequest';
import type { DepositAccountSearchSort } from '../models/DepositAccountSearchSort';
import type { DepositProduct } from '../models/DepositProduct';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateDepositAccount } from '../models/PageTemplateDepositAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DepositAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new deposit account
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public addDepositAccount(
        xTenantId: string,
        requestBody: DepositAccountRequest,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/deposit/accounts',
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
     * Approve a deposit account
     * Approve a deposit account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public approveDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/deposit/accounts/approve/{id}',
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
     * Get a deposit account balance
     * Get an account balance using the ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getDepositAccountBalance(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/balance/account/{accountId}',
            path: {
                'accountId': accountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'valueDate': valueDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Block a deposit account
     * Block a deposit account using the deposit account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public blockDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/deposit/accounts/block/{id}',
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
     * Close a deposit account
     * Close a deposit account using the deposit_account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public closeDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/deposit/accounts/close/{id}',
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
     * Retrieve a deposit account
     * Retrieve an account using the account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/code/{code}',
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
     * List deposit accounts
     * Retrieve accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateDepositAccount OK
     * @throws ApiError
     */
    public listDepositAccount(
        order: Direction,
        sort: DepositAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/list',
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
     * List deposit accounts for a client
     * Retrieve deposit accounts for a client.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns DepositAccount OK
     * @throws ApiError
     */
    public listClientDepositAccounts(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<DepositAccount>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/list/client/{clientId}',
            path: {
                'clientId': clientId,
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
     * Retrieve a deposit product using the account ID
     * Retrieve a deposit product using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositAccountProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/product/{id}',
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
     * Reject a deposit account
     * Reject a deposit account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public rejectDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/deposit/accounts/reject/{id}',
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
     * Search for deposit accounts using a full text search engine
     * Search for accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateDepositAccount OK
     * @throws ApiError
     */
    public searchDepositAccount(
        order: Direction,
        sort: DepositAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/search',
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
     * Remove a deposit account block
     * Remove a deposit account block using the deposit account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public unblockDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/deposit/accounts/unblock/{id}',
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
     * Retrieve a deposit account
     * Retrieve an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/accounts/{id}',
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
     * Update a deposit account record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public updateDepositAccount(
        id: UUID,
        xTenantId: string,
        requestBody: DepositAccountRequest,
    ): CancelablePromise<DepositAccount> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/deposit/accounts/{id}',
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
     * Delete a deposit account
     * Delete an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteDepositAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/deposit/accounts/{id}',
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
