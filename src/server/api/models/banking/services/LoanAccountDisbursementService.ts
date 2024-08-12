/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LoanAccountDisbursement } from '../models/LoanAccountDisbursement';
import type { LoanAccountDisbursementListSort } from '../models/LoanAccountDisbursementListSort';
import type { LoanAccountDisbursementRequest } from '../models/LoanAccountDisbursementRequest';
import type { LoanAccountDisbursementSearchSort } from '../models/LoanAccountDisbursementSearchSort';
import type { PageTemplateLoanAccountDisbursement } from '../models/PageTemplateLoanAccountDisbursement';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanAccountDisbursementService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Approve a disbursement transaction
     * Approve a disbursement transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public approveLoanAccountDisbursementById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_disbursements/approve/{id}',
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
     * Retrieve a disbursement disbursement
     * Retrieve a disbursement disbursement using the loan disbursement code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountDisbursementByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_disbursements/code/{code}',
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
     * List loan disbursements
     * Retrieve loan disbursements in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanAccountDisbursement OK
     * @throws ApiError
     */
    public listLoanAccountDisbursement(
        order: Direction,
        sort: LoanAccountDisbursementListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_disbursements/list',
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
     * Post a disbursement transaction
     * Post a disbursement transaction using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public postLoanAccountDisbursementById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_disbursements/post/{id}',
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
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseLoanAccountDisbursementById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan_disbursements/reverse/{id}',
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
     * Search for loan disbursements using a full text search engine
     * Search for loan disbursements in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanAccountDisbursement OK
     * @throws ApiError
     */
    public searchLoanAccountDisbursement(
        order: Direction,
        sort: LoanAccountDisbursementSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_disbursements/search',
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
     * Retrieve a loan disbursement
     * Retrieve a loan disbursement using the loan disbursement ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountDisbursementById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_disbursements/{id}',
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
     * Update an loan disbursement record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanAccountDisbursement Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanAccountDisbursement(
        id: UUID,
        xTenantId: string,
        requestBody: LoanAccountDisbursementRequest,
    ): CancelablePromise<LoanAccountDisbursement> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan_disbursements/{id}',
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

}
