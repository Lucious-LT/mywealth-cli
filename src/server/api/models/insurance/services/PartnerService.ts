/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { PageTemplatePartner } from '../models/PageTemplatePartner';
import type { Partner } from '../models/Partner';
import type { PartnerListSort } from '../models/PartnerListSort';
import type { PartnerRequest } from '../models/PartnerRequest';
import type { PartnerSearchSort } from '../models/PartnerSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PartnerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new partner
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Partner Indicates that the request was successful.
     * @throws ApiError
     */
    public addPartner(
        xTenantId: string,
        requestBody: PartnerRequest,
    ): CancelablePromise<Partner> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/partners',
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
     * Retrieve a partner
     * Retrieve a partner using the partner code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Partner Indicates that the request was successful.
     * @throws ApiError
     */
    public findPartnerByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Partner> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/partners/code/{code}',
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
     * Validate a partner code
     * Validate a partner using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param partnerId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isPartnerCodeAvailable(
        code: string,
        xTenantId: string,
        partnerId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/partners/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'partnerId': partnerId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List partners
     * Retrieve partners in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePartner OK
     * @throws ApiError
     */
    public listPartner(
        order: Direction,
        sort: PartnerListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePartner> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/partners/list',
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
     * Search for partners using a full text search engine
     * Search for partners in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePartner OK
     * @throws ApiError
     */
    public searchPartner(
        order: Direction,
        sort: PartnerSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePartner> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/partners/search',
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
     * Retrieve a partner
     * Retrieve a partner using the partner ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Partner Indicates that the request was successful.
     * @throws ApiError
     */
    public findPartnerById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Partner> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/partners/{id}',
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
     * Update a partner record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Partner Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePartner(
        id: UUID,
        xTenantId: string,
        requestBody: PartnerRequest,
    ): CancelablePromise<Partner> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/partners/{id}',
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
     * Delete a partner
     * Delete a partner using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePartner(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/partners/{id}',
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
