/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { LocalDateTime } from '../models/LocalDateTime';
import type { PageTemplateWebhook } from '../models/PageTemplateWebhook';
import type { PageTemplateWebhookEvent } from '../models/PageTemplateWebhookEvent';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { Webhook } from '../models/Webhook';
import type { WebhookEventDeliveryStatus } from '../models/WebhookEventDeliveryStatus';
import type { WebhookRequest } from '../models/WebhookRequest';
import type { WebhookSort } from '../models/WebhookSort';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WebhookService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new webhook
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Webhook Indicates that the request was successful.
     * @throws ApiError
     */
    public addWebhook(
        xTenantId: string,
        requestBody: WebhookRequest,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/administration/api/v1/webhooks',
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
     * List webhooks events
     * List events in the system for a configured hook using the supported query parameters.
     * @param offsetTime
     * @param webhookId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param status
     * @returns PageTemplateWebhookEvent OK
     * @throws ApiError
     */
    public listEvents(
        offsetTime: LocalDateTime,
        webhookId: string,
        xTenantId: string,
        page?: number,
        size: number = 20,
        status?: WebhookEventDeliveryStatus,
    ): CancelablePromise<PageTemplateWebhookEvent> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/webhooks/events',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'offsetTime': offsetTime,
                'page': page,
                'size': size,
                'status': status,
                'webhookId': webhookId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List webhooks
     * List webhooks in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateWebhook OK
     * @throws ApiError
     */
    public listWebhook(
        order: Direction,
        sort: WebhookSort,
        xTenantId: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateWebhook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/webhooks/list',
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
     * Search for webhooks
     * Search for webhooks in the system using the supported query parameters. This API searches the recordLabel field.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateWebhook OK
     * @throws ApiError
     */
    public searchWebhook(
        order: Direction,
        sort: WebhookSort,
        xTenantId: string,
        page?: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateWebhook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/webhooks/search',
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
     * Retrieve a webhook
     * Retrieve an webhook using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Webhook Indicates that the request was successful.
     * @throws ApiError
     */
    public findWebhookById(
        id: string,
        xTenantId: string,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/administration/api/v1/webhooks/{id}',
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
     * Update a webhook record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Webhook Indicates that the request was successful.
     * @throws ApiError
     */
    public updateWebhook(
        id: string,
        xTenantId: string,
        requestBody: WebhookRequest,
    ): CancelablePromise<Webhook> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/administration/api/v1/webhooks/{id}',
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
     * Delete a webhook
     * Delete a webhook using the webhook ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteWebhook(
        id: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/administration/api/v1/webhooks/{id}',
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
