/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DividendAccrualRequest } from '../models/DividendAccrualRequest';
import type { DividendAccrualReversalRequest } from '../models/DividendAccrualReversalRequest';
import type { DividendDistributionRequest } from '../models/DividendDistributionRequest';
import type { DividendDistributionResponse } from '../models/DividendDistributionResponse';
import type { EndOfDayReport } from '../models/EndOfDayReport';
import type { EndOfDayReportResponse } from '../models/EndOfDayReportResponse';
import type { EndOfDayRequest } from '../models/EndOfDayRequest';
import type { FundDividendAccrual } from '../models/FundDividendAccrual';
import type { FundValuationReport } from '../models/FundValuationReport';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { ScheduledDividendDistributionRequest } from '../models/ScheduledDividendDistributionRequest';
import type { ScheduledDividendDistributionResponse } from '../models/ScheduledDividendDistributionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EndOfDayService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Start end of day
     * Sends a message to the eod service to start the eod process. This process will send an email when it completes.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns EndOfDayReportResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public startEndOfDay(
        xTenantId: string,
        requestBody: EndOfDayRequest,
    ): CancelablePromise<EndOfDayReportResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/eod',
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
     * Create a new dividend accrual record
     * This API should only be used when migrating data from a legacy system and can be used to create dividend accrual records that are part of the transferred positions
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundDividendAccrual Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public postDividendAccrual(
        xTenantId: string,
        requestBody: DividendAccrualRequest,
    ): CancelablePromise<FundDividendAccrual> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/eod/dividend-accrual',
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
     * Post the accrued dividend for an account
     * Post the total accrued dividend for an account.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns DividendDistributionResponse Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public postPendingDividendsForInvestmentAccount(
        xTenantId: string,
        requestBody: DividendDistributionRequest,
    ): CancelablePromise<DividendDistributionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/eod/post/accrued-dividend',
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
     * Post all accrued dividends for a fund
     * Post all accrued dividends for a fund using the requested distribution date.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns ScheduledDividendDistributionResponse Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public postScheduledDividendDistribution(
        xTenantId: string,
        requestBody: ScheduledDividendDistributionRequest,
    ): CancelablePromise<ScheduledDividendDistributionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/eod/post/scheduled-dividend-distribution',
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
     * Retrieve the total accrued dividend for an account
     * Retrieve the total accrued dividend for an account. You can optionally specify a valuation date and fund code. If no date is specified, the current date is used. If no fund code is specified, the total accrued dividend for all funds is returned.
     * @param accountId
     * @param currency
     * @param xTenantId The tenant identifier
     * @param fundCode
     * @param valuationDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getAccruedDividendForInvestmentAccount(
        accountId: UUID,
        currency: string,
        xTenantId: string,
        fundCode?: string | null,
        valuationDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/eod/report/accrued-dividend/account/{accountId}/{currency}',
            path: {
                'accountId': accountId,
                'currency': currency,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'fundCode': fundCode,
                'valuationDate': valuationDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve an end of day report for all funds
     * Retrieve an end of day report for all funds using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns EndOfDayReport Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayReportByDate(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/eod/report/date/{date}',
            path: {
                'date': date,
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
     * Retrieve an end of day report for a fund
     * Retrieve an end of day report for a fund using the eod date.
     * @param date
     * @param fundId
     * @param xTenantId The tenant identifier
     * @returns FundValuationReport Indicates that the request was successful.
     * @throws ApiError
     */
    public findValuationReportForFundByDate(
        date: LocalDate,
        fundId: UUID,
        xTenantId: string,
    ): CancelablePromise<FundValuationReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/eod/report/fund/{fundId}/date/{date}',
            path: {
                'date': date,
                'fundId': fundId,
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
     * Retrieve an end of day report
     * Retrieve an end of day report by ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns EndOfDayReport Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayReportById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/eod/report/id/{id}',
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
     * Reverse distributed dividend for an account
     * Reverse distributed dividend for an account using the distribution ID
     * @param distributionId
     * @param xTenantId The tenant identifier
     * @returns DividendDistributionResponse Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public reverseDistributedDividendForInvestmentAccount(
        distributionId: UUID,
        xTenantId: string,
    ): CancelablePromise<DividendDistributionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/eod/reverse/accrued-dividend/{distributionId}',
            path: {
                'distributionId': distributionId,
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
     * Reverse pending dividends for an account after a given date
     * Reverse pending dividends for an account after a given date. This API is used by the investing service to delete accruals when a subscription is cancelled. Note that EOD will have to be run again for the affected date range in a scenario where the client still has an investment in that fund left after the cancellation.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Money Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public reversePendingDividendsForInvestmentAccount(
        xTenantId: string,
        requestBody: DividendAccrualReversalRequest,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/eod/reverse/pending-dividends',
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
     * Reverse all posted dividends for a fund
     * Reverse all posted dividends for a fund using the requested distribution date.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns ScheduledDividendDistributionResponse Indicates that the request was successful, and returns the total amount posted
     * @throws ApiError
     */
    public reverseScheduledDividendDistribution(
        xTenantId: string,
        requestBody: ScheduledDividendDistributionRequest,
    ): CancelablePromise<ScheduledDividendDistributionResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/eod/reverse/scheduled-dividend-distribution',
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

}
