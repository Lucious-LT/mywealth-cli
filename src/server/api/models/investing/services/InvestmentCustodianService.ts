/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalance } from '../models/AccountBalance';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentCustodian } from '../models/InvestmentCustodian';
import type { InvestmentCustodianRequest } from '../models/InvestmentCustodianRequest';
import type { PageTemplateInvestmentCustodian } from '../models/PageTemplateInvestmentCustodian';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentCustodianService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new custodian
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_custodian_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentCustodian Success
     * @throws ApiError
     */
    public addInvestmentCustodian(
        xTenantId: string,
        requestBody: InvestmentCustodianRequest,
    ): CancelablePromise<InvestmentCustodian> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/custodians',
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
     * Update the cash balance after a transaction
     * Updates the cash balance after a transaction **Requires a valid token**. Roles Allowed: {investment_custodian_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateInvestmentCustodianCashBalance(
        recordId: string,
        xTenantId: string,
        requestBody: AccountBalance,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/custodians/balance/{recordId}',
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
     * Retrieve a custodian
     * Retrieve an investment using the custodian ID. **Requires a valid token**. Roles Allowed: {investment_custodian_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentCustodian OK
     * @throws ApiError
     */
    public findInvestmentCustodianById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentCustodian> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/custodians/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a custodian
     * Delete a custodian using the custodian ID. **Requires a valid token**. Roles Allowed: {investment_custodian_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentCustodian(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/custodians/{recordId}',
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
     * Update a custodian
     * Update a custodian in the system. **Requires a valid token**. Roles Allowed: {investment_custodian_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentCustodian Success
     * @throws ApiError
     */
    public updateInvestmentCustodian(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentCustodianRequest,
    ): CancelablePromise<InvestmentCustodian> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/custodians/{recordId}',
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
     * Validate a custodian ID
     * Validate that a custodian ID exists and is active. **Requires a valid token**. Roles Allowed: {investment_custodian_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateInvestmentCustodianId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/custodians/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for custodians
     * Search for custodians in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_custodian_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentCustodian OK
     * @throws ApiError
     */
    public searchInvestmentCustodian(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentCustodian> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/custodians/search',
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
     * List custodians
     * List custodians in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_custodian_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentCustodian OK
     * @throws ApiError
     */
    public listInvestmentCustodian(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentCustodian> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/custodians/list',
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
     * Retrieve a custodian using the code
     * Retrieve a custodian using the code. **Requires a valid token**. Roles Allowed: {investment_custodian_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InvestmentCustodian OK
     * @throws ApiError
     */
    public findByInvestmentCustodianByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentCustodian> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/custodians/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
