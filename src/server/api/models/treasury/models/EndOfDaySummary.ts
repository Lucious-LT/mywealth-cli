/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReportItem } from './EndOfDayReportItem';

export type EndOfDaySummary = {
    currency: string;
    totalIncome?: number;
    totalWithHoldingTax?: number;
    totalAccruedIncome?: number;
    totalAccruedWithHoldingTax?: number;
    totalAssetValue?: number;
    reportItems: Array<EndOfDayReportItem>;
};

