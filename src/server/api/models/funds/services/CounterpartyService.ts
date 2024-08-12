/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Counterparty } from '../models/Counterparty';
import type { CounterpartyListSort } from '../models/CounterpartyListSort';
import type { CounterpartyRequest } from '../models/CounterpartyRequest';
import type { CounterpartySearchSort } from '../models/CounterpartySearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCounterparty } from '../models/PageTemplateCounterparty';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CounterpartyService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new counterparty
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Counterparty Indicates that the request was successful.
     * @throws ApiError
     */
    public addCounterparty(
        xTenantId: string,
        requestBody: CounterpartyRequest,
    ): CancelablePromise<Counterparty> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/funds/api/v1/counterparties',
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
     * Retrieve a counterparty
     * Retrieve an counterparty using the counterparty code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Counterparty Indicates that the request was successful.
     * @throws ApiError
     */
    public findCounterpartyByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Counterparty> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/counterparties/code/{code}',
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
     * Validate a counterparty code
     * Validate a counterparty using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param counterpartyId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isCounterpartyCodeAvailable(
        code: string,
        xTenantId: string,
        counterpartyId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/counterparties/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'counterpartyId': counterpartyId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List counterparties
     * Retrieve counterparties in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCounterparty OK
     * @throws ApiError
     */
    public listCounterparty(
        order: Direction,
        sort: CounterpartyListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCounterparty> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/counterparties/list',
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
     * Search for counterparties using a full text search engine
     * Search for counterparties in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCounterparty OK
     * @throws ApiError
     */
    public searchCounterparty(
        order: Direction,
        sort: CounterpartySearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCounterparty> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/counterparties/search',
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
     * Retrieve an counterparty
     * Retrieve an counterparty using the counterparty ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Counterparty Indicates that the request was successful.
     * @throws ApiError
     */
    public findCounterpartyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Counterparty> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/funds/api/v1/counterparties/{id}',
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
     * Update an counterparty record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Counterparty Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCounterparty(
        id: UUID,
        xTenantId: string,
        requestBody: CounterpartyRequest,
    ): CancelablePromise<Counterparty> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/funds/api/v1/counterparties/{id}',
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
     * Delete a counterparty
     * Delete a counterparty using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCounterparty(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/funds/api/v1/counterparties/{id}',
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
