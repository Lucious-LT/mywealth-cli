/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { FixedDepositProduct } from '../models/FixedDepositProduct';
import type { FixedDepositProductRequest } from '../models/FixedDepositProductRequest';
import type { PageTemplateFixedDepositProduct } from '../models/PageTemplateFixedDepositProduct';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedDepositProductService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new product
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedDepositProduct Success
     * @throws ApiError
     */
    public addFixedDepositProduct(
        xTenantId: string,
        requestBody: FixedDepositProductRequest,
    ): CancelablePromise<FixedDepositProduct> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/products/fixed_deposit',
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
     * Retrieve a product using the product ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositProduct OK
     * @throws ApiError
     */
    public findFixedDepositProductById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/fixed_deposit/{recordId}',
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
     * Delete a product using the product ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteFixedDepositProduct(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/products/fixed_deposit/{recordId}',
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
     * Update a product in the system. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedDepositProduct Success
     * @throws ApiError
     */
    public updateFixedDepositProduct(
        recordId: string,
        xTenantId: string,
        requestBody: FixedDepositProductRequest,
    ): CancelablePromise<FixedDepositProduct> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/products/fixed_deposit/{recordId}',
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
     * Search for products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositProduct OK
     * @throws ApiError
     */
    public searchFixedDepositProduct(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/fixed_deposit/search',
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
     * List products in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositProduct OK
     * @throws ApiError
     */
    public listFixedDepositProduct(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'interestType' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/fixed_deposit/list',
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
     * Validate a fixed deposit product code
     * Validate a fixed deposit product using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @param recordId
     * @returns BooleanResponse Success
     * @throws ApiError
     */
    public isFixedDepositProductCodeAvailable(
        code: string,
        xTenantId: string,
        recordId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/fixed_deposit/is-available/code',
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
     * Retrieve a product using the product code. **Requires a valid token**. Roles Allowed: {fixed_deposit_product_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns FixedDepositProduct OK
     * @throws ApiError
     */
    public findFixedDepositProductByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/products/fixed_deposit/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
