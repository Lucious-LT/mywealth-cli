/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalance } from '../models/AccountBalance';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentBroker } from '../models/InvestmentBroker';
import type { InvestmentBrokerRequest } from '../models/InvestmentBrokerRequest';
import type { PageTemplateInvestmentBroker } from '../models/PageTemplateInvestmentBroker';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentBrokerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new broker
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_broker_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentBroker Success
     * @throws ApiError
     */
    public addInvestmentBroker(
        xTenantId: string,
        requestBody: InvestmentBrokerRequest,
    ): CancelablePromise<InvestmentBroker> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/brokers',
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
     * Updates the cash balance after a transaction **Requires a valid token**. Roles Allowed: {investment_broker_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateInvestmentBrokerCashBalance(
        recordId: string,
        xTenantId: string,
        requestBody: AccountBalance,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/brokers/balance/{recordId}',
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
     * Retrieve a broker
     * Retrieve an investment using the broker ID. **Requires a valid token**. Roles Allowed: {investment_broker_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentBroker OK
     * @throws ApiError
     */
    public findInvestmentBrokerById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentBroker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/brokers/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a broker
     * Delete a broker using the broker ID. **Requires a valid token**. Roles Allowed: {investment_broker_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentBroker(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/brokers/{recordId}',
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
     * Update a broker
     * Update a broker in the system. **Requires a valid token**. Roles Allowed: {investment_broker_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentBroker Success
     * @throws ApiError
     */
    public updateInvestmentBroker(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentBrokerRequest,
    ): CancelablePromise<InvestmentBroker> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/brokers/{recordId}',
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
     * Validate a broker ID
     * Validate that a broker ID exists and is active. **Requires a valid token**. Roles Allowed: {investment_broker_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateInvestmentBrokerId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/brokers/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for brokers
     * Search for brokers in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_broker_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentBroker OK
     * @throws ApiError
     */
    public searchInvestmentBroker(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentBroker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/brokers/search',
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
     * List brokers
     * List brokers in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_broker_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentBroker OK
     * @throws ApiError
     */
    public listInvestmentBroker(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentBroker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/brokers/list',
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
     * Retrieve a broker using the code
     * Retrieve a broker using the code. **Requires a valid token**. Roles Allowed: {investment_broker_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InvestmentBroker OK
     * @throws ApiError
     */
    public findByInvestmentBrokerByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentBroker> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/brokers/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
