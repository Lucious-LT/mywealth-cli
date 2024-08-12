/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { MoneyMarketTerminationRequest } from '../models/MoneyMarketTerminationRequest';
import type { MoneyMarketTransaction } from '../models/MoneyMarketTransaction';
import type { MoneyMarketTransactionListSort } from '../models/MoneyMarketTransactionListSort';
import type { MoneyMarketTransactionRequest } from '../models/MoneyMarketTransactionRequest';
import type { MoneyMarketTransactionSearchSort } from '../models/MoneyMarketTransactionSearchSort';
import type { PageTemplateMoneyMarketTransaction } from '../models/PageTemplateMoneyMarketTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionUploadRequest } from '../models/TransactionUploadRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MoneyMarketTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new money market transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addMoneyMarketTransaction(
        xTenantId: string,
        requestBody: MoneyMarketTransactionRequest,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/money_market',
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
     * Approve a transaction
     * Approve a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approveMoneyMarketTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/money_market/approve/{id}',
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
     * Retrieve a money market transaction
     * Retrieve a money market transaction using the transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findMoneyMarketTransactionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/money_market/code/{code}',
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
     * List money market transactions
     * Retrieve money market in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public listMoneyMarketTransaction(
        order: Direction,
        sort: MoneyMarketTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/money_market/list',
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
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postMoneyMarketTransactionById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/money_market/post/{id}',
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
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseMoneyMarketTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/money_market/reverse/{id}',
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
     * Search for money market transactions using a full text search engine
     * Search for money market in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public searchMoneyMarketTransaction(
        order: Direction,
        sort: MoneyMarketTransactionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/money_market/search',
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
     * Terminate a money market transaction
     * Terminates a running transaction in the system and rolls over the balance using the specified discount rate.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public terminateMoneyMarketTransaction(
        xTenantId: string,
        requestBody: MoneyMarketTerminationRequest,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/money_market/terminate',
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
     * Create or update money market transactions using the uploaded excel file
     * Creates or update fixed income transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format.
     * @param xTenantId The tenant identifier
     * @param formData
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadMoneyMarketTransactions(
        xTenantId: string,
        formData: TransactionUploadRequest,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/money_market/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a money market transaction
     * Retrieve a money market transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findMoneyMarketTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/money_market/{id}',
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
     * Update a money market transaction record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateMoneyMarketTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: MoneyMarketTransactionRequest,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/transaction/money_market/{id}',
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
     * Delete a money market transaction
     * Delete a money market transaction using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteMoneyMarketTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/transaction/money_market/{id}',
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
