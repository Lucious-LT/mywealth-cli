/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplatePeriod } from '../models/PageTemplatePeriod';
import type { Period } from '../models/Period';
import type { PeriodListSort } from '../models/PeriodListSort';
import type { PeriodRequest } from '../models/PeriodRequest';
import type { PeriodSearchSort } from '../models/PeriodSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PeriodService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new period
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Period Indicates that the request was successful.
     * @throws ApiError
     */
    public addPeriod(
        xTenantId: string,
        requestBody: PeriodRequest,
    ): CancelablePromise<Period> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/periods',
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
     * List periods
     * Retrieve periods in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePeriod OK
     * @throws ApiError
     */
    public listPeriod(
        order: Direction,
        sort: PeriodListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePeriod> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/periods/list',
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
     * Search for periods using a full text search engine
     * Search for periods in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePeriod OK
     * @throws ApiError
     */
    public searchPeriod(
        order: Direction,
        sort: PeriodSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePeriod> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/periods/search',
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
     * Retrieve a period
     * Retrieve a period using the period ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Period Indicates that the request was successful.
     * @throws ApiError
     */
    public findPeriodById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Period> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/periods/{id}',
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
     * Update a period record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Period Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePeriod(
        id: UUID,
        xTenantId: string,
        requestBody: PeriodRequest,
    ): CancelablePromise<Period> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/periods/{id}',
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
     * Delete a period
     * Delete a period using the period ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePeriod(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/periods/{id}',
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
