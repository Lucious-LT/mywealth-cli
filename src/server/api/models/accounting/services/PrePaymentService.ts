/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplatePrePayment } from '../models/PageTemplatePrePayment';
import type { PrePayment } from '../models/PrePayment';
import type { PrePaymentListSort } from '../models/PrePaymentListSort';
import type { PrePaymentRequest } from '../models/PrePaymentRequest';
import type { PrePaymentSearchSort } from '../models/PrePaymentSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PrePaymentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new prepaid expense
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public addPrePayment(
        xTenantId: string,
        requestBody: PrePaymentRequest,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/prepaid_expenses',
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
     * Approve a prepaid expense
     * Approve a prepaid expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public approvePrePaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/prepaid_expenses/approve/{id}',
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
     * Cancel a prepaid expense
     * Cancel a prepaid expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelPrePaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/prepaid_expenses/cancel/{id}',
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
     * Retrieve a prepaid expense
     * Retrieve a prepaid expense using the prepaid_expense code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public findPrePaymentByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/prepaid_expenses/code/{code}',
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
     * List prepaid expenses
     * Retrieve prepaid expenses in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePrePayment OK
     * @throws ApiError
     */
    public listPrePayment(
        order: Direction,
        sort: PrePaymentListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePrePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/prepaid_expenses/list',
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
     * Approve a prepaid expense
     * Approve a prepaid expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public reversePrePaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/prepaid_expenses/reverse/{id}',
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
     * Search for prepaid expenses using a full text search engine
     * Search for prepaid expenses in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePrePayment OK
     * @throws ApiError
     */
    public searchPrePayment(
        order: Direction,
        sort: PrePaymentSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePrePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/prepaid_expenses/search',
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
     * Start a prepaid expense
     * Start a prepaid expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public startPrePaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/prepaid_expenses/start/{id}',
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
     * Retrieve a prepaid expense
     * Retrieve a prepaid expense using the prepaid_expense ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public findPrePaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/prepaid_expenses/{id}',
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
     * Update a prepaid expense record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PrePayment Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePrePayment(
        id: UUID,
        xTenantId: string,
        requestBody: PrePaymentRequest,
    ): CancelablePromise<PrePayment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/prepaid_expenses/{id}',
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
     * Delete a prepaid expense
     * Delete a prepaid expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePrePayment(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/prepaid_expenses/{id}',
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
