/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { FixedAsset } from '../models/FixedAsset';
import type { FixedAssetListSort } from '../models/FixedAssetListSort';
import type { FixedAssetRequest } from '../models/FixedAssetRequest';
import type { FixedAssetSearchSort } from '../models/FixedAssetSearchSort';
import type { LocalDate } from '../models/LocalDate';
import type { PageTemplateFixedAsset } from '../models/PageTemplateFixedAsset';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedAssetService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fixed asset
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public addFixedAsset(
        xTenantId: string,
        requestBody: FixedAssetRequest,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/fixed_assets',
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
     * Approve a fixed asset
     * Approve a fixed asset using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public approveFixedAssetById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/fixed_assets/approve/{id}',
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
     * Cancel a fixed asset
     * Cancel a fixed asset using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelFixedAssetById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/fixed_assets/cancel/{id}',
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
     * Retrieve a fixed asset
     * Retrieve a fixed asset using the fixed_asset code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedAssetByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_assets/code/{code}',
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
     * Dispose a fixed asset
     * Dispose a fixed asset using the record ID and the transaction details.
     * @param id
     * @param disposalCost
     * @param disposalDate
     * @param disposalValue
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public disposeFixedAssetById(
        id: UUID,
        disposalCost: number,
        disposalDate: LocalDate,
        disposalValue: number,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/fixed_assets/dispose/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'disposalCost': disposalCost,
                'disposalDate': disposalDate,
                'disposalValue': disposalValue,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List fixed assets
     * Retrieve fixed assets in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFixedAsset OK
     * @throws ApiError
     */
    public listFixedAsset(
        order: Direction,
        sort: FixedAssetListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedAsset> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_assets/list',
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
     * Approve a fixed asset
     * Approve a fixed asset using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseFixedAssetById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/fixed_assets/reverse/{id}',
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
     * Search for fixed assets using a full text search engine
     * Search for fixed assets in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFixedAsset OK
     * @throws ApiError
     */
    public searchFixedAsset(
        order: Direction,
        sort: FixedAssetSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedAsset> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_assets/search',
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
     * Start a fixed asset
     * Start a fixed asset using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public startFixedAssetById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/fixed_assets/start/{id}',
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
     * Retrieve afixed asset
     * Retrieve afixed asset using the fixed_asset ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedAssetById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_assets/{id}',
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
     * Update a fixed asset record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedAsset Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFixedAsset(
        id: UUID,
        xTenantId: string,
        requestBody: FixedAssetRequest,
    ): CancelablePromise<FixedAsset> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/fixed_assets/{id}',
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
     * Delete a fixed asset
     * Delete a fixed asset using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFixedAsset(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/fixed_assets/{id}',
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
