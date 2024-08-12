/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplatePickList } from '../models/PageTemplatePickList';
import type { PickList } from '../models/PickList';
import type { PickListRequest } from '../models/PickListRequest';
import type { PickListSort } from '../models/PickListSort';
import type { PickListType } from '../models/PickListType';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PickListService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new pick list
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PickList Indicates that the request was successful.
     * @throws ApiError
     */
    public addPickList(
        xTenantId: string,
        requestBody: PickListRequest,
    ): CancelablePromise<PickList> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/picklists',
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
     * List pick lists
     * List pick lists in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePickList OK
     * @throws ApiError
     */
    public listPickList(
        order: Direction,
        sort: PickListSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePickList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/picklists/list',
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
     * Search for pick lists
     * Search for pick lists in the system using the supported query parameters. This API searches the label field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePickList OK
     * @throws ApiError
     */
    public searchPickList(
        order: Direction,
        sort: PickListSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePickList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/picklists/search',
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
     * Retrieves or creates a new pick list
     * Retrieve or creates a new pick list using the type.
     * @param pickListType
     * @param xTenantId The tenant identifier
     * @returns PickList Indicates that the request was successful.
     * @throws ApiError
     */
    public findOrCreatePickListByType(
        pickListType: PickListType,
        xTenantId: string,
    ): CancelablePromise<PickList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/picklists/type/{pickListType}',
            path: {
                'pickListType': pickListType,
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
     * Retrieve a pick list
     * Retrieve an pick list using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PickList Indicates that the request was successful.
     * @throws ApiError
     */
    public findPickListById(
        id: string,
        xTenantId: string,
    ): CancelablePromise<PickList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/picklists/{id}',
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
     * Update a pick list record
     * Updates a pick list record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PickList Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePickList(
        id: string,
        xTenantId: string,
        requestBody: PickListRequest,
    ): CancelablePromise<PickList> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/picklists/{id}',
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

}
