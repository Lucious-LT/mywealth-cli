/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BalanceSheetReport } from '../models/BalanceSheetReport';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { ProfitLossReport } from '../models/ProfitLossReport';
import type { StatementView } from '../models/StatementView';
import type { TrialBalanceReport } from '../models/TrialBalanceReport';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class GlAccountsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Generate a balance sheet
     * Generate a balance sheet using the company ID
     * @param companyId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @param branchId
     * @returns BalanceSheetReport Indicates that the request was successful.
     * @throws ApiError
     */
    public generateBalanceSheetStatement(
        companyId: UUID,
        valueDate: LocalDate,
        xTenantId: string,
        branchId?: UUID,
    ): CancelablePromise<BalanceSheetReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/accounts/balance-sheet/{companyId}',
            path: {
                'companyId': companyId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'branchId': branchId,
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
     * Get a header GL account balance. You can optionally set the 'useCachedValue' flag to false to ensure that the balance is not read from a cache that is updated every 60 seconds.Disabling the cache could affect the performance of this API for very large general ledger data streams.This API will return the balance of all sub accounts that report to the header account.
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
            url: '/reports/accounting/api/v1/accounts/balance/header/{accountId}',
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
     * Get a GL account balance using the ID.
     * Get a GL account balance. You can optionally set the 'useCachedValue' flag to false to ensure that the balance is not read from a cache that is updated every 60 seconds.Disabling the cache could affect the performance of this API for very large general ledger data streams.
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
            url: '/reports/accounting/api/v1/accounts/balance/{accountId}',
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
     * Generate a profit & loss statement
     * Generate a profit & loss statement using the company ID and an optional branch ID
     * @param companyId
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @param branchId
     * @returns ProfitLossReport Indicates that the request was successful.
     * @throws ApiError
     */
    public generateProfitLossStatement(
        companyId: UUID,
        endDate: LocalDate,
        startDate: LocalDate,
        xTenantId: string,
        branchId?: UUID,
    ): CancelablePromise<ProfitLossReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/accounts/profit-loss-statement/{companyId}',
            path: {
                'companyId': companyId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'branchId': branchId,
                'endDate': endDate,
                'startDate': startDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Generate a GL account statement
     * Generate a sub account (BANK or INVESTMENT) statement using the ID
     * @param accountId
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @param page
     * @param showReversals
     * @param size
     * @returns StatementView Indicates that the request was successful.
     * @throws ApiError
     */
    public generateAccountStatement(
        accountId: UUID,
        endDate: LocalDate,
        startDate: LocalDate,
        xTenantId: string,
        page: number,
        showReversals: boolean = true,
        size: number = 20,
    ): CancelablePromise<StatementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/accounts/statement/{accountId}',
            path: {
                'accountId': accountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endDate': endDate,
                'page': page,
                'showReversals': showReversals,
                'size': size,
                'startDate': startDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Generate the trial balance for a company
     * Generate the trial balance for a company using the company ID and an optional branch ID
     * @param companyId
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @param includeActsWithNoBal
     * @returns TrialBalanceReport Indicates that the request was successful.
     * @throws ApiError
     */
    public generateTrialBalance(
        companyId: UUID,
        endDate: LocalDate,
        startDate: LocalDate,
        xTenantId: string,
        includeActsWithNoBal: boolean = false,
    ): CancelablePromise<TrialBalanceReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/accounts/trial-balance/{companyId}',
            path: {
                'companyId': companyId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endDate': endDate,
                'includeActsWithNoBal': includeActsWithNoBal,
                'startDate': startDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
