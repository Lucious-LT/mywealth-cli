/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlacementTransaction } from '../models/PlacementTransaction';
import type { PlacementTransactionTrancheRequest } from '../models/PlacementTransactionTrancheRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PlacementTransactionTrancheService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Add or withdraw funds from a running placement transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public addPlacementTransactionTranche(
        xTenantId: string,
        requestBody: PlacementTransactionTrancheRequest,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/transaction/placement/tranche',
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
     * Approve a transaction tranche
     * Approve a transaction using the transaction ID.
     * @param trancheId
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public approvePlacementTransactionTrancheById(
        trancheId: UUID,
        transactionId: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/placement/tranche/approve/{transactionId}/{trancheId}',
            path: {
                'trancheId': trancheId,
                'transactionId': transactionId,
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
     * Post a transaction tranche
     * Post a transaction using the tranche ID.
     * @param trancheId
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postPlacementTransactionTrancheById(
        trancheId: UUID,
        transactionId: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/placement/tranche/post/{transactionId}/{trancheId}',
            path: {
                'trancheId': trancheId,
                'transactionId': transactionId,
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
     * Reverse a transaction tranche
     * Reverse a transaction tranche using the transaction ID.
     * @param trancheId
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public reversePlacementTransactionTrancheById(
        trancheId: UUID,
        transactionId: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/treasury/api/v1/transaction/placement/tranche/reverse/{transactionId}/{trancheId}',
            path: {
                'trancheId': trancheId,
                'transactionId': transactionId,
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
     * Update a placement transaction tranche record
     * Update an record in the system. See the schema of the object for more information.
     * @param trancheId
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns PlacementTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updatePlacementTransactionTranche(
        trancheId: UUID,
        transactionId: UUID,
        xTenantId: string,
        requestBody: PlacementTransactionTrancheRequest,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/treasury/api/v1/transaction/placement/tranche/{transactionId}/{trancheId}',
            path: {
                'trancheId': trancheId,
                'transactionId': transactionId,
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
     * Delete a placement transaction tranche record
     * Delete a placement transaction using the ID.
     * @param trancheId
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns PlacementTransaction OK
     * @throws ApiError
     */
    public deletePlacementTransactionTranche(
        trancheId: UUID,
        transactionId: UUID,
        xTenantId: string,
    ): CancelablePromise<PlacementTransaction> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/treasury/api/v1/transaction/placement/tranche/{transactionId}/{trancheId}',
            path: {
                'trancheId': trancheId,
                'transactionId': transactionId,
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
