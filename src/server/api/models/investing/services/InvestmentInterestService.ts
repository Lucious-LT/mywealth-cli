/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvestmentInterest } from '../models/InvestmentInterest';
import type { InvestmentInterestRequest } from '../models/InvestmentInterestRequest';
import type { PageTemplateInvestmentInterest } from '../models/PageTemplateInvestmentInterest';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentInterestService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new interest configuration
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_interest_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentInterest Success
     * @throws ApiError
     */
    public addInvestmentInterest(
        xTenantId: string,
        requestBody: InvestmentInterestRequest,
    ): CancelablePromise<InvestmentInterest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/interests',
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
     * Retrieve an interest configuration using the record ID. **Requires a valid token**. Roles Allowed: {investment_interest_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentInterest OK
     * @throws ApiError
     */
    public findInvestmentInterestById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/interests/{recordId}',
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
     * Delete an interest configuration using the record ID. **Requires a valid token**. Roles Allowed: {investment_interest_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentInterest(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/interests/{recordId}',
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
     * Update an interest configuration in the system. **Requires a valid token**. Roles Allowed: {investment_interest_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentInterest Success
     * @throws ApiError
     */
    public updateInvestmentInterest(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentInterestRequest,
    ): CancelablePromise<InvestmentInterest> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/interests/{recordId}',
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
     * Search for interest configurations in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_interest_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentInterest OK
     * @throws ApiError
     */
    public searchInvestmentInterest(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/interests/search',
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
     * List interest configurations in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_interest_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentInterest OK
     * @throws ApiError
     */
    public listInvestmentInterest(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'rateType' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentInterest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/interests/list',
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
