/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { FixedAssetGroup } from '../models/FixedAssetGroup';
import type { FixedAssetGroupListSort } from '../models/FixedAssetGroupListSort';
import type { FixedAssetGroupRequest } from '../models/FixedAssetGroupRequest';
import type { FixedAssetGroupSearchSort } from '../models/FixedAssetGroupSearchSort';
import type { PageTemplateFixedAssetGroup } from '../models/PageTemplateFixedAssetGroup';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedAssetGroupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fixed asset group
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedAssetGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public addFixedAssetGroup(
        xTenantId: string,
        requestBody: FixedAssetGroupRequest,
    ): CancelablePromise<FixedAssetGroup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/fixed_asset_groups',
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
     * Retrieve a fixed asset group
     * Retrieve a fixed asset group using the fixed_asset_group code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FixedAssetGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedAssetGroupByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FixedAssetGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_asset_groups/code/{code}',
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
     * List fixed asset groups
     * Retrieve fixed asset groups in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFixedAssetGroup OK
     * @throws ApiError
     */
    public listFixedAssetGroup(
        order: Direction,
        sort: FixedAssetGroupListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedAssetGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_asset_groups/list',
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
     * Search for fixed asset groups using a full text search engine
     * Search for fixed asset groups in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFixedAssetGroup OK
     * @throws ApiError
     */
    public searchFixedAssetGroup(
        order: Direction,
        sort: FixedAssetGroupSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFixedAssetGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_asset_groups/search',
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
     * Retrieve a fixed asset group
     * Retrieve a fixed asset group using the fixed_asset_group ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FixedAssetGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public findFixedAssetGroupById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FixedAssetGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/fixed_asset_groups/{id}',
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
     * Update a fixed asset group record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedAssetGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFixedAssetGroup(
        id: UUID,
        xTenantId: string,
        requestBody: FixedAssetGroupRequest,
    ): CancelablePromise<FixedAssetGroup> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/fixed_asset_groups/{id}',
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
     * Delete a fixed asset group
     * Delete a fixed asset group using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFixedAssetGroup(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/fixed_asset_groups/{id}',
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
