/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CalcFrequency } from './CalcFrequency';
import type { InterestBasis } from './InterestBasis';
import type { LoanProductInterestBalanceType } from './LoanProductInterestBalanceType';
import type { LoanProductInterestRateType } from './LoanProductInterestRateType';
import type { LoanProductInterestSlabRequest } from './LoanProductInterestSlabRequest';
import type { LoanProductInterestStatus } from './LoanProductInterestStatus';
import type { LoanProductInterestType } from './LoanProductInterestType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an interest model record.
 */
export type LoanProductInterestRequest = {
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The interest model label
     */
    label: string;
    /**
     * The status of the model
     */
    status: LoanProductInterestStatus;
    /**
     * Indicates the day count convention. This has to be specified for products that pay interest
     */
    interestBasis: InterestBasis;
    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    balanceType: LoanProductInterestBalanceType;
    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    paymentFrequency: CalcFrequency;
    /**
     * The type of model
     */
    rateType: LoanProductInterestRateType;
    /**
     * The default rate for interest calculations
     */
    defaultRate: number;
    /**
     * The minimum rate for interest calculations
     */
    minRate: number;
    /**
     * The maximum rate for interest calculations
     */
    maxRate: number;
    /**
     * The minimum balance required for interest to be calculated
     */
    minBalance: number;
    /**
     * The reference rate instrument from the treasury module
     */
    indexRateId?: UUID | null;
    /**
     * Indicates the frequency at which the index rate will be updated for the product.This has to be specified for products that use index rates.
     */
    indexUpdateFrequency?: CalcFrequency | null;
    currentIndexRate?: number | null;
    /**
     * The interest calculation method
     */
    interestType: LoanProductInterestType;
    /**
     * The slab entries
     */
    interestSlabs: Array<LoanProductInterestSlabRequest>;
};

