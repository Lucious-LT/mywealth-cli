/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInterestAccrual } from '../models/AccountInterestAccrual';
import type { EndOfDayInboundRequest } from '../models/EndOfDayInboundRequest';
import type { EndOfDayReport } from '../models/EndOfDayReport';
import type { EndOfDayReportResponse } from '../models/EndOfDayReportResponse';
import type { LocalDate } from '../models/LocalDate';
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
        requestBody: EndOfDayInboundRequest,
    ): CancelablePromise<EndOfDayReportResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/eod',
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
     * Retrieve end of day balances by date
     * Retrieve end of day balances using the eod date.
     * @param accountId
     * @param date
     * @param xTenantId The tenant identifier
     * @returns AccountInterestAccrual Indicates that the request was successful.
     * @throws ApiError
     */
    public findAccountAccruedInterestByDate(
        accountId: UUID,
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<AccountInterestAccrual> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/account/accrued-interest/{accountId}/{date}',
            path: {
                'accountId': accountId,
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
     * Retrieve end of day balances in csv format
     * Retrieve end of day balances using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayAccountBalanceByDateCsv(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/csv/account-balance/date/{date}',
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
     * Retrieve end of day interest report
     * Retrieve end of day interest schedule using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayAccountInterestByDateCsv(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/csv/account-interest/date/{date}',
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
     * Retrieve end of day loan performance report in csv format
     * Retrieve end of day loan performance schedule using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayLoanBalanceByDateCsv(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/csv/loan-balance/date/{date}',
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
     * Retrieve an end of day report
     * Retrieve an end of day report using the eod date.
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
            url: '/banking/api/v1/eod/report/date/{date}',
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
     * Retrieve an end of day report
     * Retrieve an end of day report by ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns EndOfDayReport Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayReportById(
        id: number,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/report/id/{id}',
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
     * Retrieve end of day balances in zip format
     * Retrieve end of day balances using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayAccountBalanceByDateZip(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/zip/account-balance/date/{date}',
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
     * Retrieve end of day interest report in zip format
     * Retrieve end of day interest schedule using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayAccountInterestByDateZip(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/zip/account-interest/date/{date}',
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
     * Retrieve end of day loan balance report in zip format
     * Retrieve end of day loan balance schedule using the eod date.
     * @param date
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public findEndOfDayLoanBalanceByDateZip(
        date: LocalDate,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/eod/zip/loan-balance/date/{date}',
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

}
