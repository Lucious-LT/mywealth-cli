/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Direction } from '../models/Direction';
import type { InsuranceProduct } from '../models/InsuranceProduct';
import type { PageTemplatePolicy } from '../models/PageTemplatePolicy';
import type { Policy } from '../models/Policy';
import type { PolicyListSort } from '../models/PolicyListSort';
import type { PolicyRequest } from '../models/PolicyRequest';
import type { PolicySearchSort } from '../models/PolicySearchSort';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PolicyService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new insurance policy
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public addPolicy(
        xTenantId: string,
        requestBody: PolicyRequest,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/policies',
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
     * Approve an insurance policy
     * Approve an insurance policy using the policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public approvePolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/policies/approve/{id}',
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
     * Cancel an insurance policy
     * Cancel an insurance policy using the policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public cancelPolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/policies/cancel/{id}',
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
     * Retrieve policies for a client using the ID
     * Retrieve policies for a client using the ID
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Policy OK
     * @throws ApiError
     */
    public findPoliciesForClientById(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Policy>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/client/{clientId}',
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
     * Retrieve an insurance policy
     * Retrieve an policy using the policy code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public findPolicyByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/code/{code}',
            path: {
                'code': code,
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
     * List insurance policies
     * Retrieve policies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplatePolicy OK
     * @throws ApiError
     */
    public listPolicy(
        order: Direction,
        sort: PolicyListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplatePolicy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/list',
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
     * Retrieve an insurance product using the policy ID
     * Retrieve an insurance product using the policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns InsuranceProduct Indicates that the request was successful.
     * @throws ApiError
     */
    public findPolicyProductById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<InsuranceProduct> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/product/{id}',
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
     * Reactivate an insurance policy
     * Reactivate an insurance policy using the insurance policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public reActivatePolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/policies/reactivate/{id}',
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
     * Search for insurance policies using a full text search engine
     * Search for policies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplatePolicy OK
     * @throws ApiError
     */
    public searchPolicy(
        order: Direction,
        sort: PolicySearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplatePolicy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/search',
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
     * Suspend an insurance policy
     * Suspend an insurance policy using the insurance policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public suspendPolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/policies/suspend/{id}',
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
     * Retrieve a insurance policy
     * Retrieve an policy using the policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public findPolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/policies/{id}',
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
     * Update a insurance policy record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePolicy(
        id: UUID,
        xTenantId: string,
        requestBody: PolicyRequest,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/policies/{id}',
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
     * Delete an insurance policy
     * Delete a policy using the policy ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deletePolicy(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/policies/{id}',
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
