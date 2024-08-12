/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FundStatementView } from '../models/FundStatementView';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LedgerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get the fund statement for a given accountId and fundId
     * Retrieve the fund statement report for a specified account and fund using the statement date.
     * @param accountId
     * @param fundId
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @returns FundStatementView OK
     * @throws ApiError
     */
    public getFundStatementForAccountWithFundId(
        accountId: UUID,
        fundId: UUID,
        endDate: string,
        startDate: string,
        xTenantId: string,
    ): CancelablePromise<FundStatementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/api/v1/ledgers/fund/statement/account/{accountId}/{fundId}',
            path: {
                'accountId': accountId,
                'fundId': fundId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endDate': endDate,
                'startDate': startDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Get the fund statement for a given account and fund
     * Retrieve the fund statement report for a specified account and fund using the statement date.
     * @param accountId
     * @param marketCode
     * @param secId
     * @param endDate
     * @param startDate
     * @param xTenantId The tenant identifier
     * @returns FundStatementView OK
     * @throws ApiError
     */
    public getFundStatementForAccount(
        accountId: UUID,
        marketCode: string,
        secId: string,
        endDate: string,
        startDate: string,
        xTenantId: string,
    ): CancelablePromise<FundStatementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/api/v1/ledgers/fund/statement/market/{marketCode}/code/{secId}/account/{accountId}',
            path: {
                'accountId': accountId,
                'marketCode': marketCode,
                'secId': secId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endDate': endDate,
                'startDate': startDate,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
