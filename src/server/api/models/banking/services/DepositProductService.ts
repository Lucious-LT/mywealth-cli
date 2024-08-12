/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { DepositProduct } from '../models/DepositProduct';
import type { DepositProductListSort } from '../models/DepositProductListSort';
import type { DepositProductRequest } from '../models/DepositProductRequest';
import type { DepositProductSearchSort } from '../models/DepositProductSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateDepositProduct } from '../models/PageTemplateDepositProduct';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DepositProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new deposit product
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public addDepositProduct(
        xTenantId: string,
        requestBody: DepositProductRequest,
    ): CancelablePromise<DepositProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/deposit/products',
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
     * Retrieve a deposit product
     * Retrieve a product using the product code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns DepositProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<DepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/products/code/{code}',
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
    public isDepositProductCodeAvailable(
        code: string,
        xTenantId: string,
        productId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/products/is-available/code',
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
     * List deposit products
     * Retrieve products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateDepositProduct OK
     * @throws ApiError
     */
    public listDepositProduct(
        order: Direction,
        sort: DepositProductListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/products/list',
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
     * Search for deposit products using a full text search engine
     * Search for products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateDepositProduct OK
     * @throws ApiError
     */
    public searchDepositProduct(
        order: Direction,
        sort: DepositProductSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/products/search',
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
     * Retrieve a deposit product
     * Retrieve a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns DepositProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findDepositProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<DepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/deposit/products/{id}',
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
     * Update a deposit product record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DepositProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public updateDepositProduct(
        id: UUID,
        xTenantId: string,
        requestBody: DepositProductRequest,
    ): CancelablePromise<DepositProduct> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/deposit/products/{id}',
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
     * Delete a deposit product
     * Delete a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteDepositProduct(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/deposit/products/{id}',
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
