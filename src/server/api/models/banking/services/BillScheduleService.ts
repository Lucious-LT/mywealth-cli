/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BillerAccountLookupRequest } from '../models/BillerAccountLookupRequest';
import type { BillerAccountLookupResponse } from '../models/BillerAccountLookupResponse';
import type { BillSchedule } from '../models/BillSchedule';
import type { BillScheduleListSort } from '../models/BillScheduleListSort';
import type { BillScheduleRequest } from '../models/BillScheduleRequest';
import type { BillScheduleSearchSort } from '../models/BillScheduleSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateBillSchedule } from '../models/PageTemplateBillSchedule';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BillScheduleService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new bill schedule
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public addBillSchedule(
        xTenantId: string,
        requestBody: BillScheduleRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/bill_schedules',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * Approve a schedule
     * Approve a schedule using the schedule ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public approveScheduleById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/bill_schedules/approve/{id}',
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
     * Cancel a schedule
     * Cancel a schedule using the schedule ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelScheduleById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/bill_schedules/cancel/{id}',
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
     * Retrieve a bill schedule
     * Retrieve a bill schedule using the bill schedule code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public findBillScheduleByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/bill_schedules/code/{code}',
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
     * List bill schedules
     * Retrieve bill schedules in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBillSchedule OK
     * @throws ApiError
     */
    public listBillSchedule(
        order: Direction,
        sort: BillScheduleListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBillSchedule> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/bill_schedules/list',
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
     * List bill schedules for an account
     * Retrieve bill schedules for an account in the system using the supported query parameters.
     * @param accountId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBillSchedule OK
     * @throws ApiError
     */
    public listBillScheduleForAccount(
        accountId: UUID,
        order: Direction,
        sort: BillScheduleListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBillSchedule> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/bill_schedules/list/account/{accountId}',
            path: {
                'accountId': accountId,
            },
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
     * Lookup a biller account # and return the account details
     * Lookup a biller account # and return the account details. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns BillerAccountLookupResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public lookupBillerAccount(
        xTenantId: string,
        requestBody: BillerAccountLookupRequest,
    ): CancelablePromise<BillerAccountLookupResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/bill_schedules/lookup-account',
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
     * Search for bill schedules using a full text search engine
     * Search for bill schedules in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateBillSchedule OK
     * @throws ApiError
     */
    public searchBillSchedule(
        order: Direction,
        sort: BillScheduleSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateBillSchedule> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/bill_schedules/search',
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
     * Retrieve a bill schedule
     * Retrieve a bill schedule using the bill schedule ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public findBillScheduleById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/bill_schedules/{id}',
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
     * Update a bill schedule record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns BillSchedule Indicates that the request was successful.
     * @throws ApiError
     */
    public updateBillSchedule(
        id: UUID,
        xTenantId: string,
        requestBody: BillScheduleRequest,
    ): CancelablePromise<BillSchedule> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/bill_schedules/{id}',
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
     * Delete a bill schedule
     * Delete a bill schedule using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteBillSchedule(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/bill_schedules/{id}',
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
