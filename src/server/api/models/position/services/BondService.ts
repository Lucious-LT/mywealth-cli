/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bond } from '../models/Bond';
import type { BondListSort } from '../models/BondListSort';
import type { BondRequest } from '../models/BondRequest';
import type { BondSearchSort } from '../models/BondSearchSort';
import type { Direction } from '../models/Direction';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { PageTemplateBond } from '../models/PageTemplateBond';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BondService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new bond
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Bond Indicates that the request was successful.
     * @throws ApiError
     */
    public addBond(
        xTenantId: string,
        requestBody: BondRequest,
    ): CancelablePromise<Bond> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/bonds',
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
     * List bonds
     * Retrieve bonds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBond OK
     * @throws ApiError
     */
    public listBond(
        order: Direction,
        sort: BondListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBond> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/list',
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
     * List bonds for a market
     * Retrieve bonds for a market in the system using the supported query parameters.
     * @param marketCode
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateBond OK
     * @throws ApiError
     */
    public listBondByMarketCode(
        marketCode: string,
        order: Direction,
        sort: BondListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateBond> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/list/market/{marketCode}',
            path: {
                'marketCode': marketCode,
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
     * Retrieve a bond using the market code and security ID
     * Retrieve a bond using the market code and security ID
     * @param marketCode
     * @param secId
     * @param xTenantId The tenant identifier
     * @returns Bond Indicates that the request was successful.
     * @throws ApiError
     */
    public findBondByMarketCodeAndSecId(
        marketCode: string,
        secId: string,
        xTenantId: string,
    ): CancelablePromise<Bond> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/market/{marketCode}/{secId}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
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
     * Get the clean price of a bond.
     * Get the clean price of a bond for a date using the market code and security ID
     * @param marketCode
     * @param secId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getBondPrice(
        marketCode: string,
        secId: string,
        valueDate: LocalDate,
        xTenantId: string,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/price/{marketCode}/{secId}/{valueDate}',
            path: {
                'marketCode': marketCode,
                'secId': secId,
                'valueDate': valueDate,
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
     * Search for bonds using a full text search engine
     * Search for bonds in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateBond OK
     * @throws ApiError
     */
    public searchBond(
        order: Direction,
        sort: BondSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateBond> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/search',
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
     * Retrieve a bond using the ID
     * Retrieve a bond using the ID
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Bond Indicates that the request was successful.
     * @throws ApiError
     */
    public findBondById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Bond> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/bonds/{id}',
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
     * Update a bond record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Bond Indicates that the request was successful.
     * @throws ApiError
     */
    public updateBond(
        id: UUID,
        xTenantId: string,
        requestBody: BondRequest,
    ): CancelablePromise<Bond> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/bonds/{id}',
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
     * Delete a bond
     * Delete a bond using the bond ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteBond(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/bonds/{id}',
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
