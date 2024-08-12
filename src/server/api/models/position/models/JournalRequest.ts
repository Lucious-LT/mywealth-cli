/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JournalEntryRequest } from './JournalEntryRequest';
import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a journal request.
 */
export type JournalRequest = {
    /**
     * The market ID of the instrument
     */
    marketId: string;
    /**
     * The security ID of the instrument
     */
    secId: string;
    /**
     * The journal description
     */
    label: string;
    /**
     * Notes related to the journal
     */
    notes?: string | null;
    /**
     * The value date for the journal
     */
    journalDate: LocalDate;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * The journal entries
     */
    journalEntry: Array<JournalEntryRequest>;
};

