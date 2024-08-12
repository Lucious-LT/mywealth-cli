/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FixedDepositTransaction } from '../models/FixedDepositTransaction';
import type { FixedDepositTransactionTrancheRequest } from '../models/FixedDepositTransactionTrancheRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedDepositTrancheService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new transaction tranche
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid request that satisfies all the product rules must be provided.
     * @returns FixedDepositTransaction Success
     * @throws ApiError
     */
    public addFixedDepositTransactionTranche(
        xTenantId: string,
        requestBody: FixedDepositTransactionTrancheRequest,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fixed_deposit_transactions/tranche',
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
     * Delete a transaction tranche
     * Delete a transaction tranche using the transaction and tranche ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_delete, sysadmin}
     * @param transactionId
     * @param trancheId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction Success
     * @throws ApiError
     */
    public deleteFixedDepositTransactionTranche(
        transactionId: string,
        trancheId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/fixed_deposit_transactions/tranche/{transactionId}/{trancheId}',
            path: {
                'transactionId': transactionId,
                'trancheId': trancheId,
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
     * Update a transaction tranche
     * Update a transaction tranche in the system using the transaction and tranche ID. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_update, sysadmin}
     * @param transactionId
     * @param trancheId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedDepositTransaction Success
     * @throws ApiError
     */
    public updateFixedDepositTransactionTranche(
        transactionId: string,
        trancheId: string,
        xTenantId: string,
        requestBody: FixedDepositTransactionTrancheRequest,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/tranche/{transactionId}/{trancheId}',
            path: {
                'transactionId': transactionId,
                'trancheId': trancheId,
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
     * Post a transaction tranche
     * Post a transaction tranche using the transaction and tranche ID. The transaction status will be set to posted. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_post, sysadmin}
     * @param transactionId
     * @param trancheId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public postFixedDepositTransactionTrancheById(
        transactionId: string,
        trancheId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/tranche/post/{transactionId}/{trancheId}',
            path: {
                'transactionId': transactionId,
                'trancheId': trancheId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve a transaction tranche
     * Approve a transaction tranche using the transaction and tranche ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_approve, sysadmin}
     * @param transactionId
     * @param trancheId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public approveFixedDepositTransactionTrancheById(
        transactionId: string,
        trancheId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/tranche/approve/{transactionId}/{trancheId}',
            path: {
                'transactionId': transactionId,
                'trancheId': trancheId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Reverse a fixed deposit transaction tranche
     * Reverse a transaction tranche using the transaction and tranche ID. The transaction status will be set to pending. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_view, sysadmin}
     * @param transactionId
     * @param trancheId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public reverseFixedDepositTransactionTrancheById(
        transactionId: string,
        trancheId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/tranche/reverse/{transactionId}/{trancheId}',
            path: {
                'transactionId': transactionId,
                'trancheId': trancheId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
