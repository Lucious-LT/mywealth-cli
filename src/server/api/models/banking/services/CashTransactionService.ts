/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CashTransaction } from '../models/CashTransaction';
import type { CashTransactionListSort } from '../models/CashTransactionListSort';
import type { CashTransactionRequest } from '../models/CashTransactionRequest';
import type { CashTransactionSearchSort } from '../models/CashTransactionSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCashTransaction } from '../models/PageTemplateCashTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CashTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new cash transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addCashTransaction(
        xTenantId: string,
        requestBody: CashTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/cash_transactions',
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
     * Approve a transaction
     * Approve a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approveCashTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cash_transactions/approve/{id}',
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
     * Retrieve a cash transaction
     * Retrieve a cash transaction using the cash transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findCashTransactionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cash_transactions/code/{code}',
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
     * List cash transactions
     * Retrieve cash transactions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public listCashTransaction(
        order: Direction,
        sort: CashTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cash_transactions/list',
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
     * List cash transactions for an account
     * Retrieve cash transactions for an account in the system using the supported query parameters.
     * @param accountId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public listCashTransactionForAccount(
        accountId: UUID,
        order: Direction,
        sort: CashTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cash_transactions/list/account/{accountId}',
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
     * Post a transaction
     * Post a transaction using the transaction ID.
     * @param xTenantId The tenant identifier
     * @param id
     * @param xIdempotencyId The idempotency key for the request
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postCashTransactionById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cash_transactions/post/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Reverse a transaction
     * Reverse a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseCashTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cash_transactions/reverse/{id}',
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
     * Search for cash transactions using a full text search engine
     * Search for cash transactions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public searchCashTransaction(
        order: Direction,
        sort: CashTransactionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cash_transactions/search',
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
     * Retrieve a cash transaction
     * Retrieve a cash transaction using the cash transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findCashTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cash_transactions/{id}',
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
     * Update a cash transaction record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CashTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCashTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: CashTransactionRequest,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/cash_transactions/{id}',
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
     * Delete a cash transaction
     * Delete a cash transaction using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCashTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/cash_transactions/{id}',
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
