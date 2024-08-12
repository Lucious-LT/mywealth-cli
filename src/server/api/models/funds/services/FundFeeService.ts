/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { FundFee } from '../models/FundFee';
import type { FundFeeListSort } from '../models/FundFeeListSort';
import type { FundFeeRequest } from '../models/FundFeeRequest';
import type { FundFeeSearchSort } from '../models/FundFeeSearchSort';
import type { PageTemplateFundFee } from '../models/PageTemplateFundFee';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FundFeeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fund fee
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundFee Indicates that the request was successful.
     * @throws ApiError
     */
    public addFundFee(
        xTenantId: string,
        requestBody: FundFeeRequest,
    ): CancelablePromise<FundFee> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/fees',
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
     * Retrieve a fund_fee
     * Retrieve a fund fee using the fund fee code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FundFee Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundFeeByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FundFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/fees/code/{code}',
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
     * Validate a fund fee code
     * Validate a fund fee using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param fundFeeId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isFundFeeCodeAvailable(
        code: string,
        xTenantId: string,
        fundFeeId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/fees/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'fund_feeId': fundFeeId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List fund_fees
     * Retrieve fund fees in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFundFee OK
     * @throws ApiError
     */
    public listFundFee(
        order: Direction,
        sort: FundFeeListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFundFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/fees/list',
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
     * Search for fund fee using a full text search engine
     * Search for fund fees in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateFundFee OK
     * @throws ApiError
     */
    public searchFundFee(
        order: Direction,
        sort: FundFeeSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateFundFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/fees/search',
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
     * Retrieve a fund fee
     * Retrieve a fund fee using the fund fee ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns FundFee Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundFeeById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<FundFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/fees/{id}',
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
     * Update a fund fee record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundFee Indicates that the request was successful.
     * @throws ApiError
     */
    public updateFundFee(
        id: UUID,
        xTenantId: string,
        requestBody: FundFeeRequest,
    ): CancelablePromise<FundFee> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/fees/{id}',
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
     * Delete a fund_fee
     * Delete a fund fee using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteFundFee(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/fees/{id}',
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
