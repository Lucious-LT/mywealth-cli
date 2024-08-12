/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndOfDayReport } from '../models/EndOfDayReport';
import type { EndOfDayReportResponse } from '../models/EndOfDayReportResponse';
import type { EndOfDayRequest } from '../models/EndOfDayRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EndOfDayService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Start end of day
     * Sends a message to the eod service to start the eod process. This process will send an email when it completes. **Requires a valid token**. Roles Allowed: {eod_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns EndOfDayReportResponse Success
     * @throws ApiError
     */
    public startEndOfDay(
        xTenantId: string,
        requestBody: EndOfDayRequest,
    ): CancelablePromise<EndOfDayReportResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/eod',
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
     * Retrieve an end of day report
     * Retrieve an end of day report by ID. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns EndOfDayReport OK
     * @throws ApiError
     */
    public findEndOfDayById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/eod/id/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Retrieve an end of day report
     * Retrieve an end of day report by ID. **Requires a valid token**. Roles Allowed: {branch_view, sysadmin}
     * @param date
     * @param xTenantId The tenant identifier
     * @returns EndOfDayReport OK
     * @throws ApiError
     */
    public findEndOfDayReportByDate(
        date: string,
        xTenantId: string,
    ): CancelablePromise<EndOfDayReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/eod/date/{date}',
            path: {
                'date': date,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
