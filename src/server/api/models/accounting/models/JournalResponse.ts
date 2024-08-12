/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JournalEntryResponse } from './JournalEntryResponse';
import type { JournalSource } from './JournalSource';
import type { JournalStatus } from './JournalStatus';
import type { JournalType } from './JournalType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a journal record after it has been posted.
 */
export type JournalResponse = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * A unique journal #
     */
    journalNo: string;
    /**
     * The status of the journal
     */
    status: JournalStatus;
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
     * The journal entries
     */
    journalEntry: Array<JournalEntryResponse>;
};

