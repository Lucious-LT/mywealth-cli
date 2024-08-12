/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { PageTemplateSecurityPrice } from '../models/PageTemplateSecurityPrice';
import type { SecurityPrice } from '../models/SecurityPrice';
import type { SecurityPriceListSort } from '../models/SecurityPriceListSort';
import type { SecurityPriceRequest } from '../models/SecurityPriceRequest';
import type { SecurityPriceSearchSort } from '../models/SecurityPriceSearchSort';
import type { SecurityPriceUploadRequest } from '../models/SecurityPriceUploadRequest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SecurityPriceService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new price record
     * Create a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns SecurityPrice Indicates that the request was successful.
     * @throws ApiError
     */
    public addSecurityPrice(
        xTenantId: string,
        requestBody: SecurityPriceRequest,
    ): CancelablePromise<SecurityPrice> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/security_prices',
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
     * List prices
     * Retrieve prices in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateSecurityPrice OK
     * @throws ApiError
     */
    public listSecurityPrice(
        order: Direction,
        sort: SecurityPriceListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateSecurityPrice> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/security_prices/list',
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
     * Retrieve a price list using the market code and security ID
     * Retrieve a price list using the market code and security ID
     * @param marketCode
     * @param secId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns SecurityPrice OK
     * @throws ApiError
     */
    public findSecurityPriceByMarketCodeAndSecId(
        marketCode: string,
        secId: string,
        order: Direction,
        sort: SecurityPriceListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<Array<SecurityPrice>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/security_prices/list/{marketCode}/{secId}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
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
     * Search for prices using a full text search engine
     * Search for prices in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateSecurityPrice OK
     * @throws ApiError
     */
    public searchSecurityPrice(
        order: Direction,
        sort: SecurityPriceSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateSecurityPrice> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/security_prices/search',
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
     * Create or update prices using the uploaded excel file
     * Creates or update security prices in the system using an excel file. If any of the records in the file is invalid the whole transaction will be rolled back.See the documentation for the expected file format for more information.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param tradeDate
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadSecurityPrices(
        xTenantId: string,
        formData: SecurityPriceUploadRequest,
        tradeDate?: LocalDate,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/security_prices/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'tradeDate': tradeDate,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a price using the ID
     * Retrieve a price using the record ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns SecurityPrice Indicates that the request was successful.
     * @throws ApiError
     */
    public findSecurityPriceById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<SecurityPrice> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/security_prices/{id}',
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
     * Update an price record
     * Update a price record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns SecurityPrice Indicates that the request was successful.
     * @throws ApiError
     */
    public updateSecurityPrice(
        id: UUID,
        xTenantId: string,
        requestBody: SecurityPriceRequest,
    ): CancelablePromise<SecurityPrice> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/security_prices/{id}',
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
     * Delete an price
     * Delete a price using the price ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteSecurityPrice(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/security_prices/{id}',
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
     * Get the price list for a trade date
     * Get the price list for a date using the market code and security ID
     * @param marketCode
     * @param secId
     * @param tradeDate
     * @param xTenantId The tenant identifier
     * @returns SecurityPrice OK
     * @throws ApiError
     */
    public getSecurityPricesForTradeDate(
        marketCode: string,
        secId: string,
        tradeDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<SecurityPrice> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/security_prices/{marketCode}/{secId}/{tradeDate}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
                'tradeDate': tradeDate,
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

}
