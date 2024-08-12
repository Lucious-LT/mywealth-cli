/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubAccountType } from './SubAccountType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a journal record.
 */
export type JournalEntryView = {
    /**
     * The entry id
     */
    entryId?: UUID | null;
    /**
     * The entry description
     */
    label: string;
    /**
     * The accountId
     */
    accountId: UUID;
    /**
     * The branchId
     */
    branchId: UUID | null;
    /**
     * An optional sub account or product identifier. This will typically be an ID for a portfolio, bank account, insurance account, etc. Note that this subAccountId is used to track the activity and balance for the underlying product account and can only be specified when the account entry is created.
     */
    subAccountId?: UUID | null;
    /**
     * An optional sub account label. This is usually resolved using the subAccountId
     */
    subAccountLabel?: string | null;
    /**
     * An optional sub account type. This must be specified if a sub account is attached to the journal entry and is used to validate the sub account ID.
     */
    subAccountType?: SubAccountType | null;
    /**
     * The debit amount
     */
    debit: number;
    /**
     * The credit amount
     */
    credit: number;
};

