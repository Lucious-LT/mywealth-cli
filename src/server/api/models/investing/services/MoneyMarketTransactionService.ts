/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { MoneyMarketTransaction } from '../models/MoneyMarketTransaction';
import type { MoneyMarketTransactionRequest } from '../models/MoneyMarketTransactionRequest';
import type { PageTemplateMoneyMarketTransaction } from '../models/PageTemplateMoneyMarketTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MoneyMarketTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new transaction
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {money_market_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid request that satisfies all the product rules must be provided.
     * @param xIdempotencyId The idempotency key for the request.
     * If a request is sent with an existing key, the existing record will be returned.
     *
     * @returns MoneyMarketTransaction Success
     * @throws ApiError
     */
    public addMoneyMarketTransaction(
        xTenantId: string,
        requestBody: MoneyMarketTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/money_market_transactions',
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
     * Create or update money market transactions using the uploaded excel file
     * Creates or update money market transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format. **Requires a valid token**. Roles Allowed: {money_market_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param formData
     * @param requestDate
     * @returns BatchResponse OK
     * @throws ApiError
     */
    public uploadMoneyMarketTransactions(
        xTenantId: string,
        formData: {
            file: Blob;
        },
        requestDate?: string,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/money_market_transactions/upload',
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
     * Retrieve a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {money_market_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction OK
     * @throws ApiError
     */
    public findMoneyMarketTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/{transactionId}',
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
     * Delete a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {money_market_transaction_delete, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteMoneyMarketTransaction(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/money_market_transactions/{transactionId}',
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
     * Update a transaction in the system. **Requires a valid token**. Roles Allowed: {money_market_transaction_update, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns MoneyMarketTransaction Success
     * @throws ApiError
     */
    public updateMoneyMarketTransaction(
        transactionId: string,
        xTenantId: string,
        requestBody: MoneyMarketTransactionRequest,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/money_market_transactions/{transactionId}',
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
     * Terminate a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {money_market_transaction_approve, sysadmin}
     * @param transactionId
     * @param terminationDate
     * @param faceValue
     * @param discountRate
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction OK
     * @throws ApiError
     */
    public terminateMoneyMarketTransactionById(
        transactionId: string,
        terminationDate: string,
        faceValue: number,
        discountRate: number,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/money_market_transactions/terminate/{transactionId}/{terminationDate}',
            path: {
                'transactionId': transactionId,
                'terminationDate': terminationDate,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'faceValue': faceValue,
                'discountRate': discountRate,
            },
        });
    }

    /**
     * Post a transaction
     * Post a transaction using the transaction ID. Will set the transaction status to posted and initiate the investment. **Requires a valid token**. Roles Allowed: {money_market_transaction_post, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction OK
     * @throws ApiError
     */
    public postMoneyMarketTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/money_market_transactions/post/{transactionId}',
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
     * Approve a transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {money_market_transaction_approve, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction OK
     * @throws ApiError
     */
    public approveMoneyMarketTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/money_market_transactions/approve/{transactionId}',
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
     * Validate a transaction ID **Requires a valid token**. Roles Allowed: {money_market_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidMoneyMarketTransactionId(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/validate/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for money market transactions
     * Search for money market transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public searchMoneyMarketTransaction(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'clientCode_sort' | 'clientLabel_sort' | 'orderNo_sort' | 'orderDesc_sort' = 'orderNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/search',
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
     * Reverse a money market transaction
     * Reverse a transaction using the transaction ID. The transaction status will be set to pending. **Requires a valid token**. Roles Allowed: {money_market_transaction_view, sysadmin}
     * @param transactionId
     * @param xTenantId The tenant identifier
     * @returns MoneyMarketTransaction OK
     * @throws ApiError
     */
    public reverseMoneyMarketTransactionById(
        transactionId: string,
        xTenantId: string,
    ): CancelablePromise<MoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/reverse/{transactionId}',
            path: {
                'transactionId': transactionId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List money market transactions
     * List money market transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public listMoneyMarketTransaction(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/list',
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
     * List money market transactions for a client
     * List money market transactions for a client in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_transaction_list, sysadmin}
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public listClientMoneyMarketTransactions(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/list/client/{clientId}',
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
     * List money market transactions for an investment account
     * List money market transactions for an investment account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {money_market_transaction_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMoneyMarketTransaction OK
     * @throws ApiError
     */
    public listAccountMoneyMarketTransactions(
        accountId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMoneyMarketTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/money_market_transactions/list/account/{accountId}',
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
