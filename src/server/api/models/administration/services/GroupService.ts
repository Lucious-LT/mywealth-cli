/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { Group } from '../models/Group';
import type { GroupRequest } from '../models/GroupRequest';
import type { GroupSort } from '../models/GroupSort';
import type { PageTemplateGroup } from '../models/PageTemplateGroup';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class GroupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Update a user group
     * Updates a user group record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Group Indicates that the request was successful.
     * @throws ApiError
     */
    public updateGroup(
        xTenantId: string,
        requestBody: GroupRequest,
    ): CancelablePromise<Group> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/groups',
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
     * Create a new group
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Group Indicates that the request was successful.
     * @throws ApiError
     */
    public addGroup(
        xTenantId: string,
        requestBody: GroupRequest,
    ): CancelablePromise<Group> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/groups',
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
     * List groups
     * List groups in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateGroup OK
     * @throws ApiError
     */
    public listGroup(
        order: Direction,
        sort: GroupSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/groups/list',
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
     * Search for groups
     * Search for groups in the system using the supported query parameters. This API searches the recordLabel field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateGroup OK
     * @throws ApiError
     */
    public searchGroup(
        order: Direction,
        sort: GroupSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/groups/search',
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
     * Retrieve a user group
     * Retrieve a group using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Group Indicates that the request was successful.
     * @throws ApiError
     */
    public findGroupById(
        id: string,
        xTenantId: string,
    ): CancelablePromise<Group> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/groups/{id}',
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
     * Delete a user group
     * Delete a group using the group ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteGroup(
        id: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/administration/api/v1/groups/{id}',
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
