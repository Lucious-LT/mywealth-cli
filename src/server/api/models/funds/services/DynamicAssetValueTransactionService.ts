/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { DynamicAssetValueSaleRequest } from '../models/DynamicAssetValueSaleRequest';
import type { DynamicAssetValueTransaction } from '../models/DynamicAssetValueTransaction';
import type { DynamicAssetValueTransactionRequest } from '../models/DynamicAssetValueTransactionRequest';
import type { DynAssetValueTransactionListSort } from '../models/DynAssetValueTransactionListSort';
import type { DynAssetValueTransactionSearchSort } from '../models/DynAssetValueTransactionSearchSort';
import type { PageTemplateDynamicAssetValueTransaction } from '../models/PageTemplateDynamicAssetValueTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionUploadRequest } from '../models/TransactionUploadRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DynamicAssetValueTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new dynamic asset value transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addDynamicAssetValueTransaction(
        xTenantId: string,
        requestBody: DynamicAssetValueTransactionRequest,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/dyn_asset_value',
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
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approveDynamicAssetValueTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/dyn_asset_value/approve/{id}',
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
     * Retrieve a dynamic asset value transaction
     * Retrieve a dynamic asset value transaction using the transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findDynamicAssetValueTransactionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/dyn_asset_value/code/{code}',
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
     * List dynamic asset value transactions
     * Retrieve dynamic asset value in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateDynamicAssetValueTransaction OK
     * @throws ApiError
     */
    public listDynamicAssetValueTransaction(
        order: Direction,
        sort: DynAssetValueTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateDynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/dyn_asset_value/list',
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
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postDynamicAssetValueTransactionById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/dyn_asset_value/post/{id}',
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
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseDynamicAssetValueTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/dyn_asset_value/reverse/{id}',
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
     * Search for dynamic asset value transaction using a full text search engine
     * Search for dynamic asset value in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateDynamicAssetValueTransaction OK
     * @throws ApiError
     */
    public searchDynamicAssetValueTransaction(
        order: Direction,
        sort: DynAssetValueTransactionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateDynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/dyn_asset_value/search',
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
     * Sell a dynamic asset value asset
     * Sells from the current position using the specified price and quantity. The transaction is posted immediately and terminated if the position is fully sold.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public sellDynamicAssetValueTransaction(
        xTenantId: string,
        requestBody: DynamicAssetValueSaleRequest,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/dyn_asset_value/sell',
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
     * Create or update dyn asset value transactions using the uploaded excel file
     * Creates or update dyn asset value transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param createMissingSecurity
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadDynamicAssetValueTransactions(
        xTenantId: string,
        formData: TransactionUploadRequest,
        createMissingSecurity?: boolean,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/dyn_asset_value/upload',
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
     * Retrieve a dynamic asset value transaction
     * Retrieve a dynamic asset value transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findDynamicAssetValueTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/dyn_asset_value/{id}',
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
     * Update a dynamic asset value transaction record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DynamicAssetValueTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateDynamicAssetValueTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: DynamicAssetValueTransactionRequest,
    ): CancelablePromise<DynamicAssetValueTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/transaction/dyn_asset_value/{id}',
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
     * Delete a dynamic asset value transaction
     * Delete a dynamic asset value transaction using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteDynamicAssetValueTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/transaction/dyn_asset_value/{id}',
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
