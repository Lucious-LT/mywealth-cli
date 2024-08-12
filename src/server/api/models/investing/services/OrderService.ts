/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Order } from '../models/Order';
import type { OrderContract } from '../models/OrderContract';
import type { OrderFill } from '../models/OrderFill';
import type { OrderFillRequest } from '../models/OrderFillRequest';
import type { OrderRequest } from '../models/OrderRequest';
import type { PageTemplateOrder } from '../models/PageTemplateOrder';
import type { PageTemplateOrderContract } from '../models/PageTemplateOrderContract';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OrderService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Submit a new order
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {order_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid accountId, asset type, marketCode, secId, no of order legs,side, time in force, and requested quantity must be provided.
     * @param xIdempotencyId The idempotency key for the request.
     * If a request is sent with an existing key, the existing record will be returned.
     *
     * @returns Order Success
     * @throws ApiError
     */
    public addOrder(
        xTenantId: string,
        requestBody: OrderRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders',
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
     * Validates an order and returns an unsaved order with the total and other properties populated. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {order_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid accountId, asset type, marketCode, secId, no of order legs,side, time in force, and requested quantity mut be provided.
     * @returns Order OK
     * @throws ApiError
     */
    public validateOrder(
        xTenantId: string,
        requestBody: OrderRequest,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/validate',
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
     * Create or update order execution records using the uploaded excel file
     * Creates or update order execution records in the system using an excel file. If any of the records in the file is invalid, the whole transaction will be rolled back.See the documentation for the expected file format. **Requires a valid token**. Roles Allowed: {order_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param formData
     * @param tradeDate
     * @returns BatchResponse OK
     * @throws ApiError
     */
    public uploadTradeExecution(
        xTenantId: string,
        formData: {
            file: Blob;
        },
        tradeDate?: string,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'tradeDate': tradeDate,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Create a new order fill
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {order_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody A valid orderId, quantity and price must be provided.
     * @returns OrderFill Success
     * @throws ApiError
     */
    public addOrderFill(
        xTenantId: string,
        requestBody: OrderFillRequest,
    ): CancelablePromise<OrderFill> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/fill',
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
     * Generate a contract note
     * Generates a contract note for all pending fills. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {order_create, sysadmin}
     * @param orderId
     * @param xTenantId The tenant identifier
     * @returns OrderContract Success
     * @throws ApiError
     */
    public generateOrderContract(
        orderId: string,
        xTenantId: string,
    ): CancelablePromise<OrderContract> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/orders/contract/{orderId}',
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
     * Retrieve an order using the order ID. **Requires a valid token**. Roles Allowed: {order_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Order OK
     * @throws ApiError
     */
    public findOrderById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/{recordId}',
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
     * Delete an order using the order ID. **Requires a valid token**. Roles Allowed: {order_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteOrder(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/orders/{recordId}',
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
     * Update an order in the system. **Requires a valid token**. Roles Allowed: {order_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Order Success
     * @throws ApiError
     */
    public updateOrder(
        recordId: string,
        xTenantId: string,
        requestBody: OrderRequest,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/orders/{recordId}',
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
     * Delete an order fill
     * Delete an order fill using the fill ID. **Requires a valid token**. Roles Allowed: {order_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteOrderFill(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/orders/fill/{recordId}',
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
     * Update an order fill
     * Update an order fill in the system. **Requires a valid token**. Roles Allowed: {order_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns OrderFill Success
     * @throws ApiError
     */
    public updateOrderFill(
        recordId: string,
        xTenantId: string,
        requestBody: OrderFillRequest,
    ): CancelablePromise<OrderFill> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/orders/fill/{recordId}',
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
     * Cancel a contract note using the contract note ID. This will reverse the note and open the tickets for modification. **Requires a valid token**. Roles Allowed: {order_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns OrderContract OK
     * @throws ApiError
     */
    public cancelOrderContractById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<OrderContract> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/orders/contract/cancel/{recordId}',
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
     * Cancel an order using the order ID. This will submit the order cancellation request for processing. **Requires a valid token**. Roles Allowed: {order_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Order OK
     * @throws ApiError
     */
    public cancelOrderById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/orders/cancel/{recordId}',
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
     * Approve an order using the order ID. This will submit the order for processing. **Requires a valid token**. Roles Allowed: {order_approve, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Order OK
     * @throws ApiError
     */
    public approveOrderById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/orders/approve/{recordId}',
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
     * Validate an order ID **Requires a valid token**. Roles Allowed: {order_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidOrderId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for clients
     * Search for orders in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrder OK
     * @throws ApiError
     */
    public searchOrder(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'marketCode_sort' | 'secId_sort' | 'clientCode_sort' | 'clientLabel_sort' | 'orderNo_sort' | 'orderDesc_sort' = 'orderNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/search',
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
     * List orders
     * List orders in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrder OK
     * @throws ApiError
     */
    public listOrder(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list',
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
     * List fills for an order
     * List fills for an order in the system. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param orderId
     * @param xTenantId The tenant identifier
     * @returns OrderFill OK
     * @throws ApiError
     */
    public listOrderFill(
        orderId: string,
        xTenantId: string,
    ): CancelablePromise<Array<OrderFill>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list/fill/{orderId}',
            path: {
                'orderId': orderId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List contract notes
     * List contract notes in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrderContract OK
     * @throws ApiError
     */
    public listOrderContracts(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'marketCode' | 'contractNo' | 'updatedAt' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'status' = 'contractNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrderContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list/contract',
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
     * List contract notes for an order in the system. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param orderId
     * @param xTenantId The tenant identifier
     * @returns OrderContract OK
     * @throws ApiError
     */
    public listOrderContract(
        orderId: string,
        xTenantId: string,
    ): CancelablePromise<Array<OrderContract>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list/contract/{orderId}',
            path: {
                'orderId': orderId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * List orders for an account
     * List orders for an account in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param accountId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrder OK
     * @throws ApiError
     */
    public listAccountOrders(
        accountId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list/client/{accountId}',
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
     * List orders for a client
     * List orders for a client in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrder OK
     * @throws ApiError
     */
    public listClientOrders(
        clientId: string,
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'marketCode' | 'secId' | 'clientId' | 'clientCode' | 'clientLabel' | 'orderNo' | 'orderDesc' | 'orderStatus' | 'side' = 'orderNo',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/list/account/{clientId}',
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
     * Retrieve an order
     * Retrieve a contract using the contract ID. **Requires a valid token**. Roles Allowed: {order_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns OrderContract OK
     * @throws ApiError
     */
    public findOrderContractById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<OrderContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/contract/{recordId}',
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
     * Search for contract notes in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {order_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateOrderContract OK
     * @throws ApiError
     */
    public searchOrderContract(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'contractNo_sort' | 'orderDesc_sort' | 'orderNo_sort' | 'clientCode_sort' | 'clientLabel_sort' | 'secId_sort' = 'contractNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateOrderContract> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/orders/contract/search',
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
