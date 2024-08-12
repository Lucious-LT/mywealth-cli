/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BondListSort } from '../models/BondListSort';
import type { Direction } from '../models/Direction';
import type { Fund } from '../models/Fund';
import type { FundListSort } from '../models/FundListSort';
import type { FundRequest } from '../models/FundRequest';
import type { FundSearchSort } from '../models/FundSearchSort';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateFund } from '../models/PageTemplateFund';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FundService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fund
     * Create a new record in the system. See the schema of the object for more information.
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
            url: '/position/api/v1/funds',
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
            url: '/position/api/v1/funds/list',
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
     * List funds for a market
     * Retrieve funds for a market in the system using the supported query parameters.
     * @param marketCode
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateFund OK
     * @throws ApiError
     */
    public listFundByMarketCode(
        marketCode: string,
        order: Direction,
        sort: BondListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateFund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/funds/list/market/{marketCode}',
            path: {
                'marketCode': marketCode,
            },
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
     * Retrieve a fund using the market code and security ID
     * Retrieve an fund using the market code and security ID
     * @param marketCode
     * @param secId
     * @param xTenantId The tenant identifier
     * @returns Fund Indicates that the request was successful.
     * @throws ApiError
     */
    public findFundByMarketCodeAndSecId(
        marketCode: string,
        secId: string,
        xTenantId: string,
    ): CancelablePromise<Fund> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/funds/market/{marketCode}/{secId}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
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
     * Get the price of a fund.
     * Get the price of a fund for a date using the market code and security ID
     * @param marketCode
     * @param secId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getFundPrice(
        marketCode: string,
        secId: string,
        valueDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/funds/price/{marketCode}/{secId}/{valueDate}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
                'valueDate': valueDate,
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
            url: '/position/api/v1/funds/search',
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
     * Retrieve a fund using the ID
     * Retrieve a fund using the fund ID.
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
            url: '/position/api/v1/funds/{id}',
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
     * Update an fund record
     * Update a fund record in the system. See the schema of the object for more information.
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
            url: '/position/api/v1/funds/{id}',
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
     * Delete an fund
     * Delete a fund using the fund ID.
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
            url: '/position/api/v1/funds/{id}',
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
