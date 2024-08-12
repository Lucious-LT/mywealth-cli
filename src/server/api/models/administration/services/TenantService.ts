/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { MarketDataApiKey } from '../models/MarketDataApiKey';
import type { PageTemplateTenant } from '../models/PageTemplateTenant';
import type { StatementConfig } from '../models/StatementConfig';
import type { Tenant } from '../models/Tenant';
import type { TenantConfigView } from '../models/TenantConfigView';
import type { TenantConfigViewTO } from '../models/TenantConfigViewTO';
import type { TenantRequest } from '../models/TenantRequest';
import type { TenantSort } from '../models/TenantSort';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TenantService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new tenant
     * Creates a new record in the system. See the schema of the object for more information.
     * @param requestBody
     * @returns Tenant Indicates that the request was successful.
     * @throws ApiError
     */
    public addTenant(
        requestBody: TenantRequest,
    ): CancelablePromise<Tenant> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/tenants',
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
     * Retrieve a tenant's config view
     * Retrieve a tenant's configuration using the tenant ID.
     * @param tenantId
     * @param xTenantId The tenant identifier
     * @returns TenantConfigView Indicates that the request was successful.
     * @throws ApiError
     */
    public findTenantConfigViewByTenantId(
        tenantId: string,
        xTenantId: string,
    ): CancelablePromise<TenantConfigView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/config/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Retrieve the bank institution ID for a given tenant ID
     * Retrieve the bank institution ID for a given tenant ID.
     * @param tenantId
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public getBankInstitutionId(
        tenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/institution/bank/id/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Retrieve the bank sort code for a given tenant ID
     * Retrieve the bank sort code for a given tenant ID.
     * @param id
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public getBankSortCode(
        id: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/institution/bank/sort-code/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Retrieve the card institution ID for a given tenant ID
     * Retrieve the card institution ID for a given tenant ID.
     * @param tenantId
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public getCardInstitutionId(
        tenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/institution/card/id/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * List tenants
     * List tenants in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param page
     * @param size
     * @returns PageTemplateTenant OK
     * @throws ApiError
     */
    public listTenant(
        order: Direction,
        sort: TenantSort,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTenant> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/list',
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
     * List tenant data for batch job
     * List tenants in the system for batch / scheduled jobs
     * @returns TenantConfigView OK
     * @throws ApiError
     */
    public listTenantForBatch(): CancelablePromise<Array<TenantConfigView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/list/batch',
        });
    }

    /**
     * List tenant data for batch job using a transfer object
     * List tenants in the system for batch / scheduled jobs using a transfer object
     * @returns TenantConfigViewTO OK
     * @throws ApiError
     */
    public listTenantForBatchWithTransferObject(): CancelablePromise<TenantConfigViewTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/list/summary',
        });
    }

    /**
     * Retrieve the logo for a given tenant ID
     * Retrieve the base 64 encoded logo for a given tenant ID.
     * @param tenantId
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public getEncodedTenantLogo(
        tenantId: string,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/logo/base64/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * Retrieve the logo for a given tenant ID
     * Retrieve the logo for a given tenant ID.
     * @param tenantId
     * @param xTenantId The tenant identifier
     * @returns string Indicates that the request was successful.
     * @throws ApiError
     */
    public getTenantLogo(
        tenantId: string,
        xTenantId: string,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/logo/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * Retrieve a market data api key
     * Retrieve a tenant's market data API key using the tenant ID.
     * @param tenantId
     * @param xTenantId The tenant identifier
     * @returns MarketDataApiKey Indicates that the request was successful.
     * @throws ApiError
     */
    public findTenantMarketDataApiKey(
        tenantId: string,
        xTenantId: string,
    ): CancelablePromise<MarketDataApiKey> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/market-data/api-key/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * Search for tenants
     * Search for tenants in the system using the supported query parameters. This API searches the tenantLabel field.
     * @param order
     * @param sort
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTenant OK
     * @throws ApiError
     */
    public searchTenant(
        order: Direction,
        sort: TenantSort,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTenant> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/search',
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
     * Retrieve a tenant's statement view
     * Retrieve a tenant's statement configuration using the tenant ID.
     * @param tenantId
     * @param xTenantId The tenant identifier
     * @returns StatementConfig Indicates that the request was successful.
     * @throws ApiError
     */
    public findTenantStatementConfig(
        tenantId: string,
        xTenantId: string,
    ): CancelablePromise<StatementConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/statement/{tenantId}',
            path: {
                'tenantId': tenantId,
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
     * Validate a tenant ID
     * Validate a tenant using the ID.
     * @param tenantId
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public validateTenantId(
        tenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/validate/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
            },
        });
    }

    /**
     * Retrieve a tenant
     * Retrieve a tenant using the ID.
     * @param id
     * @returns Tenant Indicates that the request was successful.
     * @throws ApiError
     */
    public findTenantById(
        id: string,
    ): CancelablePromise<Tenant> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/tenants/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Update a tenant record
     * Updates a tenant record in the system. See the schema of the object for more information.
     * @param id
     * @param requestBody
     * @returns Tenant Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTenant(
        id: string,
        requestBody: TenantRequest,
    ): CancelablePromise<Tenant> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/tenants/{id}',
            path: {
                'id': id,
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
     * Delete a tenant
     * Delete a tenant using the tenant ID.
     * @param id
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTenant(
        id: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/administration/api/v1/tenants/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
