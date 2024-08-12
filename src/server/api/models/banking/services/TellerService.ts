/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { PageTemplateTeller } from '../models/PageTemplateTeller';
import type { Teller } from '../models/Teller';
import type { TellerListSort } from '../models/TellerListSort';
import type { TellerRequest } from '../models/TellerRequest';
import type { TellerSearchSort } from '../models/TellerSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TellerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new teller
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Teller Indicates that the request was successful.
     * @throws ApiError
     */
    public addTeller(
        xTenantId: string,
        requestBody: TellerRequest,
    ): CancelablePromise<Teller> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/tellers',
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
     * Retrieve a teller
     * Retrieve a teller using the teller code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Teller Indicates that the request was successful.
     * @throws ApiError
     */
    public findTellerByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Teller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/tellers/code/{code}',
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
     * Validate a teller code
     * Validate a teller using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param tellerId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isTellerCodeAvailable(
        code: string,
        xTenantId: string,
        tellerId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/tellers/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'tellerId': tellerId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List tellers
     * Retrieve tellers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTeller OK
     * @throws ApiError
     */
    public listTeller(
        order: Direction,
        sort: TellerListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTeller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/tellers/list',
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
     * Search for tellers using a full text search engine
     * Search for tellers in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTeller OK
     * @throws ApiError
     */
    public searchTeller(
        order: Direction,
        sort: TellerSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTeller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/tellers/search',
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
     * Retrieve a teller
     * Retrieve a teller using the teller ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Teller Indicates that the request was successful.
     * @throws ApiError
     */
    public findTellerById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Teller> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/tellers/{id}',
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
     * Update a teller record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Teller Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTeller(
        id: UUID,
        xTenantId: string,
        requestBody: TellerRequest,
    ): CancelablePromise<Teller> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/tellers/{id}',
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
     * Delete a teller
     * Delete a teller using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTeller(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/tellers/{id}',
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
