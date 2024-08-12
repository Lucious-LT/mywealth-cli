/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Communication } from '../models/Communication';
import type { CommunicationRequest } from '../models/CommunicationRequest';
import type { EmailRequest } from '../models/EmailRequest';
import type { PageTemplateCommunication } from '../models/PageTemplateCommunication';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CommunicationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Send a new message
     * Creates a new record in the and sends the message. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Communication Success
     * @throws ApiError
     */
    public createCommunication(
        xTenantId: string,
        requestBody: CommunicationRequest,
    ): CancelablePromise<Communication> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/communications',
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
     * Send a new email message
     * Sends a workflow email message. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns BooleanResponse Request Accepted
     * @throws ApiError
     */
    public sendWorkflowEmail(
        xTenantId: string,
        requestBody: EmailRequest,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/communications/workflow/email',
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
     * Retrieve a communication record
     * Retrieve a communication record using the ID.
     * @param communicationId
     * @param xTenantId The tenant identifier
     * @returns Communication OK
     * @throws ApiError
     */
    public findCommunicationById(
        communicationId: string,
        xTenantId: string,
    ): CancelablePromise<Communication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/{communicationId}',
            path: {
                'communicationId': communicationId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a communication record
     * Delete a communication record using the ID
     * @param communicationId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse Success
     * @throws ApiError
     */
    public deleteCommunication(
        communicationId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/communications/{communicationId}',
            path: {
                'communicationId': communicationId,
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
     * Update a communication record
     * Update a communication record in the system
     * @param communicationId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Communication Success
     * @throws ApiError
     */
    public updateCommunication(
        communicationId: string,
        xTenantId: string,
        requestBody: CommunicationRequest,
    ): CancelablePromise<Communication> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/communications/{communicationId}',
            path: {
                'communicationId': communicationId,
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
     * Search for communication records
     * Search for communication records in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public searchCommunication(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/search',
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
     * Search for communication records by type
     * Search for communication records by type in the system using the supported query parameters.
     * @param type
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public searchCommunicationByType(
        type: 'EMAIL' | 'CALL' | 'SMS' | 'WHATSAPP',
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/search/type/{type}',
            path: {
                'type': type,
            },
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
     * List communication records
     * List communication records in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public listCommunication(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/list',
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
     * List communication records by type
     * List communication records by type in the system using the supported query parameters.
     * @param type
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public listCommunicationByType(
        type: 'EMAIL' | 'CALL' | 'SMS' | 'WHATSAPP',
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/list/type/{type}',
            path: {
                'type': type,
            },
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
     * List client communication records
     * List client communication records in the system using the supported query parameters.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public listCommunicationForClient(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/list/client/{clientId}',
            path: {
                'clientId': clientId,
            },
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
     * List client communication records by type
     * List client communication records by type in the system using the supported query parameters.
     * @param type
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommunication OK
     * @throws ApiError
     */
    public listCommunicationForClientByType(
        type: 'EMAIL' | 'CALL' | 'SMS' | 'WHATSAPP',
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'relatedToId' | 'relatedTo' | 'relatedToLabel' | 'subject' | 'to' | 'status' | 'type' = 'updatedAt',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommunication> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/communications/list/client/{clientId}/type/{type}',
            path: {
                'type': type,
                'clientId': clientId,
            },
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

}
