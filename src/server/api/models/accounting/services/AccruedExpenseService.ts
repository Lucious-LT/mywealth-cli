/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccruedExpense } from '../models/AccruedExpense';
import type { AccruedExpenseListSort } from '../models/AccruedExpenseListSort';
import type { AccruedExpenseRequest } from '../models/AccruedExpenseRequest';
import type { AccruedExpenseSearchSort } from '../models/AccruedExpenseSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateAccruedExpense } from '../models/PageTemplateAccruedExpense';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccruedExpenseService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new prepaid expense
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public addAccruedExpense(
        xTenantId: string,
        requestBody: AccruedExpenseRequest,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/accrued_expenses',
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
     * Approve a accrued_expense
     * Approve a accrued_expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public approveAccruedExpenseById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/accrued_expenses/approve/{id}',
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
     * Cancel a accrued_expense
     * Cancel a accrued_expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelAccruedExpenseById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/accrued_expenses/cancel/{id}',
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
     * Retrieve a prepaid expense using the accrued_expense code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccruedExpenseByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accrued_expenses/code/{code}',
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
     * @returns PageTemplateAccruedExpense OK
     * @throws ApiError
     */
    public listAccruedExpense(
        order: Direction,
        sort: AccruedExpenseListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAccruedExpense> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accrued_expenses/list',
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
     * Approve a accrued_expense
     * Approve a accrued_expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseAccruedExpenseById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/accrued_expenses/reverse/{id}',
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
     * @returns PageTemplateAccruedExpense OK
     * @throws ApiError
     */
    public searchAccruedExpense(
        order: Direction,
        sort: AccruedExpenseSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccruedExpense> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accrued_expenses/search',
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
     * Start a accrued_expense
     * Start a accrued_expense using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public startAccruedExpenseById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/accounting/api/v1/accrued_expenses/start/{id}',
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
     * Retrieve a prepaid expense using the accrued_expense ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccruedExpenseById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accrued_expenses/{id}',
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
     * @returns AccruedExpense Indicates that the request was successful.
     * @throws ApiError
     */
    public updateAccruedExpense(
        id: UUID,
        xTenantId: string,
        requestBody: AccruedExpenseRequest,
    ): CancelablePromise<AccruedExpense> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/accrued_expenses/{id}',
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
    public deleteAccruedExpense(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/accrued_expenses/{id}',
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
