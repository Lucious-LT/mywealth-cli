/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { LoanProductFee } from '../models/LoanProductFee';
import type { LoanProductFeeListSort } from '../models/LoanProductFeeListSort';
import type { LoanProductFeeRequest } from '../models/LoanProductFeeRequest';
import type { LoanProductFeeSearchSort } from '../models/LoanProductFeeSearchSort';
import type { PageTemplateLoanProductFee } from '../models/PageTemplateLoanProductFee';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanFeeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new loan fee configuration
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProductFee Indicates that the request was successful.
     * @throws ApiError
     */
    public addLoanFee(
        xTenantId: string,
        requestBody: LoanProductFeeRequest,
    ): CancelablePromise<LoanProductFee> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/loan_fees',
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
     * Retrieve a loan fee configuration
     * Retrieve a loan fee using the loan fee code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanProductFee Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanFeeByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanProductFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_fees/code/{code}',
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
     * Validate a loan fee code
     * Validate a loan fee using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param loanFeeId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isLoanFeeCodeAvailable(
        code: string,
        xTenantId: string,
        loanFeeId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_fees/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'loan_feeId': loanFeeId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List loan fee configuration records
     * Retrieve loan fees in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanProductFee OK
     * @throws ApiError
     */
    public listLoanFee(
        order: Direction,
        sort: LoanProductFeeListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProductFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_fees/list',
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
     * Search for loan fee configuration using a full text search engine
     * Search for loan fee configurations in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanProductFee OK
     * @throws ApiError
     */
    public searchLoanFee(
        order: Direction,
        sort: LoanProductFeeSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProductFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_fees/search',
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
     * Retrieve a loan fee
     * Retrieve a loan fee using the loan fee ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanProductFee Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanFeeById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanProductFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan_fees/{id}',
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
     * Update a loan fee record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProductFee Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanFee(
        id: UUID,
        xTenantId: string,
        requestBody: LoanProductFeeRequest,
    ): CancelablePromise<LoanProductFee> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan_fees/{id}',
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
     * Delete a loan_fee
     * Delete a loan fee using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteLoanFee(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/loan_fees/{id}',
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
