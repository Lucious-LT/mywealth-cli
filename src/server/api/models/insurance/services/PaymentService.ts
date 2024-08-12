/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplatePayment } from '../models/PageTemplatePayment';
import type { Payment } from '../models/Payment';
import type { PaymentListSort } from '../models/PaymentListSort';
import type { PaymentRequest } from '../models/PaymentRequest';
import type { PaymentSearchSort } from '../models/PaymentSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PaymentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new payment
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public addPayment(
        xTenantId: string,
        requestBody: PaymentRequest,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/payment',
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
     * Approve a transaction
     * Approve a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public approveTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/payment/approve/{id}',
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
     * Retrieve a payment
     * Retrieve a payment using the payment code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public findPaymentByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/payment/code/{code}',
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
     * List payments
     * Retrieve payments in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePayment OK
     * @throws ApiError
     */
    public listPayment(
        order: Direction,
        sort: PaymentListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/payment/list',
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
     * Retrieve a payments for a policy
     * Retrieve payments for a policy using the policy ID.
     * @param policyId
     * @param xTenantId The tenant identifier
     * @returns Payment OK
     * @throws ApiError
     */
    public findPaymentsForPolicyById(
        policyId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Payment>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/payment/policy/{policyId}',
            path: {
                'policyId': policyId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Post a transaction
     * Post a transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public postTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/payment/post/{id}',
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
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/payment/reverse/{id}',
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
     * Search for payments using a full text search engine
     * Search for payments in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePayment OK
     * @throws ApiError
     */
    public searchPayment(
        order: Direction,
        sort: PaymentSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePayment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/payment/search',
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
     * Retrieve a payment
     * Retrieve a payment using the payment ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public findPaymentById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/payment/{id}',
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
     * Update a payment record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Payment Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePayment(
        id: UUID,
        xTenantId: string,
        requestBody: PaymentRequest,
    ): CancelablePromise<Payment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/payment/{id}',
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
     * Delete a payment
     * Delete a payment using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePayment(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/payment/{id}',
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
