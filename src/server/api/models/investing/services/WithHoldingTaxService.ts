/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageTemplateWithHoldingTax } from '../models/PageTemplateWithHoldingTax';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { WithHoldingTax } from '../models/WithHoldingTax';
import type { WithHoldingTaxRequest } from '../models/WithHoldingTaxRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WithHoldingTaxService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new interest configuration
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns WithHoldingTax Success
     * @throws ApiError
     */
    public addWithHoldingTax(
        xTenantId: string,
        requestBody: WithHoldingTaxRequest,
    ): CancelablePromise<WithHoldingTax> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/withholding_taxes',
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
     * Retrieve an interest configuration
     * Retrieve an interest configuration using the record ID. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns WithHoldingTax OK
     * @throws ApiError
     */
    public findWithHoldingTaxById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<WithHoldingTax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/withholding_taxes/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete an interest configuration
     * Delete an interest configuration using the record ID. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteWithHoldingTax(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/withholding_taxes/{recordId}',
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
     * Update an interest configuration
     * Update an interest configuration in the system. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns WithHoldingTax Success
     * @throws ApiError
     */
    public updateWithHoldingTax(
        recordId: string,
        xTenantId: string,
        requestBody: WithHoldingTaxRequest,
    ): CancelablePromise<WithHoldingTax> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/withholding_taxes/{recordId}',
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
     * Search for interest configurations
     * Search for interest configurations in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateWithHoldingTax OK
     * @throws ApiError
     */
    public searchWithHoldingTax(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateWithHoldingTax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/withholding_taxes/search',
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
     * List interest configurations
     * List interest configurations in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_withholding_tax_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateWithHoldingTax OK
     * @throws ApiError
     */
    public listWithHoldingTax(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'startDate' | 'endDate' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateWithHoldingTax> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/withholding_taxes/list',
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

}
