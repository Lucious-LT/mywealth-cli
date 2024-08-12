/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplateTransfer } from '../models/PageTemplateTransfer';
import type { SubAccountView } from '../models/SubAccountView';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { Transfer } from '../models/Transfer';
import type { TransferAccountLookupRequest } from '../models/TransferAccountLookupRequest';
import type { TransferAccountLookupResponse } from '../models/TransferAccountLookupResponse';
import type { TransferListSort } from '../models/TransferListSort';
import type { TransferRequest } from '../models/TransferRequest';
import type { TransferSearchSort } from '../models/TransferSearchSort';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TransferService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new transfer
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public addTransfer(
        xTenantId: string,
        requestBody: TransferRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/transfers',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * Get account label
     * Retrieve an account label using the account number.
     * @param accountNo
     * @param xTenantId The tenant identifier
     * @returns SubAccountView Indicates that the request was successful.
     * @throws ApiError
     */
    public getAccountLabel(
        accountNo: string,
        xTenantId: string,
    ): CancelablePromise<SubAccountView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/account/{accountNo}',
            path: {
                'accountNo': accountNo,
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
     * Approve a transfer
     * Approve a transfer using the transfer ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public approveTransferById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/transfers/approve/{id}',
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
     * Cancel a transfer
     * Cancel a transfer using the transfer ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelTransferById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/transfers/cancel/{id}',
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
     * Retrieve a transfer
     * Retrieve a transfer using the transfer code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public findTransferByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/code/{code}',
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
     * Create a new transfer and processes it
     * Creates a new record in the system and process the request. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public addAndPostGatewayTransfer(
        xTenantId: string,
        requestBody: TransferRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/transfers/gateway',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * List transfers
     * Retrieve transfers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTransfer OK
     * @throws ApiError
     */
    public listTransfer(
        order: Direction,
        sort: TransferListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTransfer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/list',
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
     * List transfers for account
     * Retrieve transfers for an account in the system using the supported query parameters.
     * @param accountId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTransfer OK
     * @throws ApiError
     */
    public listTransfersForAccount(
        accountId: UUID,
        order: Direction,
        sort: TransferListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTransfer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/list/account/{accountId}',
            path: {
                'accountId': accountId,
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
     * Lookup a transfer account # and return the account details
     * Lookup a transfer account # and return the account details. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransferAccountLookupResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public lookupTransferAccount(
        xTenantId: string,
        requestBody: TransferAccountLookupRequest,
    ): CancelablePromise<TransferAccountLookupResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/transfers/lookup-account',
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
     * Post a transfer
     * Post a transfer using the transfer ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public postTransferById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/transfers/post/{id}',
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
     * Search for transfers using a full text search engine
     * Search for transfers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTransfer OK
     * @throws ApiError
     */
    public searchTransfer(
        order: Direction,
        sort: TransferSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTransfer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/search',
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
     * Create a new transfer and processes it
     * Creates a new record in the system and process the request. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public addAndPostSelfServiceTransfer(
        xTenantId: string,
        requestBody: TransferRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/transfers/self-service',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * Retrieve a transfer
     * Retrieve a transfer using the transfer ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public findTransferById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/transfers/{id}',
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
     * Update a transfer record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Transfer Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTransfer(
        id: UUID,
        xTenantId: string,
        requestBody: TransferRequest,
    ): CancelablePromise<Transfer> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/transfers/{id}',
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
     * Delete a transfer
     * Delete a transfer using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTransfer(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/transfers/{id}',
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
