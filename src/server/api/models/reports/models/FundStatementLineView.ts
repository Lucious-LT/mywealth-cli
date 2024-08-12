/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing fund statement line.
 */
export type FundStatementLineView = {
    /**
     * The ledger date
     */
    transDate: LocalDate;
    /**
     * Subscription for 200 Units @ 23.00
     */
    description: string;
    /**
     * The transaction type
     */
    transType: string;
    /**
     * The transaction price
     */
    transPrice?: number;
    /**
     * The value of the transaction
     */
    transAmount?: number;
    /**
     * The # of transaction units
     */
    transUnits?: number;
    /**
     * The balance after the transaction
     */
    balance?: number;
};

