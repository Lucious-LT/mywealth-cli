/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Card } from '../models/Card';
import type { CardDisplayView } from '../models/CardDisplayView';
import type { CardListSort } from '../models/CardListSort';
import type { CardPinRequest } from '../models/CardPinRequest';
import type { CardRequest } from '../models/CardRequest';
import type { CardSearchSort } from '../models/CardSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCard } from '../models/PageTemplateCard';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CardService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new card
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public addCard(
        xTenantId: string,
        requestBody: CardRequest,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/cards',
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
     * Retrieve all cards for an account
     * Retrieve all cards for an account using the account ID.
     * @param accountId
     * @param xTenantId The tenant identifier
     * @returns Card OK
     * @throws ApiError
     */
    public findCardsForAccountId(
        accountId: UUID,
        xTenantId: string,
    ): CancelablePromise<Array<Card>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/account/{accountId}',
            path: {
                'accountId': accountId,
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
     * Approve a card
     * Approve a card using the card ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public approveCardById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cards/approve/{id}',
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
     * Block a card
     * Block a card using the card ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public blockCardById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cards/block/{id}',
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
     * Retrieve a card for display
     * Retrieve a card for display using the card token ID.
     * @param tokenId
     * @param xTenantId The tenant identifier
     * @returns CardDisplayView Indicates that the request was successful.
     * @throws ApiError
     */
    public findForDisplayByTokenId(
        tokenId: UUID,
        xTenantId: string,
    ): CancelablePromise<CardDisplayView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/card-display/{tokenId}',
            path: {
                'tokenId': tokenId,
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
     * Change the card pin
     * Change the card pin using the card token ID.
     * @param tokenId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public changeCardPinByTokenId(
        tokenId: UUID,
        xTenantId: string,
        requestBody: CardPinRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/cards/card-pin/{tokenId}',
            path: {
                'tokenId': tokenId,
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
     * Retrieve a card
     * Retrieve a card using the card token ID.
     * @param tokenId
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public findByTokenId(
        tokenId: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/card-token/{tokenId}',
            path: {
                'tokenId': tokenId,
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
     * Close a card
     * Close a card using the card ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public closeCardById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cards/close/{id}',
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
     * List cards
     * Retrieve cards in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCard OK
     * @throws ApiError
     */
    public listCard(
        order: Direction,
        sort: CardListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/list',
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
     * Search for cards using a full text search engine
     * Search for card in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCard OK
     * @throws ApiError
     */
    public searchCard(
        order: Direction,
        sort: CardSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/search',
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
     * Remove a card block
     * Remove a card block using the card ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public unblockCardById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/banking/api/v1/cards/unblock/{id}',
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
     * Retrieve a card
     * Retrieve a card using the card ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public findCardById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/cards/{id}',
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
     * Update a card record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Card Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCard(
        id: UUID,
        xTenantId: string,
        requestBody: CardRequest,
    ): CancelablePromise<Card> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/cards/{id}',
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
     * Delete a card
     * Delete a card using the product ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCard(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/cards/{id}',
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
