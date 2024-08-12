/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JournalEntryView } from './JournalEntryView';
import type { JournalViewSource } from './JournalViewSource';
import type { JournalViewType } from './JournalViewType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a journal record.
 */
export type JournalView = {
    /**
     * The journal ID
     */
    id?: UUID | null;
    /**
     * A unique journal #
     */
    journalNo?: string | null;
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
    type: JournalViewType;
    /**
     * Indicates if this is a system or manual journal
     */
    source: JournalViewSource;
    /**
     * The value date for the journal
     */
    valueDate: LocalDate;
    /**
     * The transaction date for the journal
     */
    tranDate: LocalDate;
    /**
     * The journal entries
     */
    journalEntry: Array<JournalEntryView>;
};

