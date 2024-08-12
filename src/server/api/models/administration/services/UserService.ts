/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { NewTokenRequest } from '../models/NewTokenRequest';
import type { OAuth2Token } from '../models/OAuth2Token';
import type { OtpVerificationRequest } from '../models/OtpVerificationRequest';
import type { PageTemplateUser } from '../models/PageTemplateUser';
import type { PageTemplateUserLoginEvent } from '../models/PageTemplateUserLoginEvent';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { ResetTokenPasswordChangeRequest } from '../models/ResetTokenPasswordChangeRequest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { User } from '../models/User';
import type { User2FAQRCode } from '../models/User2FAQRCode';
import type { User2FARegistrationRequest } from '../models/User2FARegistrationRequest';
import type { User2FAResetRequest } from '../models/User2FAResetRequest';
import type { UserLoginEventSort } from '../models/UserLoginEventSort';
import type { UserPasswordChangeRequest } from '../models/UserPasswordChangeRequest';
import type { UserPasswordRecoveryRequest } from '../models/UserPasswordRecoveryRequest';
import type { UserPasswordRecoveryToken } from '../models/UserPasswordRecoveryToken';
import type { UserProfile } from '../models/UserProfile';
import type { UserProfileUpdateRequest } from '../models/UserProfileUpdateRequest';
import type { UserRequest } from '../models/UserRequest';
import type { UserSort } from '../models/UserSort';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Update a user
     * Updates a user record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns User Indicates that the request was successful.
     * @throws ApiError
     */
    public updateUser(
        xTenantId: string,
        requestBody: UserRequest,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/users',
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
     * Create a new user
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns User Indicates that the request was successful.
     * @throws ApiError
     */
    public addUser(
        xTenantId: string,
        requestBody: UserRequest,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users',
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
     * List users
     * List users in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateUser OK
     * @throws ApiError
     */
    public listUser(
        order: Direction,
        sort: UserSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateUser> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/list',
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
     * List user login events for a specific user
     * List user events in the system for a specific user using the supported query parameters.
     * @param email
     * @param username
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateUserLoginEvent OK
     * @throws ApiError
     */
    public listLoginEventsByUsername(
        email: string,
        username: string,
        order: Direction,
        sort: UserLoginEventSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateUserLoginEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/list/{username}/{email}',
            path: {
                'email': email,
                'username': username,
            },
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
     * Validate a users credentials
     * Validate a users credentials and return a totp scoped access access token and the user profile
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns UserProfile Indicates that the request was successful.
     * @throws ApiError
     */
    public login(
        xTenantId: string,
        requestBody: NewTokenRequest,
    ): CancelablePromise<UserProfile> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/login',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Generate a password recovery email
     * This API generates a password recovery email for a valid email and tenant.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public generatePasswordRecoveryEmail(
        xTenantId: string,
        requestBody: UserPasswordRecoveryRequest,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/administration/api/v1/users/password/recovery',
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
     * Reset a user's password with a token
     * This API resets a user's password with a valid token.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns UserPasswordRecoveryToken Indicates that the request was successful.
     * @throws ApiError
     */
    public resetUserPasswordWithToken(
        xTenantId: string,
        requestBody: ResetTokenPasswordChangeRequest,
    ): CancelablePromise<UserPasswordRecoveryToken> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/administration/api/v1/users/password/reset',
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
     * Update a user's password
     * Updates a user's password in the system. See the schema of the object for more information. This API must be called by the user themselves.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns User Indicates that the request was successful.
     * @throws ApiError
     */
    public updateUserPassword(
        xTenantId: string,
        requestBody: UserPasswordChangeRequest,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/administration/api/v1/users/password/update',
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
     * Update a user's profile
     * Updates a user's profile in the system. See the schema of the object for more information. This API does not update the user's password and must be called by the user themselves.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns User Indicates that the request was successful.
     * @throws ApiError
     */
    public updateUserProfile(
        xTenantId: string,
        requestBody: UserProfileUpdateRequest,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/administration/api/v1/users/profile',
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
     * Retrieve a users profile
     * Retrieve a user's profile with the username.
     * @param username
     * @param xTenantId The tenant identifier
     * @returns UserProfile Indicates that the request was successful.
     * @throws ApiError
     */
    public getUserProfile(
        username: string,
        xTenantId: string,
    ): CancelablePromise<UserProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/profile/{username}',
            path: {
                'username': username,
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
     * Search for users
     * Search for users in the system using the supported query parameters. This API searches the recordLabel field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateUser OK
     * @throws ApiError
     */
    public searchUser(
        order: Direction,
        sort: UserSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateUser> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/search',
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
     * Generate an access token for a daemon user
     * Generates an access token for a valid daemon user and tenant using the password or returns an unauthorized response
     * @param requestBody
     * @returns OAuth2Token Indicates that the request was successful.
     * @throws ApiError
     */
    public getAccessDaemonToken(
        requestBody: NewTokenRequest,
    ): CancelablePromise<OAuth2Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/token/daemon',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Generate an access token
     * Generates an access token for a valid user and tenant using the password or returns an unauthorized response
     * @param requestBody
     * @returns OAuth2Token Indicates that the request was successful.
     * @throws ApiError
     */
    public getAccessToken(
        requestBody: NewTokenRequest,
    ): CancelablePromise<OAuth2Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/token/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Refresh an access token
     * Generates an access token using a refresh token or returns an unauthorized response
     * @param requestBody
     * @returns OAuth2Token Indicates that the request was successful.
     * @throws ApiError
     */
    public refreshAccessToken(
        requestBody: RefreshTokenRequest,
    ): CancelablePromise<OAuth2Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/token/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Generate a TOTP QR code
     * This API will generate a TOTP QR code for a valid user and tenant.
     * @param username
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public generateTotpQrCodeImage(
        username: string,
        xTenantId: string,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/totp/qr-code-image/{username}',
            path: {
                'username': username,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Generate a TOTP QR code json blob
     * This API will generate a TOTP QR code for a valid user and tenant and return the code as a json blob.
     * @param username
     * @param xTenantId The tenant identifier
     * @returns User2FAQRCode Indicates that the request was successful.
     * @throws ApiError
     */
    public generateTotpQrCodeJson(
        username: string,
        xTenantId: string,
    ): CancelablePromise<User2FAQRCode> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/totp/qr-code-json/{username}',
            path: {
                'username': username,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Register a totp profile
     * Validates a totp profile using the secret and code and registers it if successful or returns a bad request response
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public registerTotpProfile(
        xTenantId: string,
        requestBody: User2FARegistrationRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/totp/register',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Reset a totp profile
     * Removes a registered device from a user's profile
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public resetTotpProfile(
        xTenantId: string,
        requestBody: User2FAResetRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/administration/api/v1/users/totp/reset',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Verify a totp token
     * Verifies a totp token for a valid user and tenant using the password or returns an unauthorized response
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns OAuth2Token Indicates that the request was successful.
     * @throws ApiError
     */
    public verifyTotpCodeAndGenerateToken(
        xTenantId: string,
        requestBody: OtpVerificationRequest,
    ): CancelablePromise<OAuth2Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/users/totp/verify',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Indicates that the request failed.`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Delete a user
     * Delete a user using the username.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteUser(
        id: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/administration/api/v1/users/{id}',
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
     * Retrieve a user
     * Retrieve a user using the username.
     * @param username
     * @param xTenantId The tenant identifier
     * @returns User Indicates that the request was successful.
     * @throws ApiError
     */
    public findUserByUsername(
        username: string,
        xTenantId: string,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/users/{username}',
            path: {
                'username': username,
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
