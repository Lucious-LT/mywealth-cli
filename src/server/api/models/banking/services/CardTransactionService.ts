/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CardTransaction } from '../models/CardTransaction';
import type { CardTransactionListSort } from '../models/CardTransactionListSort';
import type { CardTransactionRequest } from '../models/CardTransactionRequest';
import type { CardTransactionSearchSort } from '../models/CardTransactionSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCardTransaction } from '../models/PageTemplateCardTransaction';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CardTransactionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new card transaction
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns CardTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public postCardTransaction(
        xTenantId: string,
        requestBody: CardTransactionRequest,
        xIdempotencyId?: string | null,
    ): CancelablePromise<CardTransaction> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/card_transactions',
            headers: {
                'x-tenant-id': xTenantId,
                'x-idempotency-id': xIdempotencyId,
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
     * List card transactions
     * Retrieve card transactions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCardTransaction OK
     * @throws ApiError
     */
    public listCardTransaction(
        order: Direction,
        sort: CardTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCardTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/card_transactions/list',
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
     * List card transactions for account
     * Retrieve card transactions for an account in the system using the supported query parameters.
     * @param accountId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCardTransaction OK
     * @throws ApiError
     */
    public listCardTransactionForAccount(
        accountId: UUID,
        order: Direction,
        sort: CardTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCardTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/card_transactions/list/account/{accountId}',
            path: {
                'accountId': accountId,
            },
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
     * List card transactions for a card
     * Retrieve card transactions for a card in the system using the supported query parameters.
     * @param cardId
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCardTransaction OK
     * @throws ApiError
     */
    public listCardTransactionForCard(
        cardId: UUID,
        order: Direction,
        sort: CardTransactionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCardTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/card_transactions/list/card/{cardId}',
            path: {
                'cardId': cardId,
            },
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
     * Search for card transactions using a full text search engine
     * Search for card transactions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCardTransaction OK
     * @throws ApiError
     */
    public searchCardTransaction(
        order: Direction,
        sort: CardTransactionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCardTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/card_transactions/search',
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
     * Retrieve a card transaction record
     * Retrieve a card transactions using the transaction ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns CardTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public findCardTransactionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<CardTransaction> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/card_transactions/{id}',
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
     * Update a card transaction record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns CardTransaction Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCardTransaction(
        id: UUID,
        xTenantId: string,
        requestBody: CardTransactionRequest,
    ): CancelablePromise<CardTransaction> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/card_transactions/{id}',
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
     * Delete a card transaction record
     * Delete a card transaction using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCardTransaction(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/card_transactions/{id}',
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
