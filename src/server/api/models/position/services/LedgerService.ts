/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BondValueResponse } from '../models/BondValueResponse';
import type { Direction } from '../models/Direction';
import type { Ledger } from '../models/Ledger';
import type { LedgerRequest1 } from '../models/LedgerRequest1';
import type { PageTemplateLedger } from '../models/PageTemplateLedger';
import type { PositionDetailView } from '../models/PositionDetailView';
import type { PositionInstrumentView } from '../models/PositionInstrumentView';
import type { PositionSummaryView } from '../models/PositionSummaryView';
import type { PositionView } from '../models/PositionView';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LedgerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new ledger entry
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @param xIdempotencyId The idempotency key for the request
     * @returns Ledger Indicates that the request was successful.
     * @throws ApiError
     */
    public addLedger(
        xTenantId: string,
        requestBody: LedgerRequest1,
        xIdempotencyId?: string | null,
    ): CancelablePromise<Ledger> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/ledgers',
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
     * Query for ledgers
     * Retrieve ledgers in the system using the supported query parameters.
     * @param order
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @returns PageTemplateLedger OK
     * @throws ApiError
     */
    public listLedger(
        order: Direction,
        xTenantId: string,
        page?: number,
        size: number = 20,
        sort: string = 'id',
    ): CancelablePromise<PageTemplateLedger> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/list',
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
     * Get the bond pricing for a given instrument
     * Retrieve pricing and cash flow schedule for a specified bond instrument, using the face value and evaluation date
     * @param instrumentId
     * @param evaluationDate
     * @param xTenantId The tenant identifier
     * @param faceValue
     * @returns BondValueResponse OK
     * @throws ApiError
     */
    public getBondPricingAndCouponSchedule(
        instrumentId: UUID,
        evaluationDate: string,
        xTenantId: string,
        faceValue?: number,
    ): CancelablePromise<BondValueResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/pricing/instrument/bond/{instrumentId}',
            path: {
                'instrumentId': instrumentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'evaluationDate': evaluationDate,
                'faceValue': faceValue,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the bond pricing for a given instrument
     * Retrieve pricing and cash flow schedule for a specified market and security Id, using the face value and evaluation date
     * @param marketId
     * @param secId
     * @param evaluationDate
     * @param xTenantId The tenant identifier
     * @param faceValue
     * @returns BondValueResponse OK
     * @throws ApiError
     */
    public getBondPricingAndCouponScheduleByMarketAndSecId(
        marketId: string,
        secId: string,
        evaluationDate: string,
        xTenantId: string,
        faceValue?: number,
    ): CancelablePromise<BondValueResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/pricing/instrument/bond/{marketId}/{secId}',
            path: {
                'marketId': marketId,
                'secId': secId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'evaluationDate': evaluationDate,
                'faceValue': faceValue,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the position report for a portfolio
     * Retrieve the position report for a specified portfolio. Optionally you can specify the valuation date and currency
     * @param accountId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @param currency
     * @returns PositionView OK
     * @throws ApiError
     */
    public getPositionReport(
        accountId: UUID,
        valueDate: string,
        xTenantId: string,
        currency?: string | null,
    ): CancelablePromise<PositionView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/report/account/{accountId}',
            path: {
                'accountId': accountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'currency': currency,
                'valueDate': valueDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the position report for a portfolio and security
     * Retrieve the position report for a specified portfolio and security
     * @param accountId
     * @param marketCode
     * @param secId
     * @param valueDate
     * @param xTenantId The tenant identifier
     * @param currency
     * @returns PositionInstrumentView OK
     * @throws ApiError
     */
    public getPortfolioPositionForSecurity(
        accountId: UUID,
        marketCode: string,
        secId: string,
        valueDate: string,
        xTenantId: string,
        currency?: string | null,
    ): CancelablePromise<PositionInstrumentView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/report/account/{accountId}/{marketCode}/{secId}',
            path: {
                'accountId': accountId,
                'marketCode': marketCode,
                'secId': secId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'currency': currency,
                'valueDate': valueDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the position details for a given instrument
     * Retrieve the position details report for a specified instrument. You can optionally specify the valuation date and if not provided, it will default to the current date
     * @param instrumentId
     * @param xTenantId The tenant identifier
     * @param journalDate
     * @returns PositionDetailView OK
     * @throws ApiError
     */
    public getInstrumentPositionDetailReport(
        instrumentId: UUID,
        xTenantId: string,
        journalDate?: string | null,
    ): CancelablePromise<Array<PositionDetailView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/report/instrument/{instrumentId}/detail',
            path: {
                'instrumentId': instrumentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'journalDate': journalDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the position summary for a given instrument
     * Retrieve the position summary report for a specified instrument. You can optionally specify the valuation date and if not provided, it will default to the current date
     * @param instrumentId
     * @param xTenantId The tenant identifier
     * @param journalDate
     * @returns PositionSummaryView OK
     * @throws ApiError
     */
    public getInstrumentPositionSummaryReport(
        instrumentId: UUID,
        xTenantId: string,
        journalDate?: string | null,
    ): CancelablePromise<PositionSummaryView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/report/instrument/{instrumentId}/summary',
            path: {
                'instrumentId': instrumentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'journalDate': journalDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a ledger
     * Retrieve a ledger using the ledger ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Ledger Indicates that the request was successful.
     * @throws ApiError
     */
    public findLedgerById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Ledger> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/ledgers/{id}',
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
                404: `Indicates that the record was not found.`,
            },
        });
    }

    /**
     * Update a ledger record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Ledger Indicates that the request was successful.
     * @throws ApiError
     */
    public updateLedger(
        id: UUID,
        xTenantId: string,
        requestBody: LedgerRequest1,
    ): CancelablePromise<Ledger> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/ledgers/{id}',
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
     * Delete a ledger
     * Delete an ledger using the ledger ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns void
     * @throws ApiError
     */
    public deleteLedger(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/ledgers/{id}',
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
                404: `Indicates that the record was not found.`,
            },
        });
    }

}
