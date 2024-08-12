/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { LoanProduct } from '../models/LoanProduct';
import type { LoanProductListSort } from '../models/LoanProductListSort';
import type { LoanProductRequest } from '../models/LoanProductRequest';
import type { LoanProductSearchSort } from '../models/LoanProductSearchSort';
import type { PageTemplateLoanProduct } from '../models/PageTemplateLoanProduct';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new loan product
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public addLoanProduct(
        xTenantId: string,
        requestBody: LoanProductRequest,
    ): CancelablePromise<LoanProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/loan/products',
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
     * Retrieve a loan product
     * Retrieve a product using the product code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/products/code/{code}',
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
    public isLoanProductCodeAvailable(
        code: string,
        xTenantId: string,
        productId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/products/is-available/code',
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
     * List loan products
     * Retrieve products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanProduct OK
     * @throws ApiError
     */
    public listLoanProduct(
        order: Direction,
        sort: LoanProductListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/products/list',
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
     * Search for loan products using a full text search engine
     * Search for products in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanProduct OK
     * @throws ApiError
     */
    public searchLoanProduct(
        order: Direction,
        sort: LoanProductSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/products/search',
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
     * Retrieve a loan product
     * Retrieve a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/products/{id}',
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
     * Update a loan product record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanProduct(
        id: UUID,
        xTenantId: string,
        requestBody: LoanProductRequest,
    ): CancelablePromise<LoanProduct> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan/products/{id}',
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
     * Delete a loan product
     * Delete a product using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteLoanProduct(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/loan/products/{id}',
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
