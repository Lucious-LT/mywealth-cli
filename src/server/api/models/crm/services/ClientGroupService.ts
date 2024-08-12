/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppRecord } from '../models/AppRecord';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { ClientGroup } from '../models/ClientGroup';
import type { ClientGroupRequest } from '../models/ClientGroupRequest';
import type { PageTemplateClientGroup } from '../models/PageTemplateClientGroup';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClientGroupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a client group
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns ClientGroup Success
     * @throws ApiError
     */
    public addClientGroup(
        xTenantId: string,
        requestBody: ClientGroupRequest,
    ): CancelablePromise<ClientGroup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/client_groups',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve a client group
     * Retrieve a client group using the group ID.
     * @param clientGroupId
     * @param xTenantId The tenant identifier
     * @returns ClientGroup OK
     * @throws ApiError
     */
    public findByClientGroupId(
        clientGroupId: string,
        xTenantId: string,
    ): CancelablePromise<ClientGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/{clientGroupId}',
            path: {
                'clientGroupId': clientGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a client group
     * Delete a client group in the system
     * @param clientGroupId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteClientGroup(
        clientGroupId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/client_groups/{clientGroupId}',
            path: {
                'clientGroupId': clientGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update a client group
     * Update a client group in the system.
     * @param clientGroupId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns ClientGroup Success
     * @throws ApiError
     */
    public updateClientGroup(
        clientGroupId: string,
        xTenantId: string,
        requestBody: ClientGroupRequest,
    ): CancelablePromise<ClientGroup> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/client_groups/{clientGroupId}',
            path: {
                'clientGroupId': clientGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Validate a client group ID
     * Validate a client group using the group ID.
     * @param clientGroupId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidClientGroupId(
        clientGroupId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/validate/{clientGroupId}',
            path: {
                'clientGroupId': clientGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for client groups
     * Search for client groups in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateClientGroup OK
     * @throws ApiError
     */
    public searchClientGroup(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateClientGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'pattern': pattern,
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * List client groups
     * Retrieve client groups in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateClientGroup OK
     * @throws ApiError
     */
    public listClientGroup(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'type' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateClientGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * List active client groups
     * Retrieve a summarized list of active client groups
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listActiveClientGroupOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/list/options/active',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a client group code
     * Validate a client group using the group code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param clientGroupId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isClientGroupCodeAvailable(
        code: string,
        xTenantId: string,
        clientGroupId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'clientGroupId': clientGroupId,
                'code': code,
            },
        });
    }

    /**
     * Retrieve a client group
     * Retrieve a client group using the group code
     * @param code
     * @param xTenantId The tenant identifier
     * @returns ClientGroup OK
     * @throws ApiError
     */
    public findClientGroupByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<ClientGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client_groups/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
