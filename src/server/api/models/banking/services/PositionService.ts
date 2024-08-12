/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { AccountSearchSort } from '../models/AccountSearchSort';
import type { Direction } from '../models/Direction';
import type { Money } from '../models/Money';
import type { PageTemplateAccount } from '../models/PageTemplateAccount';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PositionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Update an account balance
     * Update an account balance after a transaction. This is used internally by the accounting module to update balances after transactions have been committed.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public updateAccountBalance(
        id: UUID,
        xTenantId: string,
        requestBody: Money,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/position/accounts/balance/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List deposit and loan accounts for a client
     * Retrieve deposit and loan accounts for a client.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Account OK
     * @throws ApiError
     */
    public listClientAccounts(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Account>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/position/accounts/list/client/{clientId}',
            path: {
                'clientId': clientId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Search for deposit and loan accounts using a full text search engine
     * Search for  deposit and loan accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAccount OK
     * @throws ApiError
     */
    public searchBankAccount(
        order: Direction,
        sort: AccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/position/accounts/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'pattern': pattern,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a deposit or loan account
     * Retrieve an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Account Indicates that the request was successful.
     * @throws ApiError
     */
    public findBankAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Account> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/position/accounts/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
