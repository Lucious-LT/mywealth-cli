/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { MoneyMarketProduct } from '../models/MoneyMarketProduct';
import type { MoneyMarketProductRequest } from '../models/MoneyMarketProductRequest';
import type { PageTemplateMoneyMarketProduct } from '../models/PageTemplateMoneyMarketProduct';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MoneyMarketProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new product
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {money_market_product_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketProduct Success
     * @throws ApiError
     */
    public addMoneyMarketProduct(
        xTenantId: string,
        requestBody: MoneyMarketProductRequest,
    ): CancelablePromise<MoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/products/money_market',
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
     * Retrieve a product using the product ID. **Requires a valid token**. Roles Allowed: {money_market_product_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketProduct OK
     * @throws ApiError
     */
    public findMoneyMarketProductById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/money_market/{recordId}',
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
     * Delete a product using the product ID. **Requires a valid token**. Roles Allowed: {money_market_product_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteMoneyMarketProduct(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/products/money_market/{recordId}',
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
     * Update a product in the system. **Requires a valid token**. Roles Allowed: {money_market_product_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketProduct Success
     * @throws ApiError
     */
    public updateMoneyMarketProduct(
        recordId: string,
        xTenantId: string,
        requestBody: MoneyMarketProductRequest,
    ): CancelablePromise<MoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/products/money_market/{recordId}',
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
     * Search for products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketProduct OK
     * @throws ApiError
     */
    public searchMoneyMarketProduct(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/money_market/search',
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
     * List products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketProduct OK
     * @throws ApiError
     */
    public listMoneyMarketProduct(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'interestType' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/money_market/list',
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
     * Validate a money market product code
     * Validate a money market product using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record. **Requires a valid token**. Roles Allowed: {money_market_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @param recordId
     * @returns BooleanResponse Success
     * @throws ApiError
     */
    public isMoneyMarketProductCodeAvailable(
        code: string,
        xTenantId: string,
        recordId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/money_market/is-available/code',
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
     * Retrieve a product using the product code. **Requires a valid token**. Roles Allowed: {money_market_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketProduct OK
     * @throws ApiError
     */
    public findMoneyMarketProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/money_market/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
