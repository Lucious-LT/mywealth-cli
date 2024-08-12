/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundAsset } from './FundAsset';

export type EndOfDaySummary = {
    currency: string;
    totalIncome?: number;
    totalWithHoldingTax?: number;
    totalAccruedIncome?: number;
    totalAccruedWithHoldingTax?: number;
    totalAssetValue?: number;
    reportItems: Array<FundAsset>;
};

