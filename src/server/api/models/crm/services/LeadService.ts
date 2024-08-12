/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppRecord } from '../models/AppRecord';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Lead } from '../models/Lead';
import type { LeadRequest } from '../models/LeadRequest';
import type { PageTemplateLead } from '../models/PageTemplateLead';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LeadService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a lead
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Lead Success
     * @throws ApiError
     */
    public addLead(
        xTenantId: string,
        requestBody: LeadRequest,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/leads',
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
     * Retrieve a lead
     * Retrieve a lead using the ID.
     * @param leadId
     * @param xTenantId The tenant identifier
     * @returns Lead OK
     * @throws ApiError
     */
    public findByLeadId(
        leadId: string,
        xTenantId: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a lead
     * Delete a lead in the system
     * @param leadId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteLead(
        leadId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/leads/{leadId}',
            path: {
                'leadId': leadId,
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
     * Update a lead
     * Update a lead in the system.
     * @param leadId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Lead Success
     * @throws ApiError
     */
    public updateLead(
        leadId: string,
        xTenantId: string,
        requestBody: LeadRequest,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/{leadId}',
            path: {
                'leadId': leadId,
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
     * Unassign a lead
     * Unassign a lead in the system.
     * @param leadId
     * @param xTenantId The tenant identifier
     * @returns Lead OK
     * @throws ApiError
     */
    public unassignLead(
        leadId: string,
        xTenantId: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/unassign/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Convert a lead to a client
     * Use the lead ID and client group ID to convert it to a client
     * @param leadId
     * @param xTenantId The tenant identifier
     * @param clientGroupId
     * @returns Lead OK
     * @throws ApiError
     */
    public convertLead(
        leadId: string,
        xTenantId: string,
        clientGroupId?: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/convert/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'clientGroupId': clientGroupId,
            },
        });
    }

    /**
     * Close a lead
     * Close a new or assigned lead in the system. This will change the status to DEAD
     * @param leadId
     * @param xTenantId The tenant identifier
     * @returns Lead OK
     * @throws ApiError
     */
    public closeLead(
        leadId: string,
        xTenantId: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/close/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Assign a lead
     * Assign a new lead in the system. If the advisor ID is not provided the advisor that is attached to the client is used or an error is returned
     * @param leadId
     * @param xTenantId The tenant identifier
     * @param advisorGroupId
     * @returns Lead OK
     * @throws ApiError
     */
    public assignLead(
        leadId: string,
        xTenantId: string,
        advisorGroupId?: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/assign/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'advisorGroupId': advisorGroupId,
            },
        });
    }

    /**
     * Assign a lead
     * Assign a new lead in the system. If the advisor code is not provided the advisor that is attached to the client is used or an error is returned
     * @param leadId
     * @param xTenantId The tenant identifier
     * @param code
     * @returns Lead OK
     * @throws ApiError
     */
    public assignLeadWithAdvisorCode(
        leadId: string,
        xTenantId: string,
        code?: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/leads/assign/{leadId}/advisor_code',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
            },
        });
    }

    /**
     * Validate a lead ID
     * Validate a lead using the ID.
     * @param leadId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidLeadId(
        leadId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/validate/{leadId}',
            path: {
                'leadId': leadId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for leads
     * Search for leads in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateLead OK
     * @throws ApiError
     */
    public searchLead(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' | 'email_sort' | 'firstName_sort' | 'lastName_sort' | 'mobileNo_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateLead> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/search',
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
     * List leads with filters
     * Retrieve leads in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateLead OK
     * @throws ApiError
     */
    public listLead(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'email' | 'mobileNo' | 'firstName' | 'lastName' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateLead> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/list',
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
     * List all leads
     * Retrieve a summarized list of all leads
     * @param xTenantId The tenant identifier
     * @returns AppRecord OK
     * @throws ApiError
     */
    public listLeadOptions(
        xTenantId: string,
    ): CancelablePromise<Array<AppRecord>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/list/options',
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Retrieve a lead
     * Retrieve a lead using the code
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Lead OK
     * @throws ApiError
     */
    public findLeadByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Lead> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/leads/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
