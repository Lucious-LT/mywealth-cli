/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { FixedDepositTransaction } from '../models/FixedDepositTransaction';
import type { FixedDepositTransactionRequest } from '../models/FixedDepositTransactionRequest';
import type { PageTemplateFixedDepositTransaction } from '../models/PageTemplateFixedDepositTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FixedDepositTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new transaction
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid request that satisfies all the product rules must be provided.
     * @param xIdempotencyId The idempotency key for the request.
     * If a request is sent with an existing key, the existing record will be returned.
     *
     * @returns FixedDepositTransaction Success
     * @throws ApiError
     */
    public addFixedDepositTransaction(
        xTenantId: string,
        requestBody: FixedDepositTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fixed_deposit_transactions',
            headers: {
                'x-idempotency-id': xIdempotencyId,
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
     * Create or update fixed deposit transactions using the uploaded excel file
     * Creates or update fixed deposit transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param formData
     * @param requestDate
     * @returns BatchResponse OK
     * @throws ApiError
     */
    public uploadFixedDepositTransactions(
        xTenantId: string,
        formData: {
            file: Blob;
        },
        requestDate?: string,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fixed_deposit_transactions/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'requestDate': requestDate,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Retrieve a transaction
     * Retrieve a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public findFixedDepositTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a transaction
     * Delete a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_delete, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteFixedDepositTransaction(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/fixed_deposit_transactions/{transactionId}',
            path: {
                'transactionId': transactionId,
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
     * Update a transaction
     * Update a transaction in the system. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_update, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FixedDepositTransaction Success
     * @throws ApiError
     */
    public updateFixedDepositTransaction(
        transactionId: string,
        xTenantId: string,
        requestBody: FixedDepositTransactionRequest,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/{transactionId}',
            path: {
                'transactionId': transactionId,
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
     * Terminate a transaction
     * Terminate a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_approve, sysadmin}
     * @param transactionId
     * @param terminationDate
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public terminateFixedDepositTransactionById(
        transactionId: string,
        terminationDate: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/terminate/{transactionId}/{terminationDate}',
            path: {
                'transactionId': transactionId,
                'terminationDate': terminationDate,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Post a transaction
     * Post a transaction using the transaction ID. Will set the transaction status to posted and initiate the investment. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_post, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public postFixedDepositTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/post/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve a transaction
     * Approve a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_approve, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public approveFixedDepositTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fixed_deposit_transactions/approve/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a transaction ID
     * Validate a transaction ID **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidFixedDepositTransactionId(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/validate/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for fixed deposit transactions
     * Search for fixed deposit transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositTransaction OK
     * @throws ApiError
     */
    public searchFixedDepositTransaction(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'clientCode_sort' | 'clientLabel_sort' | 'orderNo_sort' | 'orderDesc_sort' = 'orderNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/search',
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
     * Reverse a fixed deposit transaction
     * Reverse a transaction using the transaction ID. The transaction status will be set to pending. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns FixedDepositTransaction OK
     * @throws ApiError
     */
    public reverseFixedDepositTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<FixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/reverse/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List fixed deposit transactions
     * List fixed deposit transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositTransaction OK
     * @throws ApiError
     */
    public listFixedDepositTransaction(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/list',
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
     * List fixed deposit transactions for a client
     * List fixed deposit transactions for a client in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_list, sysadmin}
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositTransaction OK
     * @throws ApiError
     */
    public listClientFixedDepositTransactions(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/list/client/{clientId}',
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
     * List fixed deposit transactions for an investment account
     * List fixed deposit transactions for an investment account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fixed_deposit_transaction_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFixedDepositTransaction OK
     * @throws ApiError
     */
    public listAccountFixedDepositTransactions(
        accountId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFixedDepositTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fixed_deposit_transactions/list/account/{accountId}',
            path: {
                'accountId': accountId,
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
