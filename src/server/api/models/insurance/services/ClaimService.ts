/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Claim } from '../models/Claim';
import type { ClaimListSort } from '../models/ClaimListSort';
import type { ClaimRequest } from '../models/ClaimRequest';
import type { ClaimSearchSort } from '../models/ClaimSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateClaim } from '../models/PageTemplateClaim';
import type { Policy } from '../models/Policy';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClaimService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new insurance claim
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public addClaim(
        xTenantId: string,
        requestBody: ClaimRequest,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/insurance/api/v1/claims',
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
     * Approve an insurance claim
     * Approve an insurance claim using the claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public approveClaimById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/claims/approve/{id}',
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
     * Retrieve claims for a client using the ID
     * Retrieve claims for a client using the ID
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Claim OK
     * @throws ApiError
     */
    public findClaimsForClientById(
        clientId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Claim>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/client/{clientId}',
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
     * Retrieve a insurance claim
     * Retrieve an claim using the claim code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public findClaimByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/code/{code}',
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
     * List insurance claims
     * Retrieve claims in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateClaim OK
     * @throws ApiError
     */
    public listClaim(
        order: Direction,
        sort: ClaimListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateClaim> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/list',
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
     * Retrieve an insurance policy using the claim ID
     * Retrieve an insurance policy using the claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Policy Indicates that the request was successful.
     * @throws ApiError
     */
    public findClaimPolicyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Policy> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/policy/{id}',
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
     * Reactivate an insurance claim
     * Reactivate an insurance claim using the insurance claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public payClaimById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/claims/reactivate/{id}',
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
     * Search for insurance claims using a full text search engine
     * Search for claims in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateClaim OK
     * @throws ApiError
     */
    public searchClaim(
        order: Direction,
        sort: ClaimSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateClaim> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/search',
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
     * Suspend an insurance claim
     * Suspend an insurance claim using the insurance claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public denyClaimById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/insurance/api/v1/claims/suspend/{id}',
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
     * Retrieve an insurance claim
     * Retrieve an claim using the claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public findClaimById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/insurance/api/v1/claims/{id}',
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
     * Update an insurance claim record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Claim Indicates that the request was successful.
     * @throws ApiError
     */
    public updateClaim(
        id: UUID,
        xTenantId: string,
        requestBody: ClaimRequest,
    ): CancelablePromise<Claim> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/insurance/api/v1/claims/{id}',
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
     * Delete an insurance claim
     * Delete a claim using the claim ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteClaim(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/insurance/api/v1/claims/{id}',
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
