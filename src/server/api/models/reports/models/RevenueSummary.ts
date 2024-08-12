/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RevenueDataSeries } from './RevenueDataSeries';

export type RevenueSummary = {
    growthRate?: number;
    averageMonthlyIncome?: number;
    series: Array<RevenueDataSeries>;
};

