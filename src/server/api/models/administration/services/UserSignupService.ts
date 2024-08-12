/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplateUserSignup } from '../models/PageTemplateUserSignup';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UserSignup } from '../models/UserSignup';
import type { UserSignupRequest } from '../models/UserSignupRequest';
import type { UserSignupSort } from '../models/UserSignupSort';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserSignupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new request
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns UserSignup Indicates that the request was successful.
     * @throws ApiError
     */
    public addUserSignupRequest(
        xTenantId: string,
        requestBody: UserSignupRequest,
    ): CancelablePromise<UserSignup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/user-signup',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Approve a user sign up request
     * Approve a user sign up request using the ID.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns UserSignup Indicates that the request was successful.
     * @throws ApiError
     */
    public approveUserSignupRequest(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<UserSignup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/user-signup/approve/{recordId}',
            path: {
                'recordId': recordId,
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
     * List user sign up requests
     * List user sign up requests in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateUserSignup OK
     * @throws ApiError
     */
    public listUserSignupRequest(
        order: Direction,
        sort: UserSignupSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateUserSignup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/user-signup/list',
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
     * Reject a user sign up request
     * Reject a user sign up request using the ID.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns UserSignup Indicates that the request was successful.
     * @throws ApiError
     */
    public rejectUserSignupRequest(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<UserSignup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/user-signup/reject/{recordId}',
            path: {
                'recordId': recordId,
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
     * Search for user sign up requests
     * Search for user sign up requests in the system using the supported query parameters. This API searches the recordLabel field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateUserSignup OK
     * @throws ApiError
     */
    public searchUserSignupRequest(
        order: Direction,
        sort: UserSignupSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateUserSignup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/user-signup/search',
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
     * Retrieve a user sign up request
     * Retrieve user sign up request using the username.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns UserSignup Indicates that the request was successful.
     * @throws ApiError
     */
    public findUserSignupById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<UserSignup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/user-signup/{recordId}',
            path: {
                'recordId': recordId,
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
     * Update a user sign up request
     * Updates a user sign up record in the system. See the schema of the object for more information.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns UserSignup Indicates that the request was successful.
     * @throws ApiError
     */
    public updateUserSignupRequest(
        recordId: string,
        xTenantId: string,
        requestBody: UserSignupRequest,
    ): CancelablePromise<UserSignup> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/user-signup/{recordId}',
            path: {
                'recordId': recordId,
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
     * Delete a user sign up request
     * Delete a user sign up request using the ID.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteUserSignupRequest(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/administration/api/v1/user-signup/{recordId}',
            path: {
                'recordId': recordId,
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
