/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing an end of day report item.
 */
export type EndOfDayReportItem = {
    /**
     * The report item ID
     */
    id: number;
    /**
     * The product ID
     */
    productId: UUID;
    /**
     * The product code
     */
    productCode: string;
    /**
     * The product currency
     */
    productCurrency: string;
    /**
     * The product label
     */
    productLabel: string;
    /**
     * The product type
     */
    productType: string;
    /**
     * The total credit interest
     */
    creditInterest?: number;
    /**
     * The total debit interest
     */
    debitInterest?: number;
    /**
     * The total credit opening balance
     */
    creditOpeningBalance?: number;
    /**
     * The total credit closing balance
     */
    creditClosingBalance?: number;
    /**
     * The total debit opening balance
     */
    debitOpeningBalance?: number;
    /**
     * The total credit closing balance
     */
    debitClosingBalance?: number;
    /**
     * The total number of accounts
     */
    noOfAccounts?: number;
};

