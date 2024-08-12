/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransactionMetric } from './TransactionMetric';

export type TransactionSummary = {
    labels: Array<string>;
    series: Record<string, Array<TransactionMetric>>;
};

