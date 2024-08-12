/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JournalEntryRequest } from './JournalEntryRequest';
import type { JournalSource } from './JournalSource';
import type { JournalType } from './JournalType';
import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a journal request.
 */
export type JournalRequest = {
    /**
     * The journal currency
     */
    currency: string;
    /**
     * The journal description
     */
    label: string;
    /**
     * Notes related to the journal
     */
    notes?: string | null;
    /**
     * The type of journal
     */
    type: JournalType;
    /**
     * Indicates if this is a system or manual journal
     */
    source: JournalSource;
    /**
     * The value date for the journal
     */
    valueDate: LocalDate;
    /**
     * The transaction date for the journal
     */
    tranDate: LocalDate;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * The journal entries
     */
    journalEntry: Array<JournalEntryRequest>;
};

