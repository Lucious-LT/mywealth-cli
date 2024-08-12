/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditEvent } from '../models/AuditEvent';
import type { AuditEventSort } from '../models/AuditEventSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateAuditEvent } from '../models/PageTemplateAuditEvent';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuditEventService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param xTenantId The tenant identifier
     * @returns string OK
     * @throws ApiError
     */
    public stream(
        xTenantId: string,
    ): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/audit/events',
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List audit events
     * List audit events in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAuditEvent OK
     * @throws ApiError
     */
    public listAuditEvent(
        order: Direction,
        sort: AuditEventSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAuditEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/audit/list',
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
     * List audit events for a specific record
     * List audit events in the system for a specific record using the supported query parameters.
     * @param recordId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateAuditEvent OK
     * @throws ApiError
     */
    public listAuditEventByRecordId(
        recordId: UUID,
        order: Direction,
        sort: AuditEventSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateAuditEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/audit/list/{recordId}',
            path: {
                'recordId': recordId,
            },
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
     * Search audit events
     * Search for audit events in the system using the supported query parameters. This API searches the recordLabel field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateAuditEvent OK
     * @throws ApiError
     */
    public searchAuditEvent(
        order: Direction,
        sort: AuditEventSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateAuditEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/audit/search',
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
     * Retrieve an audit event
     * Retrieve an audit event using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns AuditEvent Indicates that the request was successful.
     * @throws ApiError
     */
    public findAuditEventById(
        id: string,
        xTenantId: string,
    ): CancelablePromise<AuditEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/audit/{id}',
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
