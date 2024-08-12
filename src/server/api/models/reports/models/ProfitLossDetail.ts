/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSeries } from './DataSeries';

export type ProfitLossDetail = {
    amount?: number;
    change?: number;
    currency: string;
    labels: Array<string>;
    series: Array<DataSeries>;
};

