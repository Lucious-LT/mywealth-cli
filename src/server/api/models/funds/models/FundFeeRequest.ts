/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundFeeApplyTo } from './FundFeeApplyTo';
import type { FundFeeStatus } from './FundFeeStatus';
import type { FundFeeType } from './FundFeeType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an fund fee record.
 */
export type FundFeeRequest = {
    /**
     * The fund fee code
     */
    code: string;
    /**
     * The fund fee label
     */
    label: string;
    /**
     * The GL account used to process the fee expense
     */
    expenseGlAccountId: UUID;
    /**
     * The GL account used to accrue the fee liability
     */
    payableGlAccountId: UUID;
    /**
     * The status of the fund fee
     */
    status: FundFeeStatus;
    /**
     * The type of fund fee
     */
    feeType: FundFeeType;
    /**
     * The part of the fund that the fee should apply to
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

