/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { PageTemplateTemplate } from '../models/PageTemplateTemplate';
import type { Template } from '../models/Template';
import type { TemplateRequest } from '../models/TemplateRequest';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TemplateService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new template
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Template Success
     * @throws ApiError
     */
    public addTemplate(
        xTenantId: string,
        requestBody: TemplateRequest,
    ): CancelablePromise<Template> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/templates',
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
     * Retrieve a template
     * Retrieve a template using the template ID.
     * @param templateId
     * @param xTenantId The tenant identifier
     * @returns Template OK
     * @throws ApiError
     */
    public findTemplateById(
        templateId: string,
        xTenantId: string,
    ): CancelablePromise<Template> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/{templateId}',
            path: {
                'templateId': templateId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a template
     * Delete a template in the system.
     * @param templateId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteTemplate(
        templateId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/templates/{templateId}',
            path: {
                'templateId': templateId,
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
     * Update a template
     * Update a template in the system.
     * @param templateId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Template Success
     * @throws ApiError
     */
    public updateTemplate(
        templateId: string,
        xTenantId: string,
        requestBody: TemplateRequest,
    ): CancelablePromise<Template> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/templates/{templateId}',
            path: {
                'templateId': templateId,
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
     * Validate a template ID
     * Validate a template using the template ID.
     * @param templateId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidTemplateId(
        templateId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/validate/{templateId}',
            path: {
                'templateId': templateId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for templates
     * Search for templates in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateTemplate OK
     * @throws ApiError
     */
    public searchTemplate(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code' | 'subject' | 'type' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateTemplate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/search',
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
     * List templates
     * Retrieve templates in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateTemplate OK
     * @throws ApiError
     */
    public listTemplate(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'subject' | 'type' = 'code',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateTemplate> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/list',
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
     * Validate a template code
     * Validate a template using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param templateId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isTemplateCodeAvailable(
        code: string,
        xTenantId: string,
        templateId?: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'templateId': templateId,
                'code': code,
            },
        });
    }

    /**
     * Retrieve a template
     * Retrieve a template using the template code.
     * @param templateCode
     * @param xTenantId The tenant identifier
     * @returns Template OK
     * @throws ApiError
     */
    public findByTemplateCode(
        templateCode: string,
        xTenantId: string,
    ): CancelablePromise<Template> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/templates/code/{templateCode}',
            path: {
                'templateCode': templateCode,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
