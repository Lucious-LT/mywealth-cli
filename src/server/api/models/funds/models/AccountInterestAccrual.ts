/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing an interest accrual response for an account and date.
 */
export type AccountInterestAccrual = {
    /**
     * The account ID
     */
    accountId: UUID;
    /**
     * The report date
     */
    reportDate: string;
    /**
     * The accrued amount
     */
    amount: number;
};

