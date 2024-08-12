/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientCenterReport } from '../models/ClientCenterReport';
import type { ClientListSort } from '../models/ClientListSort';
import type { ClientStatus } from '../models/ClientStatus';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { LocalDateTime } from '../models/LocalDateTime';
import type { PageTemplateClient } from '../models/PageTemplateClient';
import type { UUID } from '../models/UUID';
import type { ValuationStatement } from '../models/ValuationStatement';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClientService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List clients by create time
     * Retrieve clients in the system using a create time filter
     * @param endTime
     * @param order
     * @param sort
     * @param startTime
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateClient OK
     * @throws ApiError
     */
    public listClientsByCreateTime(
        endTime: LocalDateTime,
        order: Direction,
        sort: ClientListSort,
        startTime: LocalDateTime,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateClient> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/crm/api/v1/clients/list/create-time',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endTime': endTime,
                'order': order,
                'page': page,
                'size': size,
                'sort': sort,
                'startTime': startTime,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List clients by status
     * Retrieve clients in the system using a status filter
     * @param order
     * @param sort
     * @param status
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateClient OK
     * @throws ApiError
     */
    public listClientsByStatus(
        order: Direction,
        sort: ClientListSort,
        status: ClientStatus,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateClient> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/crm/api/v1/clients/list/status',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'size': size,
                'sort': sort,
                'status': status,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Generate a client center valuation report
     * Generate a client center valuation report
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns ClientCenterReport OK
     * @throws ApiError
     */
    public getClientCenterValuationReport(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<ClientCenterReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/crm/api/v1/clients/report/client-center/valuation/{clientId}',
            path: {
                'clientId': clientId,
            },
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
     * Generate a client valuation statement for a period
     * Generate a client valuation statement for a period
     * @param clientId
     * @param currency
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @returns ValuationStatement OK
     * @throws ApiError
     */
    public getClientValuationStatementReport(
        clientId: UUID,
        currency: string,
        endDate: LocalDate,
        startDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<ValuationStatement> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/crm/api/v1/clients/report/statement/{clientId}/{startDate}/{endDate}/{currency}',
            path: {
                'clientId': clientId,
                'currency': currency,
                'endDate': endDate,
                'startDate': startDate,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
