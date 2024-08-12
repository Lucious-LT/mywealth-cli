/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalance } from '../models/AccountBalance';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentRegistrar } from '../models/InvestmentRegistrar';
import type { InvestmentRegistrarRequest } from '../models/InvestmentRegistrarRequest';
import type { PageTemplateInvestmentRegistrar } from '../models/PageTemplateInvestmentRegistrar';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentRegistrarService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new registrar
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_registrar_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentRegistrar Success
     * @throws ApiError
     */
    public addInvestmentRegistrar(
        xTenantId: string,
        requestBody: InvestmentRegistrarRequest,
    ): CancelablePromise<InvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/registrars',
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
     * Updates the cash balance after a transaction **Requires a valid token**. Roles Allowed: {investment_registrar_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateInvestmentRegistrarCashBalance(
        recordId: string,
        xTenantId: string,
        requestBody: AccountBalance,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/registrars/balance/{recordId}',
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
     * Retrieve a registrar
     * Retrieve an investment using the registrar ID. **Requires a valid token**. Roles Allowed: {investment_registrar_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentRegistrar OK
     * @throws ApiError
     */
    public findInvestmentRegistrarById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/registrars/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a registrar
     * Delete a registrar using the registrar ID. **Requires a valid token**. Roles Allowed: {investment_registrar_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentRegistrar(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/registrars/{recordId}',
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
     * Update a registrar
     * Update a registrar in the system. **Requires a valid token**. Roles Allowed: {investment_registrar_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentRegistrar Success
     * @throws ApiError
     */
    public updateInvestmentRegistrar(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentRegistrarRequest,
    ): CancelablePromise<InvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/registrars/{recordId}',
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
     * Validate a registrar ID
     * Validate that a registrar ID exists and is active. **Requires a valid token**. Roles Allowed: {investment_registrar_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateInvestmentRegistrarId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/registrars/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for registrars
     * Search for registrars in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_registrar_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentRegistrar OK
     * @throws ApiError
     */
    public searchInvestmentRegistrar(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/registrars/search',
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
     * List registrars
     * List registrars in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_registrar_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentRegistrar OK
     * @throws ApiError
     */
    public listInvestmentRegistrar(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/registrars/list',
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
     * Retrieve a registrar using the code
     * Retrieve a registrar using the code. **Requires a valid token**. Roles Allowed: {investment_registrar_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InvestmentRegistrar OK
     * @throws ApiError
     */
    public findByInvestmentRegistrarByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentRegistrar> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/registrars/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
