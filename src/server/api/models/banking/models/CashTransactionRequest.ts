/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CashTransactionType } from './CashTransactionType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a cash transaction record.
 */
export type CashTransactionRequest = {
    /**
     * The narration on the transaction
     */
    label: string;
    /**
     * The notes on the transaction
     */
    notes?: string | null;
    /**
     * The ID of the bank account used for processing the transaction
     */
    accountId: UUID;
    /**
     * The ID of the branch
     */
    branchId: UUID;
    /**
     * The ID of the teller
     */
    tellerId: UUID | null;
    /**
     * The transaction type
     */
    type: CashTransactionType;
    /**
     * The transaction date of the request
     */
    transDate: LocalDate;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction currency
     */
    currency: string;
};

