/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { PageTemplatePlacementTransaction } from '../models/PageTemplatePlacementTransaction';
import type { PlacementListSort } from '../models/PlacementListSort';
import type { PlacementSearchSort } from '../models/PlacementSearchSort';
import type { PlacementTransaction } from '../models/PlacementTransaction';
import type { PlacementTransactionRequest } from '../models/PlacementTransactionRequest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionUploadRequest } from '../models/TransactionUploadRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PlacementTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new placement transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addPlacementTransaction(
        xTenantId: string,
        requestBody: PlacementTransactionRequest,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/placement',
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
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approvePlacementTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/placement/approve/{id}',
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
     * Retrieve a placement transaction
     * Retrieve a placement transaction using the transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findPlacementTransactionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/placement/code/{code}',
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
     * List placement transactions
     * Retrieve placement in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePlacementTransaction OK
     * @throws ApiError
     */
    public listPlacementTransaction(
        order: Direction,
        sort: PlacementListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePlacementTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/placement/list',
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
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postPlacementTransactionById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/placement/post/{id}',
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
     * Terminate a transaction
     * Terminate a transaction using the transaction ID and termination date.
     * @param terminationDate
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public terminatePlacementTransactionById(
        terminationDate: LocalDate,
        transactionId: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/placement/post/{transactionId}/{terminationDate}',
            path: {
                'terminationDate': terminationDate,
                'transactionId': transactionId,
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
     * Reverse a transaction
     * Reverse a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reversePlacementTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/transaction/placement/reverse/{id}',
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
     * Search for placement transactions using a full text search engine
     * Search for placement in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePlacementTransaction OK
     * @throws ApiError
     */
    public searchPlacementTransaction(
        order: Direction,
        sort: PlacementSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePlacementTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/placement/search',
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
     * Create or update placement transactions using the uploaded excel file
     * Creates or update placement transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format.
     * @param xTenantId The tenant identifier
     * @param formData
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadPlacementTransactions(
        xTenantId: string,
        formData: TransactionUploadRequest,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/transaction/placement/upload',
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
     * Retrieve a placement transaction
     * Retrieve a placement transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findPlacementTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/transaction/placement/{id}',
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
     * Update a placement transaction record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePlacementTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: PlacementTransactionRequest,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/transaction/placement/{id}',
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
     * Delete a placement transaction
     * Delete a placement transaction using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePlacementTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/transaction/placement/{id}',
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
