/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LoanProductInterest } from '../models/LoanProductInterest';
import type { LoanProductInterestListSort } from '../models/LoanProductInterestListSort';
import type { LoanProductInterestRequest } from '../models/LoanProductInterestRequest';
import type { LoanProductInterestSearchSort } from '../models/LoanProductInterestSearchSort';
import type { PageTemplateLoanProductInterest } from '../models/PageTemplateLoanProductInterest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanInterestService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new loan interest configuration
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public addLoanInterest(
        xTenantId: string,
        requestBody: LoanProductInterestRequest,
    ): CancelablePromise<LoanProductInterest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/loan/interests',
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
     * Retrieve a loan interest
     * Retrieve an interest using the interest code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanInterestByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/interests/code/{code}',
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
     * List loan interest configurations
     * Retrieve loan interest configurations in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanProductInterest OK
     * @throws ApiError
     */
    public listLoanInterest(
        order: Direction,
        sort: LoanProductInterestListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/interests/list',
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
     * Search for loan interest configurations using a full text search engine
     * Search for interest configurations in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanProductInterest OK
     * @throws ApiError
     */
    public searchLoanInterest(
        order: Direction,
        sort: LoanProductInterestSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/interests/search',
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
     * Retrieve a loan interest
     * Retrieve an interest using the interest ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanInterestById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanProductInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/interests/{id}',
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
     * Update a loan interest configuration record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProductInterest Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanInterest(
        id: UUID,
        xTenantId: string,
        requestBody: LoanProductInterestRequest,
    ): CancelablePromise<LoanProductInterest> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan/interests/{id}',
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
     * Delete a loan interest configuration
     * Delete an interest configuration using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteLoanInterest(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/loan/interests/{id}',
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
