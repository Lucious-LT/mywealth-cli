/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlSubAccountType } from './GlSubAccountType';
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
     * An optional entry number. This must be unique for every journal.
     */
    refCode?: string | null;
    /**
     * An optional sub account or product identifier. This will typically be an ID for a portfolio, bank account, insurance account, etc. This subAccountId is used to track the activity and balance for the underlying product account and can only be specified when the account entry is created.
     */
    subAccountId?: UUID | null;
    /**
     * An optional sub account type. This must be specified if a sub account is attached to the journal entry and is used to validate the sub account ID.
     */
    subAccountType?: GlSubAccountType | null;
    /**
     * An optional sub account label resolved using the subAccountId.
     */
    subAccountLabel?: string | null;
    /**
     * An optional sub account code resolved using the subAccountId.
     */
    subAccountCode?: string | null;
    /**
     * An optional branch identifier. This is used to track the balance sheet, cost and expenses for ledger entries related to accounts that are mapped to the branch.
     */
    branchId?: UUID | null;
    /**
     * The debit amount
     */
    debit: number;
    /**
     * The credit amount
     */
    credit: number;
    accountId: UUID;
    accountCode: string;
    accountLabel: string;
};

