/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppRecord } from '../models/AppRecord';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { KycTier } from '../models/KycTier';
import type { KycTierRequest } from '../models/KycTierRequest';
import type { PageTemplateKycTier } from '../models/PageTemplateKycTier';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class KycTierService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a tier
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns KycTier Success
     * @throws ApiError
     */
    public addKycTier(
        xTenantId: string,
        requestBody: KycTierRequest,
    ): CancelablePromise<KycTier> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/kyc_tiers',
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
     * Retrieve a tier
     * Retrieve a tier using the ID.
     * @param tierId
     * @param xTenantId The tenant identifier
     * @returns KycTier OK
     * @throws ApiError
     */
    public findByKycTierId(
        tierId: string,
        xTenantId: string,
    ): CancelablePromise<KycTier> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/{tierId}',
            path: {
                'tierId': tierId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a tier
     * Delete a tier in the system
     * @param tierId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteKycTier(
        tierId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/kyc_tiers/{tierId}',
            path: {
                'tierId': tierId,
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
     * Update a tier
     * Update a tier in the system.
     * @param tierId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns KycTier Success
     * @throws ApiError
     */
    public updateKycTier(
        tierId: string,
        xTenantId: string,
        requestBody: KycTierRequest,
    ): CancelablePromise<KycTier> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/kyc_tiers/{tierId}',
            path: {
                'tierId': tierId,
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
     * Search for tiers
     * Search for tiers in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateKycTier OK
     * @throws ApiError
     */
    public searchKycTier(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateKycTier> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/search',
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
     * List tiers with filters
     * Retrieve tiers in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateKycTier OK
     * @throws ApiError
     */
    public listKycTier(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateKycTier> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/list',
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
     * List active kyc tier options
     * Retrieve a summarized list of active kyc tiers
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listActiveKycTierOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/list/options/active',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a kyc tier code
     * Validate a kyc tier using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param tierId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isKycTierCodeAvailable(
        code: string,
        xTenantId: string,
        tierId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'tierId': tierId,
                'code': code,
            },
        });
    }

    /**
     * Retrieve a tier
     * Retrieve a tier using the code
     * @param code
     * @param xTenantId The tenant identifier
     * @returns KycTier OK
     * @throws ApiError
     */
    public findKycTierByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<KycTier> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_tiers/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
