/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountHold } from '../models/AccountHold';
import type { AccountHoldListSort } from '../models/AccountHoldListSort';
import type { AccountHoldRequest } from '../models/AccountHoldRequest';
import type { AccountHoldSearchSort } from '../models/AccountHoldSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateAccountHold } from '../models/PageTemplateAccountHold';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccountHoldService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new account hold
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public addAccountHold(
        xTenantId: string,
        requestBody: AccountHoldRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/account_holds',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * Create a new account hold that is automatically approved
     * Creates a new record in the system that is immediately approved. This API should be used by channels such as the payment gateway. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public addAndApproveAccountHold(
        xTenantId: string,
        requestBody: AccountHoldRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/account_holds/approve',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * Approve an account hold
     * Approve an account hold using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public approveAccountHoldById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/account_holds/approve/{id}',
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
     * Retrieve an account hold
     * Retrieve an account hold using the account hold code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountHoldByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_holds/code/{code}',
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
     * List account holds
     * Retrieve account holds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAccountHold OK
     * @throws ApiError
     */
    public listAccountHold(
        order: Direction,
        sort: AccountHoldListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAccountHold> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_holds/list',
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
     * List account holds for account
     * Retrieve account holds for an account in the system using the supported query parameters.
     * @param accountId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAccountHold OK
     * @throws ApiError
     */
    public listAccountHoldForAccount(
        accountId: UUID,
        order: Direction,
        sort: AccountHoldListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAccountHold> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_holds/list/account/{accountId}',
            path: {
                'accountId': accountId,
            },
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
     * Reverse an account hold
     * Reverse an account hold using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseAccountHoldById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/account_holds/reverse/{id}',
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
     * Search for account holds using a full text search engine
     * Search for account holds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAccountHold OK
     * @throws ApiError
     */
    public searchAccountHold(
        order: Direction,
        sort: AccountHoldSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccountHold> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_holds/search',
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
     * Retrieve an account hold
     * Retrieve an account hold using the account hold ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountHoldById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_holds/{id}',
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
     * Update an account hold record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AccountHold Indicates that the request was successful.
     * @throws ApiError
     */
    public updateAccountHold(
        id: UUID,
        xTenantId: string,
        requestBody: AccountHoldRequest,
    ): CancelablePromise<AccountHold> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/account_holds/{id}',
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
     * Delete an account hold
     * Delete an account hold using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteAccountHold(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/account_holds/{id}',
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
