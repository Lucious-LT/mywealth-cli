/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Money } from './Money';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a journal record.
 */
export type JournalEntryResponse = {
    /**
     * An optional sub account or product identifier. This will typically be an ID for a portfolio, bank account, insurance account, etc. Note that this subAccountId is used to track the activity and balance for the underlying product account and can only be specified when the account entry is created.
     */
    subAccountId: UUID;
    /**
     * The debit amount
     */
    balance: Money;
};

