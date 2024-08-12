/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { AccountRequest } from '../models/AccountRequest';
import type { AccountUploadRequest } from '../models/AccountUploadRequest';
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { GlAccountListSort } from '../models/GlAccountListSort';
import type { GlAccountSearchSort } from '../models/GlAccountSearchSort';
import type { GlAccountStatus } from '../models/GlAccountStatus';
import type { GlAccountType } from '../models/GlAccountType';
import type { GlSubAccountType } from '../models/GlSubAccountType';
import type { JournalType } from '../models/JournalType';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { MovementView } from '../models/MovementView';
import type { PageTemplateAccount } from '../models/PageTemplateAccount';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new account
     * Creates a new record in the system. See the schema of the object for more information.  The digits of the GL code dictate the GL account hierarchy within the chart
     * The first digit shows the initial hierarchy and position, the second the second level of hierarchy and so on
     * Header accounts sum up every other GL account starting with their same hierarchy level.
     * Below is an example of how the header accounts sum up detail/header accounts with codes that have a parent prefix.
     * All trialing zeros in the chart are ignored when the header / control account balances are evaluated.
     * 10000    1xxxx
     * 11000    11xxx
     * 11100    111xx
     *
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Account Indicates that the request was successful.
     * @throws ApiError
     */
    public addAccount(
        xTenantId: string,
        requestBody: AccountRequest,
    ): CancelablePromise<Account> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/accounts',
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
     * Get a GL account balance using the ID.
     * Get a GL account balance using the account ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getAccountBalance(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/balance/account/{accountId}',
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
     * Get a header GL account balance using the ID.
     * Get a header GL account balance using the account ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getHeaderAccountBalance(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/balance/header/account/{accountId}',
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
     * Get a sub account balance
     * Get a sub account (BANK or INVESTMENT or INSURANCE) balance using the ID
     * @param subAccountId
     * @param subAccountType
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getSubAccountBalance(
        subAccountId: UUID,
        subAccountType: GlSubAccountType,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/balance/sub-account/{subAccountId}',
            path: {
                'subAccountId': subAccountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'subAccountType': subAccountType,
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
     * Retrieve an account
     * Retrieve an account using the account code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Account Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Account> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/code/{code}',
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
     * Validate an account code
     * Validate an account using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param accountId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isAccountCodeAvailable(
        code: string,
        xTenantId: string,
        accountId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'accountId': accountId,
                'code': code,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List accounts
     * Retrieve accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAccount OK
     * @throws ApiError
     */
    public listAccount(
        order: Direction,
        sort: GlAccountListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/list',
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
     * List posting accounts filtered by type
     * List posting accounts filtered by type. The type can be either 'asset', 'liability', 'equity', 'income', or 'expense'. and they have to be active.
     * @param type
     * @param xTenantId The tenant identifier
     * @returns Account OK
     * @throws ApiError
     */
    public listHeaderAccountByType(
        type: GlAccountType,
        xTenantId: string,
    ): CancelablePromise<Array<Account>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/list/header/{type}',
            path: {
                'type': type,
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
     * List header accounts filtered by type and company
     * List posting accounts filtered by type. The type can be either 'asset', 'liability', 'equity', 'income', or 'expense'. and they have to be active.
     * @param companyId
     * @param type
     * @param xTenantId The tenant identifier
     * @returns Account OK
     * @throws ApiError
     */
    public listHeaderAccountByTypeAndCompany(
        companyId: UUID,
        type: GlAccountType,
        xTenantId: string,
    ): CancelablePromise<Array<Account>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/list/header/{type}/company/{companyId}',
            path: {
                'companyId': companyId,
                'type': type,
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
     * List posting accounts filtered by type
     * List posting accounts filtered by type. The type can be either 'asset', 'liability', 'equity', 'income', or 'expense'. and they have to be active.
     * @param type
     * @param xTenantId The tenant identifier
     * @returns Account OK
     * @throws ApiError
     */
    public listPostingAccountByType(
        type: GlAccountType,
        xTenantId: string,
    ): CancelablePromise<Array<Account>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/list/posting/{type}',
            path: {
                'type': type,
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
     * List posting accounts filtered by type and company
     * List posting accounts filtered by type. The type can be either 'asset', 'liability', 'equity', 'income', or 'expense'. and they have to be active.
     * @param companyId
     * @param type
     * @param xTenantId The tenant identifier
     * @returns Account OK
     * @throws ApiError
     */
    public listPostingAccountByTypeAndCompany(
        companyId: UUID,
        type: GlAccountType,
        xTenantId: string,
    ): CancelablePromise<Array<Account>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/list/posting/{type}/company/{companyId}',
            path: {
                'companyId': companyId,
                'type': type,
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
     * Check if a GL account has any movement
     * Check if a GL account has any movement. This will return true if the account has any movement and false if it does not have any movement.
     * @param accountId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public containsGlEntries(
        accountId: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/movement/account/{accountId}/is-active',
            path: {
                'accountId': accountId,
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
     * Get a GL account movement using the ID.
     * Get a GL account movement for a day using the account ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns MovementView Indicates that the request was successful.
     * @throws ApiError
     */
    public getHeaderAccountMovement(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<MovementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/movement/header/account/{accountId}',
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
     * Get a GL account movement using the ID.
     * Get a GL account movement for a day using the account ID
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns MovementView Indicates that the request was successful.
     * @throws ApiError
     */
    public getPostingAccountMovement(
        accountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<MovementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/movement/posting/account/{accountId}',
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
     * Get a sub account movement using the ID.
     * Get a sub account movement for a day using the account ID. Defaults to CASH and the current date if those parameters are not specified
     * @param subAccountId
     * @param xTenantId The tenant identifier
     * @param journalType
     * @param valueDate
     * @returns MovementView Indicates that the request was successful.
     * @throws ApiError
     */
    public getSubAccountMovement(
        subAccountId: UUID,
        xTenantId: string,
        journalType?: JournalType,
        valueDate?: LocalDate,
    ): CancelablePromise<MovementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/movement/sub-account/{subAccountId}',
            path: {
                'subAccountId': subAccountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'journalType': journalType,
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
     * Search for GL accounts using a full text search engine
     * Search for GL accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAccount OK
     * @throws ApiError
     */
    public searchAccount(
        order: Direction,
        sort: GlAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/search',
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
     * Search for GL posting accounts using a full text search engine
     * Search for GL posting accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAccount OK
     * @throws ApiError
     */
    public searchPostingAccount(
        order: Direction,
        sort: GlAccountSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/search/posting',
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
     * Create a new chart of account using the uploaded excel file
     * Creates a new chart of account in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled backSee the documentation for the expected file format for more information.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param companyId
     * @param status
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadChart(
        xTenantId: string,
        formData: AccountUploadRequest,
        companyId?: UUID,
        status?: GlAccountStatus,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/accounts/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'companyId': companyId,
                'status': status,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve an account
     * Retrieve an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Account Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Account> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/accounts/{id}',
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
     * Update an account record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Account Indicates that the request was successful.
     * @throws ApiError
     */
    public updateAccount(
        id: UUID,
        xTenantId: string,
        requestBody: AccountRequest,
    ): CancelablePromise<Account> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/accounts/{id}',
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
     * Delete an account
     * Delete an account using the account ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteAccount(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/accounts/{id}',
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
