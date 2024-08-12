/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndOfDayReport } from '../models/EndOfDayReport';
import type { EndOfDayReportResponse } from '../models/EndOfDayReportResponse';
import type { EndOfDayRequest } from '../models/EndOfDayRequest';
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
        requestBody: EndOfDayRequest,
    ): CancelablePromise<EndOfDayReportResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/eod',
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
            url: '/treasury/api/v1/eod/report/date/{date}',
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
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/eod/report/id/{id}',
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
