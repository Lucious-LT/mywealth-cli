/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { Equity } from '../models/Equity';
import type { Market } from '../models/Market';
import type { MarketListSort } from '../models/MarketListSort';
import type { MarketRequest } from '../models/MarketRequest';
import type { MarketSearchSort } from '../models/MarketSearchSort';
import type { PageTemplateMarket } from '../models/PageTemplateMarket';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MarketService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new market
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Market Indicates that the request was successful.
     * @throws ApiError
     */
    public addMarket(
        xTenantId: string,
        requestBody: MarketRequest,
    ): CancelablePromise<Market> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/markets',
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
     * Retrieve a market using the market code
     * Retrieve a market using the market code
     * @param marketCode
     * @param xTenantId The tenant identifier
     * @returns Equity Indicates that the request was successful.
     * @throws ApiError
     */
    public findMarketByCode(
        marketCode: string,
        xTenantId: string,
    ): CancelablePromise<Equity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/markets/code/{marketCode}',
            path: {
                'marketCode': marketCode,
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
     * Validate a marketId is available
     * Validate a market ID using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param marketCode
     * @param xTenantId The tenant identifier
     * @param marketId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isMarketCodeAvailable(
        marketCode: string,
        xTenantId: string,
        marketId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/markets/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'marketCode': marketCode,
                'marketId': marketId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Query for markets
     * Retrieve markets in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateMarket OK
     * @throws ApiError
     */
    public listMarket(
        order: Direction,
        sort: MarketListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateMarket> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/markets/list',
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
     * Search for markets using a full text search engine
     * Search for markets in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateMarket OK
     * @throws ApiError
     */
    public searchMarket(
        order: Direction,
        sort: MarketSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateMarket> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/markets/search',
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
     * Retrieve a market
     * Retrieve a market using the market ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Market Indicates that the request was successful.
     * @throws ApiError
     */
    public findMarketById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Market> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/markets/{id}',
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
     * Update a market record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Market Indicates that the request was successful.
     * @throws ApiError
     */
    public updateMarket(
        id: UUID,
        xTenantId: string,
        requestBody: MarketRequest,
    ): CancelablePromise<Market> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/markets/{id}',
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
     * Delete a market
     * Delete a market using the market ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteMarket(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/markets/{id}',
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
