/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LoanAccountPayment } from '../models/LoanAccountPayment';
import type { LoanAccountPaymentListSort } from '../models/LoanAccountPaymentListSort';
import type { LoanAccountPaymentRequest } from '../models/LoanAccountPaymentRequest';
import type { LoanAccountPaymentSearchSort } from '../models/LoanAccountPaymentSearchSort';
import type { PageTemplateLoanAccountPayment } from '../models/PageTemplateLoanAccountPayment';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanAccountPaymentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new loan payment record
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public addLoanAccountPayment(
        xTenantId: string,
        requestBody: LoanAccountPaymentRequest,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/loan_payments',
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
     * Approve a payment transaction
     * Approve a payment transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public approveLoanAccountPaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_payments/approve/{id}',
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
     * Retrieve a payment payment
     * Retrieve a payment payment using the loan payment code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountPaymentByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_payments/code/{code}',
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
     * List loan payments
     * Retrieve loan payments in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanAccountPayment OK
     * @throws ApiError
     */
    public listLoanAccountPayment(
        order: Direction,
        sort: LoanAccountPaymentListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccountPayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_payments/list',
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
     * Post a payment transaction
     * Post a payment transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public postLoanAccountPaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_payments/post/{id}',
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
     * Reverse a transaction
     * Reverse a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseLoanAccountPaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_payments/reverse/{id}',
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
     * Search for loan payments using a full text search engine
     * Search for loan payments in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanAccountPayment OK
     * @throws ApiError
     */
    public searchLoanAccountPayment(
        order: Direction,
        sort: LoanAccountPaymentSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccountPayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_payments/search',
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
     * Retrieve a loan payment
     * Retrieve a loan payment using the loan payment ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountPaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_payments/{id}',
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
     * Update an loan payment record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanAccountPayment Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanAccountPayment(
        id: UUID,
        xTenantId: string,
        requestBody: LoanAccountPaymentRequest,
    ): CancelablePromise<LoanAccountPayment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan_payments/{id}',
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
     * Delete a loan payment record
     * Delete a loan payment using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteLoanAccountPayment(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/loan_payments/{id}',
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
