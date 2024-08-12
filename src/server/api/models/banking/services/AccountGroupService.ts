/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountGroup } from '../models/AccountGroup';
import type { AccountGroupListSort } from '../models/AccountGroupListSort';
import type { AccountGroupRequest } from '../models/AccountGroupRequest';
import type { AccountGroupSearchSort } from '../models/AccountGroupSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateAccountGroup } from '../models/PageTemplateAccountGroup';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccountGroupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new account group
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AccountGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public addAccountGroup(
        xTenantId: string,
        requestBody: AccountGroupRequest,
    ): CancelablePromise<AccountGroup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/account_groups',
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
     * Retrieve an account group
     * Retrieve an account group using the group code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns AccountGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountGroupByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<AccountGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_groups/code/{code}',
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
     * List account groups
     * Retrieve account groups in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAccountGroup OK
     * @throws ApiError
     */
    public listAccountGroup(
        order: Direction,
        sort: AccountGroupListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAccountGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_groups/list',
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
     * Search for account groups using a full text search engine
     * Search for account groups in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAccountGroup OK
     * @throws ApiError
     */
    public searchAccountGroup(
        order: Direction,
        sort: AccountGroupSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccountGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_groups/search',
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
     * Retrieve an account group
     * Retrieve an account group using the group ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccountGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountGroupById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccountGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/account_groups/{id}',
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
     * Update an account group record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AccountGroup Indicates that the request was successful.
     * @throws ApiError
     */
    public updateAccountGroup(
        id: UUID,
        xTenantId: string,
        requestBody: AccountGroupRequest,
    ): CancelablePromise<AccountGroup> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/account_groups/{id}',
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
     * Delete an account group
     * Delete an account group using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteAccountGroup(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/account_groups/{id}',
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
