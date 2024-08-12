/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type JournalEntry = {
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
     * The entry description
     */
    label: string;
    /**
     * The id of the investment account
     */
    accountId: UUID;
    /**
     * An account code from the investment service.
     */
    accountNo: string;
    /**
     * An account label from the investment service.
     */
    accountLabel: string;
    /**
     * An optional entry number. This must be unique for every journal.
     */
    refCode?: string | null;
    /**
     * The debit amount
     */
    quantity: number;
    /**
     * The transaction price
     */
    price: number;
    /**
     * The transaction currency
     */
    currency: string;
};

