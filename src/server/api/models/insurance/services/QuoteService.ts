/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { InsuranceProduct } from '../models/InsuranceProduct';
import type { PageTemplateQuote } from '../models/PageTemplateQuote';
import type { Quote } from '../models/Quote';
import type { QuoteListSort } from '../models/QuoteListSort';
import type { QuoteRequest } from '../models/QuoteRequest';
import type { QuoteSearchSort } from '../models/QuoteSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class QuoteService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new insurance quote
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public addQuote(
        xTenantId: string,
        requestBody: QuoteRequest,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/quotes',
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
     * Cancel an insurance quote
     * Cancel an insurance quote using the quote ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelQuoteById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/quotes/cancel/{id}',
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
     * Retrieve quotes for a client using the ID
     * Retrieve quotes for a client using the ID
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Quote OK
     * @throws ApiError
     */
    public findQuotesForClientById(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Quote>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/client/{clientId}',
            path: {
                'clientId': clientId,
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
     * Retrieve an insurance quote
     * Retrieve an quote using the quote code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public findQuoteByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/code/{code}',
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
     * Convert an insurance quote to a policy
     * Convert an insurance to a policy using the quote ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public convertQuoteById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/quotes/convert/{id}',
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
     * List insurance policies
     * Retrieve policies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateQuote OK
     * @throws ApiError
     */
    public listQuote(
        order: Direction,
        sort: QuoteListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateQuote> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/list',
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
     * Retrieve an insurance product using the quote ID
     * Retrieve an insurance product using the quote ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findQuoteProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/product/{id}',
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
     * Search for insurance policies using a full text search engine
     * Search for policies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateQuote OK
     * @throws ApiError
     */
    public searchQuote(
        order: Direction,
        sort: QuoteSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateQuote> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/search',
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
     * Retrieve a insurance quote
     * Retrieve an quote using the quote ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public findQuoteById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/quotes/{id}',
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
     * Update a insurance quote record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Quote Indicates that the request was successful.
     * @throws ApiError
     */
    public updateQuote(
        id: UUID,
        xTenantId: string,
        requestBody: QuoteRequest,
    ): CancelablePromise<Quote> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/quotes/{id}',
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
     * Delete an insurance quote
     * Delete a quote using the quote ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteQuote(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/quotes/{id}',
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
