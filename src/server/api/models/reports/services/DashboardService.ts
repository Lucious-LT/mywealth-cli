/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FinancialPerformanceDashboard } from '../models/FinancialPerformanceDashboard';
import type { TransactionActivityDashboard } from '../models/TransactionActivityDashboard';
import type { TransactionAnalyticsDashboard } from '../models/TransactionAnalyticsDashboard';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DashboardService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Generate a dashboard activity report for banking
     * Generate dashboard activity report for banking
     * @param xTenantId The tenant identifier
     * @returns TransactionActivityDashboard OK
     * @throws ApiError
     */
    public getBankingActivityDashboard(
        xTenantId: string,
    ): CancelablePromise<TransactionActivityDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/activity/banking',
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
     * Generate a dashboard activity report for insurance
     * Generate dashboard activity report for insurance
     * @param xTenantId The tenant identifier
     * @returns TransactionActivityDashboard OK
     * @throws ApiError
     */
    public getInsuranceActivityDashboard(
        xTenantId: string,
    ): CancelablePromise<TransactionActivityDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/activity/insurance',
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
     * Generate a dashboard activity report for investing
     * Generate dashboard activity report for investing
     * @param xTenantId The tenant identifier
     * @returns TransactionActivityDashboard OK
     * @throws ApiError
     */
    public getInvestingActivityDashboard(
        xTenantId: string,
    ): CancelablePromise<TransactionActivityDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/activity/investing',
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
     * Generate a dashboard analytics report for banking
     * Generate dashboard analytics report for banking
     * @param xTenantId The tenant identifier
     * @returns TransactionAnalyticsDashboard OK
     * @throws ApiError
     */
    public getBankingAnalyticsDashboard(
        xTenantId: string,
    ): CancelablePromise<TransactionAnalyticsDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/analytics/banking',
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
     * Generate a dashboard analytics report for investing
     * Generate dashboard analytics report for investing
     * @param xTenantId The tenant identifier
     * @returns TransactionAnalyticsDashboard OK
     * @throws ApiError
     */
    public getInvestingAnalyticsDashboard(
        xTenantId: string,
    ): CancelablePromise<TransactionAnalyticsDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/analytics/investing',
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
     * Generate a dashboard analytics report for revenue
     * Generate dashboard analytics report for revenue
     * @param xTenantId The tenant identifier
     * @returns FinancialPerformanceDashboard OK
     * @throws ApiError
     */
    public getRevenueAnalyticsDashboard(
        xTenantId: string,
    ): CancelablePromise<FinancialPerformanceDashboard> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/reports/warehouse/api/v1/dashboards/analytics/revenue',
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
