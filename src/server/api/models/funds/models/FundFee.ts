/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundFeeApplyTo } from './FundFeeApplyTo';
import type { FundFeeStatus } from './FundFeeStatus';
import type { FundFeeType } from './FundFeeType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type FundFee = {
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
     * The GL account ID used to process the fee expense
     */
    expenseGlAccountId: UUID;
    /**
     * The GL account label used to process the fee expense
     */
    expenseGlAccountLabel: string;
    /**
     * The GL account code used to process the fee expense
     */
    expenseGlAccountCode: string;
    /**
     * The GL account ID used to accrue the fee liability
     */
    payableGlAccountId: UUID;
    /**
     * The GL account label used to accrue the fee liability
     */
    payableGlAccountLabel: string;
    /**
     * The GL account code used to accrue the fee liability
     */
    payableGlAccountCode: string;
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
    status: FundFeeStatus;
    /**
     * The type of fee
     */
    feeType: FundFeeType;
    /**
     * The part of the loan that the fee should apply to
     */
    applyTo: FundFeeApplyTo;
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
};

