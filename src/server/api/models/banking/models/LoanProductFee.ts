/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanProductFeeApplyTo } from './LoanProductFeeApplyTo';
import type { LoanProductFeeLatePaymentCalc } from './LoanProductFeeLatePaymentCalc';
import type { LoanProductFeeStatus } from './LoanProductFeeStatus';
import type { LoanProductFeeType } from './LoanProductFeeType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type LoanProductFee = {
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
     * The GL account ID used to process the fee income
     */
    incomeGlAccountId: UUID;
    /**
     * The GL account label used to process the fee income
     */
    incomeGlAccountLabel: string;
    /**
     * The GL account code used to process the fee income
     */
    incomeGlAccountCode: string;
    /**
     * The GL account ID used to process the fee income
     */
    receivableGlAccountId: UUID;
    /**
     * The GL account label used to process the fee income
     */
    receivableGlAccountLabel: string;
    /**
     * The GL account code used to process the fee income
     */
    receivableGlAccountCode: string;
    /**
     * A unique fee code
     */
    code: string;
    /**
     * The fee description
     */
    label: string;
    /**
     * The status of the fee
     */
    status: LoanProductFeeStatus;
    /**
     * The type of fee
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

