/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { CashTransaction } from '../models/CashTransaction';
import type { CashTransactionRequest } from '../models/CashTransactionRequest';
import type { PageTemplateCashTransaction } from '../models/PageTemplateCashTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CashTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new order
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {cash_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid accountId,amount, value date and currency must be provided.
     * @param xIdempotencyId The idempotency key for the request.
     * If a request is sent with an existing key, the existing record will be returned.
     *
     * @returns CashTransaction Success
     * @throws ApiError
     */
    public addCashTransaction(
        xTenantId: string,
        requestBody: CashTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/cash_transactions',
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
     * Create or update cash transactions using the uploaded excel file
     * Creates or update cash transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format. **Requires a valid token**. Roles Allowed: {cash_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param formData
     * @param valueDate
     * @returns BatchResponse OK
     * @throws ApiError
     */
    public uploadCashTransactions(
        xTenantId: string,
        formData: {
            file: Blob;
        },
        valueDate?: string,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/cash_transactions/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'valueDate': valueDate,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Retrieve a cash transaction
     * Retrieve a cash transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {cash_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns CashTransaction OK
     * @throws ApiError
     */
    public findCashTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a cash transaction
     * Delete a cash transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {cash_transaction_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteCashTransaction(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/cash_transactions/{recordId}',
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
     * Update a cash transaction
     * Update a cash transaction in the system. **Requires a valid token**. Roles Allowed: {cash_transaction_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CashTransaction Success
     * @throws ApiError
     */
    public updateCashTransaction(
        recordId: string,
        xTenantId: string,
        requestBody: CashTransactionRequest,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/cash_transactions/{recordId}',
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
     * Reverse a cash transaction
     * Reverses the transaction journals and changes the status of the record. **Requires a valid token**. Roles Allowed: {cash_transaction_reverse, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Success
     * @throws ApiError
     */
    public reverseCashTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/cash_transactions/reverse/{recordId}',
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
     * Post a cash transaction
     * Generates and transaction journals and posts them to the general ledger. **Requires a valid token**. Roles Allowed: {cash_transaction_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns CashTransaction Success
     * @throws ApiError
     */
    public postCashTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/cash_transactions/post/{recordId}',
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
     * Cancel a cash transaction
     * Cancel a cash transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {cash_transaction_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns CashTransaction OK
     * @throws ApiError
     */
    public cancelCashTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/cash_transactions/cancel/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve a cash transaction
     * Approve a cash transaction using the transaction ID. **Requires a valid token**. Roles Allowed: {cash_transaction_approve, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns CashTransaction OK
     * @throws ApiError
     */
    public approveCashTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<CashTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/cash_transactions/approve/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a cash transaction ID
     * Validate a cash transaction ID **Requires a valid token**. Roles Allowed: {cash_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidCashTransactionId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for cash transactions
     * Search for cash transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {cash_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public searchCashTransaction(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'clientCode_sort' | 'clientLabel_sort' | 'transNo_sort' | 'transDesc_sort' = 'transNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/search',
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
     * List cash transactions
     * List cash transactions in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {cash_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public listCashTransaction(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'transNo' | 'transDesc' | 'status' | 'type' | 'amount' = 'transNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/list',
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
     * List cash transactions for a client
     * List cash transactions for a client in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {cash_transaction_list, sysadmin}
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public listAccountCashTransactions(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'transNo' | 'transDesc' | 'status' | 'type' | 'amount' = 'transNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/list/client/{clientId}',
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
     * List cash transactions for an account
     * List cash transactions for an account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {cash_transaction_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateCashTransaction OK
     * @throws ApiError
     */
    public listClientCashTransaction(
        accountId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'clientId' | 'clientCode' | 'clientLabel' | 'transNo' | 'transDesc' | 'status' | 'type' | 'amount' = 'transNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateCashTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/cash_transactions/list/account/{accountId}',
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
