/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a journal record.
 */
export type JournalEntryRequest = {
    /**
     * The entry ID
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
     * The quantity. Debits will have a negative value.
     */
    quantity: number;
    /**
     * The price used for the ledger entry
     */
    price: number;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
};

