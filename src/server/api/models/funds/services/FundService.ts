/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { Fund } from '../models/Fund';
import type { FundListSort } from '../models/FundListSort';
import type { FundReport } from '../models/FundReport';
import type { FundRequest } from '../models/FundRequest';
import type { FundSearchSort } from '../models/FundSearchSort';
import type { PageTemplateFund } from '../models/PageTemplateFund';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionStatusCount } from '../models/TransactionStatusCount';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FundService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fund
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Fund Indicates that the request was successful.
     * @throws ApiError
     */
    public addFund(
        xTenantId: string,
        requestBody: FundRequest,
    ): CancelablePromise<Fund> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/funds',
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
     * Retrieve a fund
     * Retrieve a fund using the fund code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Fund Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Fund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/code/{code}',
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
     * Validate a fund code
     * Validate a fund using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param fundId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isFundCodeAvailable(
        code: string,
        xTenantId: string,
        fundId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'fundId': fundId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List funds
     * Retrieve funds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFund OK
     * @throws ApiError
     */
    public listFund(
        order: Direction,
        sort: FundListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/list',
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
     * Return a count of terminated transactions
     * Return a count of terminated transactions across all asset classes
     * @param fundId
     * @param xTenantId The tenant identifier
     * @returns TransactionStatusCount OK
     * @throws ApiError
     */
    public getTerminatedTransactionCount(
        fundId: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionStatusCount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/report/funds-center/count/terminated/{fundId}',
            path: {
                'fundId': fundId,
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
     * Return a count of all transactions
     * Return a count of all transactions across all asset classes
     * @param fundId
     * @param xTenantId The tenant identifier
     * @returns TransactionStatusCount OK
     * @throws ApiError
     */
    public getTotalTransactionCount(
        fundId: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionStatusCount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/report/funds-center/count/total/{fundId}',
            path: {
                'fundId': fundId,
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
     * Generate funds center valuation report
     * Generate funds center valuation report
     * @param fundId
     * @param xTenantId The tenant identifier
     * @returns FundReport OK
     * @throws ApiError
     */
    public getFundValuationReport(
        fundId: UUID,
        xTenantId: string,
    ): CancelablePromise<FundReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/report/funds-center/valuation/{fundId}',
            path: {
                'fundId': fundId,
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
     * Search for funds using a full text search engine
     * Search for funds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFund OK
     * @throws ApiError
     */
    public searchFund(
        order: Direction,
        sort: FundSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/search',
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
     * Retrieve a fund
     * Retrieve a fund using the funds ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Fund Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Fund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/funds/{id}',
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
     * Update a fund record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Fund Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFund(
        id: UUID,
        xTenantId: string,
        requestBody: FundRequest,
    ): CancelablePromise<Fund> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/funds/{id}',
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
     * Delete a fund
     * Delete a funds using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFund(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/funds/{id}',
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
