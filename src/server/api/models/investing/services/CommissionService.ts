/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Commission } from '../models/Commission';
import type { CommissionRequest } from '../models/CommissionRequest';
import type { PageTemplateCommission } from '../models/PageTemplateCommission';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CommissionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new commission
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {commission_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Commission Success
     * @throws ApiError
     */
    public addCommission(
        xTenantId: string,
        requestBody: CommissionRequest,
    ): CancelablePromise<Commission> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/commissions',
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
     * Retrieve a commission
     * Retrieve a commission using the commission ID. **Requires a valid token**. Roles Allowed: {commission_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Commission OK
     * @throws ApiError
     */
    public findCommissionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Commission> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/commissions/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a commission
     * Delete a commission using the commission ID. **Requires a valid token**. Roles Allowed: {commission_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteCommission(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/commissions/{recordId}',
            path: {
                'recordId': recordId,
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
     * Update a commission
     * Update a commission in the system. **Requires a valid token**. Roles Allowed: {commission_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Commission Success
     * @throws ApiError
     */
    public updateCommission(
        recordId: string,
        xTenantId: string,
        requestBody: CommissionRequest,
    ): CancelablePromise<Commission> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/commissions/{recordId}',
            path: {
                'recordId': recordId,
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
     * Search for commissions
     * Search for commissions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {commission_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommission OK
     * @throws ApiError
     */
    public searchCommission(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'label_sort' = 'label_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommission> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/commissions/search',
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
     * List commissions
     * List commissions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {commission_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCommission OK
     * @throws ApiError
     */
    public listCommission(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'code' | 'label' | 'status' | 'startDate' | 'endDate' = 'label',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCommission> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/commissions/list',
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
