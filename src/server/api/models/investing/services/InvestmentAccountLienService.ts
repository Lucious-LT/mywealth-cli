/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvestmentAccountLien } from '../models/InvestmentAccountLien';
import type { InvestmentAccountLienRequest } from '../models/InvestmentAccountLienRequest';
import type { PageTemplateInvestmentAccountLien } from '../models/PageTemplateInvestmentAccountLien';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentAccountLienService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new lien
     * Creates a new lien in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_account_lien_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAccountLien Success
     * @throws ApiError
     */
    public addInvestmentAccountLien(
        xTenantId: string,
        requestBody: InvestmentAccountLienRequest,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/account/liens',
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
     * Retrieve a lien
     * Retrieve a lien using the lien ID. **Requires a valid token**. Roles Allowed: {investment_account_lien_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccountLien OK
     * @throws ApiError
     */
    public findInvestmentAccountLienById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/account/liens/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a lien
     * Delete a lien using the account ID. **Requires a valid token**. Roles Allowed: {investment_account_lien_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentAccountLien(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/account/liens/{recordId}',
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
     * Update a lien
     * Update a lien in the system. **Requires a valid token**. Roles Allowed: {investment_account_lien_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAccountLien Success
     * @throws ApiError
     */
    public updateInvestmentAccountLien(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentAccountLienRequest,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/account/liens/{recordId}',
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
     * Close a lien
     * Close a lien using the lien ID. **Requires a valid token**. Roles Allowed: {investment_account_lien_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccountLien OK
     * @throws ApiError
     */
    public closeInvestmentAccountLienById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/account/liens/close/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve a lien
     * Approve a lien using the lien ID. This will set the status to active. **Requires a valid token**. Roles Allowed: {investment_account_lien_approve, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccountLien OK
     * @throws ApiError
     */
    public approveInvestmentAccountLienById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/account/liens/approve/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for liens
     * Search for liens in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_lien_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentAccountLien OK
     * @throws ApiError
     */
    public searchInvestmentAccountLien(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'lienLabel_sort' | 'lienNo_sort' | 'clientCode_sort' | 'clientLabel_sort' = 'lienNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/account/liens/search',
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
     * List liens
     * List liens in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_lien_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentAccountLien OK
     * @throws ApiError
     */
    public listInvestmentAccountLien(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'lienNo' | 'lienLabel' | 'clientCode' | 'clientLabel' | 'status' | 'expirationDate' = 'lienNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/account/liens/list',
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
     * List liens for an account
     * List liens for an account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_lien_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccountLien OK
     * @throws ApiError
     */
    public listInvestmentAccountLiensForAccount(
        accountId: string,
        xTenantId: string,
    ): CancelablePromise<Array<InvestmentAccountLien>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/account/liens/list/{accountId}',
            path: {
                'accountId': accountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Retrieve a lien using the code
     * Retrieve a lien using the code. **Requires a valid token**. Roles Allowed: {investment_account_lien_view, sysadmin}
     * @param lienCode
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccountLien OK
     * @throws ApiError
     */
    public findByInvestmentAccountLienByCode(
        lienCode: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccountLien> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/account/liens/code/{lienCode}',
            path: {
                'lienCode': lienCode,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
