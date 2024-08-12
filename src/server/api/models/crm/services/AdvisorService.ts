/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Advisor } from '../models/Advisor';
import type { AdvisorRequest } from '../models/AdvisorRequest';
import type { AppRecord } from '../models/AppRecord';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { PageTemplateAdvisor } from '../models/PageTemplateAdvisor';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdvisorService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create an advisor
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Advisor Success
     * @throws ApiError
     */
    public addAdvisor(
        xTenantId: string,
        requestBody: AdvisorRequest,
    ): CancelablePromise<Advisor> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/advisors',
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
     * Retrieve an advisor
     * Retrieve an advisor using the ID.
     * @param advisorId
     * @param xTenantId The tenant identifier
     * @returns Advisor OK
     * @throws ApiError
     */
    public findByAdvisorId(
        advisorId: string,
        xTenantId: string,
    ): CancelablePromise<Advisor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/{advisorId}',
            path: {
                'advisorId': advisorId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete an advisor
     * Delete an advisor in the system
     * @param advisorId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteAdvisor(
        advisorId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/advisors/{advisorId}',
            path: {
                'advisorId': advisorId,
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
     * Update an advisor
     * Update an advisor in the system.
     * @param advisorId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Advisor Success
     * @throws ApiError
     */
    public updateAdvisor(
        advisorId: string,
        xTenantId: string,
        requestBody: AdvisorRequest,
    ): CancelablePromise<Advisor> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/advisors/{advisorId}',
            path: {
                'advisorId': advisorId,
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
     * Validate an advisor ID
     * Validate an advisor using the ID.
     * @param advisorId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidAdvisorId(
        advisorId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/validate/{advisorId}',
            path: {
                'advisorId': advisorId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for advisors
     * Search for advisors in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateAdvisor OK
     * @throws ApiError
     */
    public searchAdvisor(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' | 'email_sort' | 'firstName_sort' | 'lastName_sort' | 'mobileNo_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateAdvisor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/search',
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
     * List advisors with filters
     * Retrieve advisors in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateAdvisor OK
     * @throws ApiError
     */
    public listAdvisor(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'email' | 'mobileNo' | 'firstName' | 'lastName' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateAdvisor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/list',
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
     * List all advisors
     * Retrieve a summarized list of all advisors
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listAdvisorOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/list/options',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List advisors using their group ID
     * Retrieve a list of advisors in the system using their group ID.
     * @param advisorGroupId
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listAdvisorsByGroupId(
        advisorGroupId: string,
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/list/group/{advisorGroupId}',
            path: {
                'advisorGroupId': advisorGroupId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Retrieve an advisor
     * Retrieve an advisor using the code
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Advisor OK
     * @throws ApiError
     */
    public findAdvisorByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Advisor> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/advisors/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
