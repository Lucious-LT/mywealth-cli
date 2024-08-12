/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a loan payment update request
 */
export type LoanAccountPaymentRequest = {
    /**
     * The narration on the transaction
     */
    label: string;
    /**
     * The notes on the hold
     */
    notes?: string | null;
    /**
     * The ID of the loan account used to process the payment
     */
    loanAccountId: UUID;
    /**
     * The ID of the deposit account used to process the payment. This is optional but if specified, it has to be a deposit account ID that belongs to the client that owns the loan account.This deposit account has to be active, in the same currency as the loan and a have enough funds to cover the payment.
     */
    depositAccountId?: UUID | null;
    /**
     * The ID of a scheduled payment to be processed. This is optional but if specified, it has to be a scheduled payment ID that belongs to the loan account.
     */
    loanAccountScheduleId?: UUID | null;
    /**
     * The payment amount
     */
    paymentAmount: number;
    /**
     * The effective date of the request. This can be used to back date the transaction.
     */
    paymentDate: LocalDate;
    /**
     * The payment currency
     */
    currency: string;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
};

