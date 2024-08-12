/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a ledger record.
 */
export type LedgerRequest = {
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The id of the investment account
     */
    accountId: UUID;
    /**
     * The date that the position was created
     */
    journalDate: LocalDate;
    /**
     * The transaction quantity
     */
    quantity: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction price
     */
    price: number;
    /**
     * The transaction source
     */
    source: string;
    /**
     * The transaction notes
     */
    notes?: string | null;
};

