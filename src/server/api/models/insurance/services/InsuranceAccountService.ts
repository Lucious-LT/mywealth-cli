/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { InsuranceAccount } from '../models/InsuranceAccount';
import type { InsuranceAccountListSort } from '../models/InsuranceAccountListSort';
import type { InsuranceAccountRequest } from '../models/InsuranceAccountRequest';
import type { InsuranceAccountSearchSort } from '../models/InsuranceAccountSearchSort';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateInsuranceAccount } from '../models/PageTemplateInsuranceAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InsuranceAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new insurance account
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public addInsuranceAccount(
        xTenantId: string,
        requestBody: InsuranceAccountRequest,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/cash/accounts',
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
     * Approve a insurance account
     * Approve a insurance account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public approveInsuranceAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/cash/accounts/approve/{id}',
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
     * Get a insurance account balance
     * Get an account balance using the ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getInsuranceAccountBalance(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/balance/account/{accountId}',
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
     * Update an account balance
     * Update an account balance after a transaction. This is used internally by the accounting module to update balances after transactions have been committed.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public updateAccountBalance(
        id: UUID,
        xTenantId: string,
        requestBody: Money,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/cash/accounts/balance/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Block a insurance account
     * Block a insurance account using the insurance account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public blockInsuranceAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/cash/accounts/block/{id}',
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
     * Retrieve accounts for a client using the ID
     * Retrieve accounts for a client using the ID
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount OK
     * @throws ApiError
     */
    public findForClientById(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<InsuranceAccount>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/client/{clientId}',
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
     * Close a insurance account
     * Close a insurance account using the insurance_account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public closeInsuranceAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/cash/accounts/close/{id}',
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
     * Retrieve a insurance account
     * Retrieve an account using the account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findInsuranceAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/code/{code}',
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
     * List insurance accounts
     * Retrieve accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateInsuranceAccount OK
     * @throws ApiError
     */
    public listInsuranceAccount(
        order: Direction,
        sort: InsuranceAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateInsuranceAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/list',
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
     * Search for insurance accounts using a full text search engine
     * Search for accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateInsuranceAccount OK
     * @throws ApiError
     */
    public searchInsuranceAccount(
        order: Direction,
        sort: InsuranceAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateInsuranceAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/search',
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
     * Remove a insurance account block
     * Remove a insurance account block using the insurance account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public unblockInsuranceAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/cash/accounts/unblock/{id}',
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
     * Retrieve an insurance account
     * Retrieve an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findInsuranceAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/cash/accounts/{id}',
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
     * Update a insurance account record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InsuranceAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public updateInsuranceAccount(
        id: UUID,
        xTenantId: string,
        requestBody: InsuranceAccountRequest,
    ): CancelablePromise<InsuranceAccount> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/cash/accounts/{id}',
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
     * Delete a insurance account
     * Delete an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteInsuranceAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/cash/accounts/{id}',
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
