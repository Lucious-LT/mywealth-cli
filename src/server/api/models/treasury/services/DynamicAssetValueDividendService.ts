/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { DynamicAssetValueDividend } from '../models/DynamicAssetValueDividend';
import type { DynamicAssetValueDividendRequest } from '../models/DynamicAssetValueDividendRequest';
import type { DynAssetValueDividendListSort } from '../models/DynAssetValueDividendListSort';
import type { DynAssetValueDividendSearchSort } from '../models/DynAssetValueDividendSearchSort';
import type { PageTemplateDynamicAssetValueDividend } from '../models/PageTemplateDynamicAssetValueDividend';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionUploadRequest } from '../models/TransactionUploadRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DynamicAssetValueDividendService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new dynamic asset value dividend
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public addDynamicAssetValueDividend(
        xTenantId: string,
        requestBody: DynamicAssetValueDividendRequest,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend',
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
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public approveDynamicAssetValueDividendById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/approve/{id}',
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
     * Retrieve a dynamic asset value dividend
     * Retrieve a dynamic asset value dividend using the transaction code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public findDynamicAssetValueDividendByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/code/{code}',
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
     * List dynamic asset value dividends
     * Retrieve dynamic asset value in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateDynamicAssetValueDividend OK
     * @throws ApiError
     */
    public listDynamicAssetValueDividend(
        order: Direction,
        sort: DynAssetValueDividendListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateDynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/list',
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
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public postDynamicAssetValueDividendById(
        xTenantId: string,
        id: UUID,
        xIdempotencyId?: string | null,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/post/{id}',
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
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseDynamicAssetValueDividendById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/reverse/{id}',
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
     * @returns PageTemplateDynamicAssetValueDividend OK
     * @throws ApiError
     */
    public searchDynamicAssetValueDividend(
        order: Direction,
        sort: DynAssetValueDividendSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateDynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/search',
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
     * Create or update dyn asset value dividends using the uploaded excel file
     * Creates or update dyn asset value dividends in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param createMissingSecurity
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadDynamicAssetValueDividends(
        xTenantId: string,
        formData: TransactionUploadRequest,
        createMissingSecurity?: boolean,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/upload',
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
     * Retrieve a dynamic asset value dividend
     * Retrieve a dynamic asset value dividend using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public findDynamicAssetValueDividendById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/{id}',
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
     * Update a dynamic asset value dividend record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DynamicAssetValueDividend Indicates that the request was successful.
     * @throws ApiError
     */
    public updateDynamicAssetValueDividend(
        id: UUID,
        xTenantId: string,
        requestBody: DynamicAssetValueDividendRequest,
    ): CancelablePromise<DynamicAssetValueDividend> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/{id}',
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
     * Delete a dynamic asset value dividend
     * Delete a dynamic asset value dividend using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse OK
     * @throws ApiError
     */
    public deleteDynamicAssetValueDividend(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/treasury/api/v1/transaction/dyn-asset-value/dividend/{id}',
            path: {
                'id': id,
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

}
