/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a loan tranche.
 */
export type LoanAccountTrancheRequest = {
    /**
     * The ID of the tranche
     */
    trancheId?: UUID | null;
    /**
     * The principal amount
     */
    amount: number;
    /**
     * The anticipated date for the disbursement.
     */
    date: LocalDate;
    /**
     * Notes related to the disbursement
     */
    notes: string;
};

