/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LoanAccount } from '../models/LoanAccount';
import type { LoanAccountListSort } from '../models/LoanAccountListSort';
import type { LoanAccountRequest } from '../models/LoanAccountRequest';
import type { LoanAccountSchedule } from '../models/LoanAccountSchedule';
import type { LoanAccountSearchSort } from '../models/LoanAccountSearchSort';
import type { LoanProduct } from '../models/LoanProduct';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateLoanAccount } from '../models/PageTemplateLoanAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoanAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new loan account
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public addLoanAccount(
        xTenantId: string,
        requestBody: LoanAccountRequest,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/loan/accounts',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Approve a loan account
     * Approve a loan account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public approveLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan/accounts/approve/{id}',
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

    /**
     * Get a loan account balance
     * Get an account balance using the ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getLoanAccountBalance(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/balance/account/{accountId}',
            path: {
                'accountId': accountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'valueDate': valueDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Block a loan account
     * Block a loan account using the loan account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public blockLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan/accounts/block/{id}',
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

    /**
     * Close a loan account
     * Close a loan account using the loan account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public closeLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan/accounts/close/{id}',
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

    /**
     * Retrieve a loan account
     * Retrieve an account using the account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/code/{code}',
            path: {
                'code': code,
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

    /**
     * List loan accounts
     * Retrieve accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateLoanAccount OK
     * @throws ApiError
     */
    public listLoanAccount(
        order: Direction,
        sort: LoanAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
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
     * List loan accounts for a client
     * Retrieve loan accounts for a client.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns LoanAccount OK
     * @throws ApiError
     */
    public listClientLoanAccounts(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<LoanAccount>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/list/client/{clientId}',
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
     * Retrieve a loan product using the account ID
     * Retrieve a loan product using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/product/{id}',
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

    /**
     * Reject a loan account
     * Reject a loan account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public rejectLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan/accounts/reject/{id}',
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

    /**
     * Retrieve a loan repayment schedule
     * Retrieve a loan repayment schedule using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccountSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountScheduleById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<LoanAccountSchedule>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/schedule/{id}',
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

    /**
     * Search for loan accounts using a full text search engine
     * Search for accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateLoanAccount OK
     * @throws ApiError
     */
    public searchLoanAccount(
        order: Direction,
        sort: LoanAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateLoanAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/search',
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
     * Remove a loan account block
     * Remove a loan account block using the loan account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public unblockLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/loan/accounts/unblock/{id}',
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

    /**
     * Retrieve a loan account
     * Retrieve an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public findLoanAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/loan/accounts/{id}',
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

    /**
     * Update a loan account record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns LoanAccount Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLoanAccount(
        id: UUID,
        xTenantId: string,
        requestBody: LoanAccountRequest,
    ): CancelablePromise<LoanAccount> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/loan/accounts/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Delete a loan account
     * Delete an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteLoanAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/loan/accounts/{id}',
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
