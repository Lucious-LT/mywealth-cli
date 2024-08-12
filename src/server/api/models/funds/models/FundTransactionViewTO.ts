/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundTransactionView } from './FundTransactionView';

/**
 * A JSON blob representing a fund transaction record.
 */
export type FundTransactionViewTO = {
    count?: number;
    content: Array<FundTransactionView>;
};

