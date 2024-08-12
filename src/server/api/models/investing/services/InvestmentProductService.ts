/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentProduct } from '../models/InvestmentProduct';
import type { InvestmentProductRequest } from '../models/InvestmentProductRequest';
import type { PageTemplateInvestmentProduct } from '../models/PageTemplateInvestmentProduct';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new product
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_product_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentProduct Success
     * @throws ApiError
     */
    public addInvestmentProduct(
        xTenantId: string,
        requestBody: InvestmentProductRequest,
    ): CancelablePromise<InvestmentProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/products',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve a product
     * Retrieve a product using the product ID. **Requires a valid token**. Roles Allowed: {investment_product_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentProduct OK
     * @throws ApiError
     */
    public findInvestmentProductById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a product
     * Delete a product using the product ID. **Requires a valid token**. Roles Allowed: {investment_product_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentProduct(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/products/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update a product
     * Update a product in the system. **Requires a valid token**. Roles Allowed: {investment_product_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentProduct Success
     * @throws ApiError
     */
    public updateInvestmentProduct(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentProductRequest,
    ): CancelablePromise<InvestmentProduct> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/products/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Search for products
     * Search for products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentProduct OK
     * @throws ApiError
     */
    public searchInvestmentProduct(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'pattern': pattern,
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * List products
     * List products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentProduct OK
     * @throws ApiError
     */
    public listInvestmentProduct(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'type' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * Validate an investment product code
     * Validate an investment product using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record. **Requires a valid token**. Roles Allowed: {investment_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @param recordId
     * @returns BooleanResponse Success
     * @throws ApiError
     */
    public isInvestmentProductCodeAvailable(
        code: string,
        xTenantId: string,
        recordId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'recordId': recordId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve a product
     * Retrieve a product using the product code. **Requires a valid token**. Roles Allowed: {investment_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InvestmentProduct OK
     * @throws ApiError
     */
    public findInvestmentProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
