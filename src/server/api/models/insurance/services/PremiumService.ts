/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { PageTemplatePremiumConfig } from '../models/PageTemplatePremiumConfig';
import type { PremiumConfig } from '../models/PremiumConfig';
import type { PremiumConfigListSort } from '../models/PremiumConfigListSort';
import type { PremiumConfigRequest } from '../models/PremiumConfigRequest';
import type { PremiumConfigSearchSort } from '../models/PremiumConfigSearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PremiumService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new premium configuration
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PremiumConfig Indicates that the request was successful.
     * @throws ApiError
     */
    public addPremiumConfig(
        xTenantId: string,
        requestBody: PremiumConfigRequest,
    ): CancelablePromise<PremiumConfig> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/premium_configurations',
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
     * Retrieve a premium configuration
     * Retrieve a configuration using the configuration code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns PremiumConfig Indicates that the request was successful.
     * @throws ApiError
     */
    public findPremiumConfigByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<PremiumConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/premium_configurations/code/{code}',
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
     * List premium configurations
     * Retrieve configurations in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePremiumConfig OK
     * @throws ApiError
     */
    public listPremiumConfig(
        order: Direction,
        sort: PremiumConfigListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePremiumConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/premium_configurations/list',
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
     * Search for premium configurations using a full text search engine
     * Search for configurations in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePremiumConfig OK
     * @throws ApiError
     */
    public searchPremiumConfig(
        order: Direction,
        sort: PremiumConfigSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePremiumConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/premium_configurations/search',
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
     * Retrieve a premium configuration
     * Retrieve an configuration using the configuration ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns PremiumConfig Indicates that the request was successful.
     * @throws ApiError
     */
    public findPremiumConfigById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<PremiumConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/premium_configurations/{id}',
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
     * Update a premium configuration record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PremiumConfig Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePremiumConfig(
        id: UUID,
        xTenantId: string,
        requestBody: PremiumConfigRequest,
    ): CancelablePromise<PremiumConfig> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/premium_configurations/{id}',
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
     * Delete a premium configuration
     * Delete an configuration using the configuration ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePremiumConfig(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/premium_configurations/{id}',
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
