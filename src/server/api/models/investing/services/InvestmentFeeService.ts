/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvestmentFee } from '../models/InvestmentFee';
import type { InvestmentFeeRequest } from '../models/InvestmentFeeRequest';
import type { PageTemplateInvestmentFee } from '../models/PageTemplateInvestmentFee';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentFeeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new fee
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_fee_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentFee Success
     * @throws ApiError
     */
    public addInvestmentFee(
        xTenantId: string,
        requestBody: InvestmentFeeRequest,
    ): CancelablePromise<InvestmentFee> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fees',
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
     * Retrieve a fee
     * Retrieve a fee using the fee ID. **Requires a valid token**. Roles Allowed: {investment_fee_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentFee OK
     * @throws ApiError
     */
    public findInvestmentFeeById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fees/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a fee
     * Delete a fee using the fee ID. **Requires a valid token**. Roles Allowed: {investment_fee_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentFee(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/fees/{recordId}',
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
     * Update a fee
     * Update a fee in the system. **Requires a valid token**. Roles Allowed: {investment_fee_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentFee Success
     * @throws ApiError
     */
    public updateInvestmentFee(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentFeeRequest,
    ): CancelablePromise<InvestmentFee> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fees/{recordId}',
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
     * Search for fees
     * Search for fees in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_fee_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentFee OK
     * @throws ApiError
     */
    public searchInvestmentFee(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fees/search',
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
     * List fees
     * List fees in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_fee_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentFee OK
     * @throws ApiError
     */
    public listInvestmentFee(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'feeType' | 'code' | 'label' | 'currency' | 'status' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentFee> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fees/list',
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
