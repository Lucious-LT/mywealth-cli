/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { GlSubAccountTransactionListSort } from '../models/GlSubAccountTransactionListSort';
import type { PageTemplateSubAccountTransaction } from '../models/PageTemplateSubAccountTransaction';
import type { SubAccountTransaction } from '../models/SubAccountTransaction';
import type { SubAccountTransactionRequest } from '../models/SubAccountTransactionRequest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SubAccountTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new journal and posts it using the sub account transaction request
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addSubAccountTransaction(
        xTenantId: string,
        requestBody: SubAccountTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/sub_account/transactions',
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
     * Approve a sub account transaction
     * Approve a sub account transaction  using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approveSubAccountTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/sub_account/transactions/approve/{id}',
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
     * List sub account transactions
     * Retrieve sub account transactions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateSubAccountTransaction OK
     * @throws ApiError
     */
    public listSubAccountTransaction(
        order: Direction,
        sort: GlSubAccountTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateSubAccountTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/sub_account/transactions/list',
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
     * Post a sub account transaction that has been approved
     * Post a sub account transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postSubAccountTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/sub_account/transactions/post/{id}',
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
     * Reverse a posted sub account transaction
     * Reverse a posted sub account transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseSubAccountTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/sub_account/transactions/reverse/{id}',
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
     * Retrieve a sub account transaction using the ID
     * Retrieve a sub account transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findSubAccountTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/sub_account/transactions/{id}',
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
     * Update a sub account transaction record that is pending.
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns SubAccountTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateSubAccountTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: SubAccountTransactionRequest,
    ): CancelablePromise<SubAccountTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/sub_account/transactions/{id}',
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
     * Delete a sub account transaction that is pending or reversed.
     * Delete a sub account transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteSubAccountTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/sub_account/transactions/{id}',
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
