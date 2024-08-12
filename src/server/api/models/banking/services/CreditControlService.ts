/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditControl } from '../models/CreditControl';
import type { CreditControlListSort } from '../models/CreditControlListSort';
import type { CreditControlRequest } from '../models/CreditControlRequest';
import type { CreditControlSearchSort } from '../models/CreditControlSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCreditControl } from '../models/PageTemplateCreditControl';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CreditControlService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new credit control record
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CreditControl Indicates that the request was successful.
     * @throws ApiError
     */
    public addCreditControl(
        xTenantId: string,
        requestBody: CreditControlRequest,
    ): CancelablePromise<CreditControl> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/credit_controls',
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
     * Retrieve a credit control record
     * Retrieve a credit control record using the credit control code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns CreditControl Indicates that the request was successful.
     * @throws ApiError
     */
    public findCreditControlByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<CreditControl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_controls/code/{code}',
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
     * List credit control records
     * Retrieve credit control records in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCreditControl OK
     * @throws ApiError
     */
    public listCreditControl(
        order: Direction,
        sort: CreditControlListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCreditControl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_controls/list',
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
     * Search for credit control records using a full text search engine
     * Search for credit control records in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCreditControl OK
     * @throws ApiError
     */
    public searchCreditControl(
        order: Direction,
        sort: CreditControlSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCreditControl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_controls/search',
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
     * Retrieve a credit control record
     * Retrieve a credit control record using the credit control ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CreditControl Indicates that the request was successful.
     * @throws ApiError
     */
    public findCreditControlById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CreditControl> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_controls/{id}',
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
     * Update a credit control record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CreditControl Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCreditControl(
        id: UUID,
        xTenantId: string,
        requestBody: CreditControlRequest,
    ): CancelablePromise<CreditControl> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/credit_controls/{id}',
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
     * Delete a credit control record
     * Delete a credit control record using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCreditControl(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/credit_controls/{id}',
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
