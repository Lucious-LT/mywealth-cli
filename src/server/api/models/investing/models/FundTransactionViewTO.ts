/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundTransactionView } from './FundTransactionView';

/**
 * A JSON blob representing a collection of fund transaction records
 */
export type FundTransactionViewTO = {
    /**
     * The total number of records.
     */
    count: number;
    /**
     * The records returned
     */
    content: Array<FundTransactionView>;
};

