/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { PageTemplateTax } from '../models/PageTemplateTax';
import type { Tax } from '../models/Tax';
import type { TaxListSort } from '../models/TaxListSort';
import type { TaxRequest } from '../models/TaxRequest';
import type { TaxSearchSort } from '../models/TaxSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TaxService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new tax
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Tax Indicates that the request was successful.
     * @throws ApiError
     */
    public addTax(
        xTenantId: string,
        requestBody: TaxRequest,
    ): CancelablePromise<Tax> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/taxes',
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
     * Retrieve a tax
     * Retrieve a tax using the tax code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Tax Indicates that the request was successful.
     * @throws ApiError
     */
    public findTaxByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Tax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/taxes/code/{code}',
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
     * Validate a tax code
     * Validate a tax using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param taxId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isTaxCodeAvailable(
        code: string,
        xTenantId: string,
        taxId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/taxes/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'taxId': taxId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List taxes
     * Retrieve taxes in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTax OK
     * @throws ApiError
     */
    public listTax(
        order: Direction,
        sort: TaxListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/taxes/list',
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
     * Search for tax using a full text search engine
     * Search for taxes in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTax OK
     * @throws ApiError
     */
    public searchTax(
        order: Direction,
        sort: TaxSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/taxes/search',
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
     * Retrieve a tax
     * Retrieve a tax using the tax ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Tax Indicates that the request was successful.
     * @throws ApiError
     */
    public findTaxById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Tax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/taxes/{id}',
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
     * Update a tax record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Tax Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTax(
        id: UUID,
        xTenantId: string,
        requestBody: TaxRequest,
    ): CancelablePromise<Tax> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/taxes/{id}',
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
     * Delete a tax
     * Delete a tax using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTax(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/taxes/{id}',
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
