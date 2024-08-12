/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { FixedIncomeTerminationRequest } from '../models/FixedIncomeTerminationRequest';
import type { FixedIncomeTransaction } from '../models/FixedIncomeTransaction';
import type { FixedIncomeTransactionListSort } from '../models/FixedIncomeTransactionListSort';
import type { FixedIncomeTransactionRequest } from '../models/FixedIncomeTransactionRequest';
import type { FixedIncomeTransactionSearchSort } from '../models/FixedIncomeTransactionSearchSort';
import type { PageTemplateFixedIncomeTransaction } from '../models/PageTemplateFixedIncomeTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionUploadRequest } from '../models/TransactionUploadRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedIncomeTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fixed income transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addFixedIncomeTransaction(
        xTenantId: string,
        requestBody: FixedIncomeTransactionRequest,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/fixed_income',
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
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approveFixedIncomeTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/fixed_income/approve/{id}',
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
     * Retrieve a fixed income transaction
     * Retrieve a fixed income transaction using the transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedIncomeTransactionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/fixed_income/code/{code}',
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
     * List fixed income transactions
     * Retrieve fixed income in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFixedIncomeTransaction OK
     * @throws ApiError
     */
    public listFixedIncomeTransaction(
        order: Direction,
        sort: FixedIncomeTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/fixed_income/list',
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
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postFixedIncomeTransactionById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/fixed_income/post/{id}',
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
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseFixedIncomeTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/fixed_income/reverse/{id}',
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
     * Search for fixed income transactions using the full text search engine
     * Search for fixed income in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFixedIncomeTransaction OK
     * @throws ApiError
     */
    public searchFixedIncomeTransaction(
        order: Direction,
        sort: FixedIncomeTransactionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/fixed_income/search',
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
     * Sell a fixed income asset
     * Sells from running fixed income position using the specified clean price and face value. The transaction is posted immediately and terminated if the face value is fully sold.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public sellFixedIncomeTransaction(
        xTenantId: string,
        requestBody: FixedIncomeTerminationRequest,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/fixed_income/sell',
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
     * Create or update fixed income transactions using the uploaded excel file
     * Creates or update fixed income transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param createMissingSecurity
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadFixedIncomeTransactions(
        xTenantId: string,
        formData: TransactionUploadRequest,
        createMissingSecurity?: boolean,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/fixed_income/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'createMissingSecurity': createMissingSecurity,
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
     * Retrieve a fixed income transaction
     * Retrieve a fixed income transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedIncomeTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/fixed_income/{id}',
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
     * Update a fixed income transaction record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedIncomeTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFixedIncomeTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: FixedIncomeTransactionRequest,
    ): CancelablePromise<FixedIncomeTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/transaction/fixed_income/{id}',
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
     * Delete a fixed income transaction
     * Delete a fixed income transaction using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFixedIncomeTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/transaction/fixed_income/{id}',
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
