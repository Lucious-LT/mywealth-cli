/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { PaymentTransactionType } from './PaymentTransactionType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a payment transaction record.
 */
export type PaymentRequest = {
    /**
     * The narration on the transaction
     */
    label: string;
    /**
     * The notes on the transaction
     */
    notes: string;
    /**
     * The ID of the bank account used for processing the bill
     */
    accountId: UUID;
    /**
     * The ID of the branch
     */
    branchId: UUID;
    /**
     * The ID of the policy. This is required if the transaction is a policy payment
     */
    policyId?: UUID | null;
    /**
     * The ID of the claim. This is required if the transaction is a claim payment
     */
    claimId?: UUID | null;
    /**
     * The transaction type
     */
    transactionType: PaymentTransactionType;
    /**
     * The due date for the request
     */
    dueDate?: LocalDate | null;
    /**
     * The start or effective date of the request
     */
    transactionDate: LocalDate;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The bill currency
     */
    currency: string;
};

