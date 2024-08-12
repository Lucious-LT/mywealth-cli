/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { InsuranceProduct } from '../models/InsuranceProduct';
import type { InsuranceProductListSort } from '../models/InsuranceProductListSort';
import type { InsuranceProductRequest } from '../models/InsuranceProductRequest';
import type { InsuranceProductSearchSort } from '../models/InsuranceProductSearchSort';
import type { PageTemplateInsuranceProduct } from '../models/PageTemplateInsuranceProduct';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InsuranceProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new insurance product
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public addInsuranceProduct(
        xTenantId: string,
        requestBody: InsuranceProductRequest,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/products',
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
     * Retrieve a insurance product
     * Retrieve a product using the product code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findInsuranceProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/products/code/{code}',
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
     * Validate a product code
     * Validate a product using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param productId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isInsuranceProductCodeAvailable(
        code: string,
        xTenantId: string,
        productId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/products/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'productId': productId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List insurance products
     * Retrieve products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateInsuranceProduct OK
     * @throws ApiError
     */
    public listInsuranceProduct(
        order: Direction,
        sort: InsuranceProductListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateInsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/products/list',
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
     * Search for insurance products using a full text search engine
     * Search for products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateInsuranceProduct OK
     * @throws ApiError
     */
    public searchInsuranceProduct(
        order: Direction,
        sort: InsuranceProductSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateInsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/products/search',
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
     * Retrieve an insurance product
     * Retrieve a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findInsuranceProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/products/{id}',
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
     * Update an insurance product record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public updateInsuranceProduct(
        id: UUID,
        xTenantId: string,
        requestBody: InsuranceProductRequest,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/products/{id}',
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
     * Delete an insurance product
     * Delete a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteInsuranceProduct(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/products/{id}',
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
