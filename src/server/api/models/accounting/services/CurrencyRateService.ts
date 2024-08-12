/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyRate } from '../models/CurrencyRate';
import type { CurrencyRateListSort } from '../models/CurrencyRateListSort';
import type { CurrencyRateRequest } from '../models/CurrencyRateRequest';
import type { CurrencyRateSearchSort } from '../models/CurrencyRateSearchSort';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { PageTemplateCurrencyRate } from '../models/PageTemplateCurrencyRate';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CurrencyRateService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new rate
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CurrencyRate Indicates that the request was successful.
     * @throws ApiError
     */
    public addCurrencyRate(
        xTenantId: string,
        requestBody: CurrencyRateRequest,
    ): CancelablePromise<CurrencyRate> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/currency-rates',
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
     * List rates
     * Retrieve rates in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCurrencyRate OK
     * @throws ApiError
     */
    public listCurrencyRate(
        order: Direction,
        sort: CurrencyRateListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCurrencyRate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-rates/list',
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
     * Retrieve a quote for a currency pair
     * Retrieve a quote for a currency pair using the quote date. If the pair is not maintained in the system, an indirect quote will be returned where possible. Returns a 404 error if a quote cannot be generated.
     * @param baseCurrency
     * @param quoteCurrency
     * @param quoteDate
     * @param xTenantId The tenant identifier
     * @returns CurrencyRate Indicates that the request was successful.
     * @throws ApiError
     */
    public getCurrencyQuote(
        baseCurrency: string,
        quoteCurrency: string,
        quoteDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<CurrencyRate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-rates/quote/{baseCurrency}/{quoteCurrency}/{quoteDate}',
            path: {
                'baseCurrency': baseCurrency,
                'quoteCurrency': quoteCurrency,
                'quoteDate': quoteDate,
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
     * Search for rates using a full text search engine
     * Search for rates in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCurrencyRate OK
     * @throws ApiError
     */
    public searchCurrencyRate(
        order: Direction,
        sort: CurrencyRateSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCurrencyRate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-rates/search',
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
     * Retrieve a rate
     * Retrieve a rate using the rate ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CurrencyRate Indicates that the request was successful.
     * @throws ApiError
     */
    public findCurrencyRateById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CurrencyRate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-rates/{id}',
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
     * Update a rate record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CurrencyRate Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCurrencyRate(
        id: UUID,
        xTenantId: string,
        requestBody: CurrencyRateRequest,
    ): CancelablePromise<CurrencyRate> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/currency-rates/{id}',
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
     * Delete a rate
     * Delete a rate using the rate ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCurrencyRate(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/currency-rates/{id}',
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
