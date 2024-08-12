/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdvisorGroup } from '../models/AdvisorGroup';
import type { AdvisorGroupRequest } from '../models/AdvisorGroupRequest';
import type { AppRecord } from '../models/AppRecord';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { PageTemplateAdvisorGroup } from '../models/PageTemplateAdvisorGroup';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdvisorGroupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create an advisor group
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AdvisorGroup Success
     * @throws ApiError
     */
    public addAdvisorGroup(
        xTenantId: string,
        requestBody: AdvisorGroupRequest,
    ): CancelablePromise<AdvisorGroup> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/advisor_groups',
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
     * Retrieve an advisor group
     * Retrieve an advisor group using the group ID.
     * @param advisorGroupId
     * @param xTenantId The tenant identifier
     * @returns AdvisorGroup OK
     * @throws ApiError
     */
    public findByAdvisorGroupId(
        advisorGroupId: string,
        xTenantId: string,
    ): CancelablePromise<AdvisorGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/{advisorGroupId}',
            path: {
                'advisorGroupId': advisorGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete an advisor group
     * Delete an advisor group in the system
     * @param advisorGroupId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteAdvisorGroup(
        advisorGroupId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/advisor_groups/{advisorGroupId}',
            path: {
                'advisorGroupId': advisorGroupId,
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
     * Update an advisor group
     * Update an advisor group in the system.
     * @param advisorGroupId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns AdvisorGroup Success
     * @throws ApiError
     */
    public updateAdvisorGroup(
        advisorGroupId: string,
        xTenantId: string,
        requestBody: AdvisorGroupRequest,
    ): CancelablePromise<AdvisorGroup> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/advisor_groups/{advisorGroupId}',
            path: {
                'advisorGroupId': advisorGroupId,
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
     * Validate an advisor group ID
     * Validate an advisor group using the group ID.
     * @param advisorGroupId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidAdvisorGroupId(
        advisorGroupId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/validate/{advisorGroupId}',
            path: {
                'advisorGroupId': advisorGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for advisor groups
     * Search for advisor groups in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateAdvisorGroup OK
     * @throws ApiError
     */
    public searchAdvisorGroup(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateAdvisorGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/search',
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
     * List advisor groups
     * Retrieve advisor groups in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateAdvisorGroup OK
     * @throws ApiError
     */
    public listAdvisorGroup(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'type' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateAdvisorGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/list',
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
     * List all advisor groups
     * Retrieve a summarized list of all advisor groups
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listAllAdvisorGroupOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/list/options/all',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List active advisor groups
     * Retrieve a summarized list of active advisor groups
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listActiveAdvisorGroupOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/list/options/active',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate an advisor group code
     * Validate an advisor group using the group code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param advisorGroupId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isAdvisorGroupCodeAvailable(
        code: string,
        xTenantId: string,
        advisorGroupId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'advisorGroupId': advisorGroupId,
                'code': code,
            },
        });
    }

    /**
     * Retrieve an advisor group
     * Retrieve an advisor group using the group code
     * @param code
     * @param xTenantId The tenant identifier
     * @returns AdvisorGroup OK
     * @throws ApiError
     */
    public findAdvisorGroupByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<AdvisorGroup> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisor_groups/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
