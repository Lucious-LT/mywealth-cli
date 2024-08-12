/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { FundTransaction } from '../models/FundTransaction';
import type { FundTransactionContract } from '../models/FundTransactionContract';
import type { FundTransactionRequest } from '../models/FundTransactionRequest';
import type { FundTransactionViewTO } from '../models/FundTransactionViewTO';
import type { PageTemplateFundTransaction } from '../models/PageTemplateFundTransaction';
import type { PageTemplateFundTransactionContract } from '../models/PageTemplateFundTransactionContract';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FundTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new order
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fund_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid accountId, marketCode, fundID, orderType, and requested quantity must be provided.
     * @param xIdempotencyId The idempotency key for the request.
     * If a request is sent with an existing key, the existing record will be returned.
     *
     * @returns FundTransaction Success
     * @throws ApiError
     */
    public addFundTransaction(
        xTenantId: string,
        requestBody: FundTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fund_transactions',
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
     * Validate an order
     * Validates and order and returns an unsaved order with the total and other properties populated. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fund_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid accountId, asset type, marketCode, secId, no of order legs,side, time in force, and requested quantity mut be provided.
     * @returns FundTransaction OK
     * @throws ApiError
     */
    public validateFundTransaction(
        xTenantId: string,
        requestBody: FundTransactionRequest,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fund_transactions/validate',
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
     * Create or update fund transactions using the uploaded excel file
     * Creates or update fund transactions in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format. **Requires a valid token**. Roles Allowed: {fund_transaction_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param formData
     * @param requestDate
     * @returns BatchResponse OK
     * @throws ApiError
     */
    public uploadFundTransactions(
        xTenantId: string,
        formData: {
            file: Blob;
        },
        requestDate?: string,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fund_transactions/upload',
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
     * Generate a contract note
     * Generates a contract note for all pending fills. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {fund_transaction_create, sysadmin}
     * @param orderId
     * @param xTenantId The tenant identifier
     * @returns FundTransactionContract Success
     * @throws ApiError
     */
    public generateFundContract(
        orderId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransactionContract> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/fund_transactions/contract/{orderId}',
            path: {
                'orderId': orderId,
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
     * Retrieve an order
     * Retrieve an order using the order ID. **Requires a valid token**. Roles Allowed: {fund_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransaction OK
     * @throws ApiError
     */
    public findFundTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete an order
     * Delete an order using the order ID. **Requires a valid token**. Roles Allowed: {fund_transaction_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteFundTransaction(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/fund_transactions/{recordId}',
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
     * Update an order
     * Update an order in the system. **Requires a valid token**. Roles Allowed: {fund_transaction_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns FundTransaction Success
     * @throws ApiError
     */
    public updateFundTransaction(
        recordId: string,
        xTenantId: string,
        requestBody: FundTransactionRequest,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fund_transactions/{recordId}',
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
     * Cancel a contract note
     * Cancel a contract note using the contract note ID. This will reverse the note and open the tickets for modification. **Requires a valid token**. Roles Allowed: {fund_transaction_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransactionContract OK
     * @throws ApiError
     */
    public cancelFundTransactionContractById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransactionContract> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fund_transactions/contract/cancel/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Cancel an order
     * Cancel an order using the order ID. This will submit the order cancellation request for processing. **Requires a valid token**. Roles Allowed: {fund_transaction_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransaction OK
     * @throws ApiError
     */
    public cancelFundTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fund_transactions/cancel/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve an order
     * Approve an order using the order ID. This will submit the order for processing. **Requires a valid token**. Roles Allowed: {fund_transaction_approve, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransaction OK
     * @throws ApiError
     */
    public approveFundTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/fund_transactions/approve/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate an order ID
     * Validate an order ID **Requires a valid token**. Roles Allowed: {fund_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidFundTransactionId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for orders
     * Search for orders in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransaction OK
     * @throws ApiError
     */
    public searchFundTransaction(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'marketCode_sort' | 'secId_sort' | 'clientCode_sort' | 'clientLabel_sort' | 'orderNo_sort' | 'orderDesc_sort' = 'orderNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/search',
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
     * Reverse order approval
     * Reverse an approved order using the order ID. The order status will be set to pending. **Requires a valid token**. Roles Allowed: {fund_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransaction OK
     * @throws ApiError
     */
    public reverseApprovedFundTransactionById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/reverse/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Find open orders for a fund
     * Find open orders for a fund using the instrument ID and optional filter parameters. The supported filter parameters are: start, limit. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param instrumentId
     * @param xTenantId The tenant identifier
     * @param start
     * @param limit
     * @returns FundTransactionViewTO OK
     * @throws ApiError
     */
    public findOpenOrdersForFund(
        instrumentId: string,
        xTenantId: string,
        start: number,
        limit: number = 10,
    ): CancelablePromise<FundTransactionViewTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/query/open/{instrumentId}',
            path: {
                'instrumentId': instrumentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'start': start,
                'limit': limit,
            },
        });
    }

    /**
     * List orders
     * List orders in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransaction OK
     * @throws ApiError
     */
    public listFundTransaction(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/list',
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
     * List contract notes
     * List contract notes in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransactionContract OK
     * @throws ApiError
     */
    public listFundContracts(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'marketCode' | 'contractNo' | 'updatedAt' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' = 'contractNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransactionContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/list/contract',
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
     * List contract notes for an order
     * List contract notes for an order in the system. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param orderId
     * @param xTenantId The tenant identifier
     * @returns FundTransactionContract OK
     * @throws ApiError
     */
    public listFundTransactionContract(
        orderId: string,
        xTenantId: string,
    ): CancelablePromise<Array<FundTransactionContract>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/list/contract/{orderId}',
            path: {
                'orderId': orderId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List orders for a client
     * List orders for a client in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransaction OK
     * @throws ApiError
     */
    public listClientFundTransactions(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/list/client/{clientId}',
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
     * List orders for an investment account
     * List orders for an investment account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransaction OK
     * @throws ApiError
     */
    public listAccountFundTransactions(
        accountId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/list/account/{accountId}',
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

    /**
     * Retrieve an order
     * Retrieve a contract using the contract ID. **Requires a valid token**. Roles Allowed: {fund_transaction_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns FundTransactionContract OK
     * @throws ApiError
     */
    public findFundTransactionContractById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<FundTransactionContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/contract/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for contract notes
     * Search for contract notes in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {fund_transaction_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateFundTransactionContract OK
     * @throws ApiError
     */
    public searchFundContract(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'contractNo_sort' | 'orderDesc_sort' | 'orderNo_sort' | 'clientCode_sort' | 'clientLabel_sort' | 'secId_sort' = 'contractNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateFundTransactionContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fund_transactions/contract/search',
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

}
