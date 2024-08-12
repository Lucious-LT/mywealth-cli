/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a loan disbursement update request
 */
export type LoanAccountDisbursementRequest = {
    /**
     * The notes on the hold
     */
    notes?: string | null;
    /**
     * The ID of the deposit account used to process the disbursement. This is optional but if specified, it has to be a deposit account ID that belongs to the client that owns the loan account.This deposit account has to be active, in the same currency as the loan and a have positive balance.
     */
    depositAccountId?: UUID | null;
};

