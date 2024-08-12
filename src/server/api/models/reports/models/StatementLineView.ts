/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a statement line record.
 */
export type StatementLineView = {
    /**
     * The transaction date
     */
    tranDate: LocalDate;
    /**
     * The value date
     */
    valueDate: LocalDate;
    /**
     * The entry description
     */
    label: string;
    /**
     * The reference number
     */
    refNo: string | null;
    /**
     * The transaction type
     */
    entryType: string | null;
    /**
     * The debit amount
     */
    debit: number;
    /**
     * The credit amount
     */
    credit: number;
    /**
     * The balance
     */
    balance: number;
};

