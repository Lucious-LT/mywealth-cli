/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanProductFeeApplyTo } from './LoanProductFeeApplyTo';
import type { LoanProductFeeLatePaymentCalc } from './LoanProductFeeLatePaymentCalc';
import type { LoanProductFeeStatus } from './LoanProductFeeStatus';
import type { LoanProductFeeType } from './LoanProductFeeType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an loan fee record.
 */
export type LoanProductFeeRequest = {
    /**
     * The loan fee code
     */
    code: string;
    /**
     * The loan fee label
     */
    label: string;
    /**
     * The GL account used to process the fee income
     */
    incomeGlAccountId: UUID;
    /**
     * The GL account used to process the fee receivable
     */
    receivableGlAccountId: UUID;
    /**
     * The status of the loan fee
     */
    status: LoanProductFeeStatus;
    /**
     * The type of loan fee
     */
    feeType: LoanProductFeeType;
    /**
     * The part of the loan that the fee should apply to
     */
    applyTo: LoanProductFeeApplyTo;
    /**
     * The fee currency
     */
    currency: string;
    /**
     * The flat rate
     */
    flatRate: number;
    /**
     * The percentage rate. This combined with the flat rate to determine total fee amount
     */
    percentageRate: number;
    /**
     * The number of grace days allowed for a scheduled payment before the late payment penalty is applied
     */
    graceDays: number;
    /**
     * The method used to calculate late payment penalties
     */
    latePaymentCalc?: LoanProductFeeLatePaymentCalc | null;
};

