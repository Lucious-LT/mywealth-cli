/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditLine } from '../models/CreditLine';
import type { CreditLineListSort } from '../models/CreditLineListSort';
import type { CreditLineRequest } from '../models/CreditLineRequest';
import type { CreditLineSearchSort } from '../models/CreditLineSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCreditLine } from '../models/PageTemplateCreditLine';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CreditLineService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new credit line
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public addCreditLine(
        xTenantId: string,
        requestBody: CreditLineRequest,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/credit_lines',
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
     * Approve a credit line request
     * Approve a credit line request using the  ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public approveCreditLineById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/credit_lines/approve/{id}',
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
     * Reject a credit line request
     * Reject a credit line request using the credit line ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public rejectCreditLineById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/credit_lines/block/{id}',
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
     * Close a credit line
     * Close a credit line using the credit line ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public closeCreditLineById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/credit_lines/close/{id}',
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
     * Retrieve a credit line
     * Retrieve a credit line using the credit line code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public findCreditLineByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_lines/code/{code}',
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
     * List credit lines
     * Retrieve credit lines in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCreditLine OK
     * @throws ApiError
     */
    public listCreditLine(
        order: Direction,
        sort: CreditLineListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCreditLine> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_lines/list',
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
     * List credit lines for a client
     * Retrieve credit lines for a client.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns CreditLine OK
     * @throws ApiError
     */
    public listClientCreditLines(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<CreditLine>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_lines/list/client/{clientId}',
            path: {
                'clientId': clientId,
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
     * Search for credit lines using a full text search engine
     * Search for credit lines in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCreditLine OK
     * @throws ApiError
     */
    public searchCreditLine(
        order: Direction,
        sort: CreditLineSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCreditLine> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_lines/search',
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
     * Retrieve a credit line
     * Retrieve a credit line using the credit line ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public findCreditLineById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/credit_lines/{id}',
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
     * Update a credit line record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CreditLine Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCreditLine(
        id: UUID,
        xTenantId: string,
        requestBody: CreditLineRequest,
    ): CancelablePromise<CreditLine> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/credit_lines/{id}',
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
     * Delete a credit line
     * Delete a credit line using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCreditLine(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/credit_lines/{id}',
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
