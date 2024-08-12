/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransactionCountSummary } from './TransactionCountSummary';

export type TransactionDetails = {
    series: Record<string, Array<TransactionCountSummary>>;
};

