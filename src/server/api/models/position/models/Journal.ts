/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentType } from './InstrumentType';
import type { JournalEntry } from './JournalEntry';
import type { JournalStatus } from './JournalStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Journal = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The type of the instrument
     */
    instrumentType: InstrumentType;
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The security Id of the instrument
     */
    secId: string;
    /**
     * The Market Id of the instrument
     */
    marketId: string;
    /**
     * A unique journal #
     */
    journalNo: string;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * The journal description
     */
    label: string;
    /**
     * Notes related to the journal
     */
    notes?: string | null;
    /**
     * The status of the journal
     */
    status: JournalStatus;
    /**
     * The value date for the journal
     */
    journalDate: LocalDate;
    journalEntry: Array<JournalEntry>;
};

