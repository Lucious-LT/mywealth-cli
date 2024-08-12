/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { CurrencyCode } from '../models/CurrencyCode';
import type { CurrencyCodeListSort } from '../models/CurrencyCodeListSort';
import type { CurrencyCodeRequest } from '../models/CurrencyCodeRequest';
import type { CurrencyCodeSearchSort } from '../models/CurrencyCodeSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCurrencyCode } from '../models/PageTemplateCurrencyCode';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CurrencyCodeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new currency
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CurrencyCode Indicates that the request was successful.
     * @throws ApiError
     */
    public addCurrencyCode(
        xTenantId: string,
        requestBody: CurrencyCodeRequest,
    ): CancelablePromise<CurrencyCode> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/currency-codes',
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
     * Validate a currency code
     * Validate a currency using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param currencyId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isCurrencyCodeAvailable(
        code: string,
        xTenantId: string,
        currencyId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-codes/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'currencyId': currencyId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List currencies
     * Retrieve currencies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCurrencyCode OK
     * @throws ApiError
     */
    public listCurrencyCode(
        order: Direction,
        sort: CurrencyCodeListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCurrencyCode> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-codes/list',
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
     * Search for currencies using a full text search engine
     * Search for currencies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCurrencyCode OK
     * @throws ApiError
     */
    public searchCurrencyCode(
        order: Direction,
        sort: CurrencyCodeSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCurrencyCode> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-codes/search',
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
     * Retrieve a currency
     * Retrieve a currency using the currency ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CurrencyCode Indicates that the request was successful.
     * @throws ApiError
     */
    public findCurrencyCodeById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CurrencyCode> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/currency-codes/{id}',
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
     * Update a currency record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CurrencyCode Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCurrencyCode(
        id: UUID,
        xTenantId: string,
        requestBody: CurrencyCodeRequest,
    ): CancelablePromise<CurrencyCode> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/currency-codes/{id}',
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
     * Delete a currency
     * Delete a currency using the currency ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCurrencyCode(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/currency-codes/{id}',
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
