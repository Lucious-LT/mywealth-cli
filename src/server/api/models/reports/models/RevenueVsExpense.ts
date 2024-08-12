/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RevenueDataSeries } from './RevenueDataSeries';

export type RevenueVsExpense = {
    overallScore?: number;
    overallScoreChange?: number;
    averageRatio?: number;
    averageRatioChange?: number;
    predictedRatio?: number;
    predictedRatioChange?: number;
    series: Array<RevenueDataSeries>;
};

