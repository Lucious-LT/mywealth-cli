/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GlSubAccountType } from '../models/GlSubAccountType';
import type { LocalDate } from '../models/LocalDate';
import type { Money } from '../models/Money';
import type { StatementView } from '../models/StatementView';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductAccountsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a sub account balance
     * Get a sub account (BANK or INVEST) balance using the ID
     * @param subAccountId
     * @param xTenantId The tenant identifier
     * @param valueDate
     * @returns Money Indicates that the request was successful.
     * @throws ApiError
     */
    public getSubAccountBalance(
        subAccountId: UUID,
        xTenantId: string,
        valueDate?: LocalDate,
    ): CancelablePromise<Money> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/sub-accounts/balance/{subAccountId}',
            path: {
                'subAccountId': subAccountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'valueDate': valueDate,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Generate a sub account statement
     * Generate a sub account (BANK or INVESTMENT) statement using the ID
     * @param subAccountId
     * @param endDate
     * @param startDate
     * @param subAccountType
     * @param xTenantId The tenant identifier
     * @param page
     * @param showReversals
     * @param size
     * @returns StatementView Indicates that the request was successful.
     * @throws ApiError
     */
    public generateSubAccountStatement(
        subAccountId: UUID,
        endDate: LocalDate,
        startDate: LocalDate,
        subAccountType: GlSubAccountType,
        xTenantId: string,
        page: number,
        showReversals: boolean = true,
        size: number = 20,
    ): CancelablePromise<StatementView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/accounting/api/v1/sub-accounts/statement/{subAccountId}',
            path: {
                'subAccountId': subAccountId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'endDate': endDate,
                'page': page,
                'showReversals': showReversals,
                'size': size,
                'startDate': startDate,
                'subAccountType': subAccountType,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
