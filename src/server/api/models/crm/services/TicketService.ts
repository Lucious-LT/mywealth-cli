/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { PageTemplateTicket } from '../models/PageTemplateTicket';
import type { Ticket } from '../models/Ticket';
import type { TicketRequest } from '../models/TicketRequest';
import type { TicketResolution } from '../models/TicketResolution';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TicketService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new ticket
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Ticket OK
     * @throws ApiError
     */
    public createTicket(
        xTenantId: string,
        requestBody: TicketRequest,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/tickets',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve a ticket
     * Retrieve a ticket using the ticket ID.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public findTicketById(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/tickets/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a ticket
     * Delete a ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteTicket(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/tickets/{ticketId}',
            path: {
                'ticketId': ticketId,
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
     * Update a ticket
     * Update a ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Ticket OK
     * @throws ApiError
     */
    public updateTicket(
        ticketId: string,
        xTenantId: string,
        requestBody: TicketRequest,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Unassign a ticket
     * Unassign a ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public unassignTicket(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/unassign/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Suspend a ticket
     * Suspend a new or assigned ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public suspendTicket(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/suspend/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Resolve a ticket
     * Resolve an assigned ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Ticket OK
     * @throws ApiError
     */
    public resolveTicket(
        ticketId: string,
        xTenantId: string,
        requestBody: TicketResolution,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/resolve/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reject a ticket
     * Reject a new or assigned ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public rejectTicket(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/reject/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Close a ticket
     * Close a resolved ticket in the system.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public closeTicket(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/close/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Assign a ticket
     * Assign a new ticket in the system. If the advisor team or individual ID is not provided, it will use the values already attached to the record.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @param advisorGroupId
     * @param advisorId
     * @returns Ticket OK
     * @throws ApiError
     */
    public assignTicket(
        ticketId: string,
        xTenantId: string,
        advisorGroupId?: string,
        advisorId?: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/assign/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'advisorGroupId': advisorGroupId,
                'advisorId': advisorId,
            },
        });
    }

    /**
     * Assign a ticket
     * Assign a new ticket in the system. If the advisor code is not provided the advisor that is attached to the client is used or an error is returned.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @param code
     * @returns Ticket OK
     * @throws ApiError
     */
    public assignTicketWithAdvisorGroupCode(
        ticketId: string,
        xTenantId: string,
        code?: string,
    ): CancelablePromise<Ticket> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/tickets/assign/{ticketId}/advisor_code',
            path: {
                'ticketId': ticketId,
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
     * Validate a ticket ID
     * Validate a ticket using the ticket ID.
     * @param ticketId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidTicketId(
        ticketId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/tickets/validate/{ticketId}',
            path: {
                'ticketId': ticketId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for kyc tickets
     * Search for kyc tickets in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateTicket OK
     * @throws ApiError
     */
    public searchTicket(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'subject_sort' = 'subject_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateTicket> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/tickets/search',
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
     * List kyc tickets
     * Retrieve kyc tickets in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateTicket OK
     * @throws ApiError
     */
    public listTicket(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'subject' | 'status' | 'priority' = 'subject',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateTicket> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/tickets/list',
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
     * List kyc tickets for a client
     * Retrieve kyc tickets for a client
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Ticket OK
     * @throws ApiError
     */
    public getTicketsForClient(
        clientId: string,
        xTenantId: string,
    ): CancelablePromise<Array<Ticket>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/tickets/list/{clientId}',
            path: {
                'clientId': clientId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
