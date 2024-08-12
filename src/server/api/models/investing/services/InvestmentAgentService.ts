/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalance } from '../models/AccountBalance';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentAgent } from '../models/InvestmentAgent';
import type { InvestmentAgentRequest } from '../models/InvestmentAgentRequest';
import type { PageTemplateInvestmentAgent } from '../models/PageTemplateInvestmentAgent';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentAgentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new agent
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_agent_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAgent Success
     * @throws ApiError
     */
    public addInvestmentAgent(
        xTenantId: string,
        requestBody: InvestmentAgentRequest,
    ): CancelablePromise<InvestmentAgent> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/agents',
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
     * Updates the cash balance after a transaction **Requires a valid token**. Roles Allowed: {investment_agent_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateInvestmentAgentCashBalance(
        recordId: string,
        xTenantId: string,
        requestBody: AccountBalance,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/agents/balance/{recordId}',
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
     * Retrieve an agent
     * Retrieve an investment using the agent ID. **Requires a valid token**. Roles Allowed: {investment_agent_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAgent OK
     * @throws ApiError
     */
    public findInvestmentAgentById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAgent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/agents/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a agent
     * Delete a agent using the agent ID. **Requires a valid token**. Roles Allowed: {investment_agent_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentAgent(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/agents/{recordId}',
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
     * Update a agent
     * Update a agent in the system. **Requires a valid token**. Roles Allowed: {investment_agent_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAgent Success
     * @throws ApiError
     */
    public updateInvestmentAgent(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentAgentRequest,
    ): CancelablePromise<InvestmentAgent> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/agents/{recordId}',
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
     * Validate an agent ID
     * Validate that an agent ID exists and is active. **Requires a valid token**. Roles Allowed: {investment_agent_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateInvestmentAgentId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/agents/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for agents
     * Search for agents in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_agent_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentAgent OK
     * @throws ApiError
     */
    public searchInvestmentAgent(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentAgent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/agents/search',
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
     * List agents
     * List agents in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_agent_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentAgent OK
     * @throws ApiError
     */
    public listInvestmentAgent(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentAgent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/agents/list',
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
     * Retrieve an agent using the code
     * Retrieve an agent using the code. **Requires a valid token**. Roles Allowed: {investment_agent_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns InvestmentAgent OK
     * @throws ApiError
     */
    public findByInvestmentAgentByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAgent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/agents/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
