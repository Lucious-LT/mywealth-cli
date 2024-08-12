/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BondListSort } from '../models/BondListSort';
import type { Direction } from '../models/Direction';
import type { Equity } from '../models/Equity';
import type { EquityListSort } from '../models/EquityListSort';
import type { EquityRequest } from '../models/EquityRequest';
import type { EquitySearchSort } from '../models/EquitySearchSort';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateEquity } from '../models/PageTemplateEquity';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EquityService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new equity
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Equity Indicates that the request was successful.
     * @throws ApiError
     */
    public addEquity(
        xTenantId: string,
        requestBody: EquityRequest,
    ): CancelablePromise<Equity> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/equities',
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
     * List equities
     * Retrieve equities in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateEquity OK
     * @throws ApiError
     */
    public listEquity(
        order: Direction,
        sort: EquityListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateEquity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/list',
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
     * List equity for a market
     * Retrieve equity for a market in the system using the supported query parameters.
     * @param marketCode
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateEquity OK
     * @throws ApiError
     */
    public listEquityByMarketCode(
        marketCode: string,
        order: Direction,
        sort: BondListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateEquity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/list/market/{marketCode}',
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
     * Retrieve an equity using the market code and security ID
     * Retrieve an equity using the market code and security ID
     * @param marketCode
     * @param secId
     * @param xTenantId The tenant identifier
     * @returns Equity Indicates that the request was successful.
     * @throws ApiError
     */
    public findEquityByMarketCodeAndSecId(
        marketCode: string,
        secId: string,
        xTenantId: string,
    ): CancelablePromise<Equity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/market/{marketCode}/{secId}',
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
     * Get the price of an equity.
     * Get the price of an equity for a date using the market code and security ID
     * @param marketCode
     * @param secId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getEquityPrice(
        marketCode: string,
        secId: string,
        valueDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/price/{marketCode}/{secId}/{valueDate}',
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
     * Search for equity using a full text search engine
     * Search for equity in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateEquity OK
     * @throws ApiError
     */
    public searchEquity(
        order: Direction,
        sort: EquitySearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateEquity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/search',
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
     * Retrieve an equity using the ID
     * Retrieve an equity using the equity ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Equity Indicates that the request was successful.
     * @throws ApiError
     */
    public findEquityById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Equity> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/equities/{id}',
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
     * Update an equity record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Equity Indicates that the request was successful.
     * @throws ApiError
     */
    public updateEquity(
        id: UUID,
        xTenantId: string,
        requestBody: EquityRequest,
    ): CancelablePromise<Equity> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/equities/{id}',
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
     * Delete an equity
     * Delete an equity using the equity ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteEquity(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/equities/{id}',
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
