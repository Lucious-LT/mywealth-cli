/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Holiday } from '../models/Holiday';
import type { HolidayRequest } from '../models/HolidayRequest';
import type { PageTemplateHoliday } from '../models/PageTemplateHoliday';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class HolidayService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new holiday
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {holiday_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Holiday Success
     * @throws ApiError
     */
    public addHoliday(
        xTenantId: string,
        requestBody: HolidayRequest,
    ): CancelablePromise<Holiday> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/holidays',
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
     * Retrieve a holiday
     * Retrieve a holiday using the holiday ID. **Requires a valid token**. Roles Allowed: {holiday_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Holiday OK
     * @throws ApiError
     */
    public findHolidayById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Holiday> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/holidays/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a holiday
     * Delete a holiday using the holiday ID. **Requires a valid token**. Roles Allowed: {holiday_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteHoliday(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/holidays/{recordId}',
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
     * Update a holiday
     * Update a holiday in the system. **Requires a valid token**. Roles Allowed: {holiday_update, sysadmin}
     * @param xTenantId The tenant identifier
     * @param recordId
     * @param requestBody
     * @returns Holiday Success
     * @throws ApiError
     */
    public updateHoliday(
        xTenantId: string,
        recordId: string,
        requestBody: HolidayRequest,
    ): CancelablePromise<Holiday> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/holidays/{recordId}',
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
     * Validate a holiday ID
     * Validate that a holiday ID exists and is active. **Requires a valid token**. Roles Allowed: {holiday_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateHolidayId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/holidays/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for holidays
     * Search for holidays in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {holiday_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateHoliday OK
     * @throws ApiError
     */
    public searchHoliday(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateHoliday> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/holidays/search',
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
     * List holidays
     * List holidays in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {holiday_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateHoliday OK
     * @throws ApiError
     */
    public listHoliday(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'startDate' | 'endDate' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateHoliday> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/holidays/list',
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
     * Retrieve a holiday
     * Retrieve a holiday using the holiday code. **Requires a valid token**. Roles Allowed: {holiday_view, sysadmin}
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Holiday OK
     * @throws ApiError
     */
    public findHolidayByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Holiday> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/holidays/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
