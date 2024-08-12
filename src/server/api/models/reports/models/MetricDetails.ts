/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSeries } from './DataSeries';

export type MetricDetails = {
    amount?: number;
    change?: number;
    currency?: string | null;
    labels: Array<string>;
    series: Array<DataSeries>;
};

