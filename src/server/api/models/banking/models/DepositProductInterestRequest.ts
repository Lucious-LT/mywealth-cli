/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CalcFrequency } from './CalcFrequency';
import type { DepositProductBalanceType } from './DepositProductBalanceType';
import type { DepositProductInterestRateType } from './DepositProductInterestRateType';
import type { DepositProductInterestSlabRequest } from './DepositProductInterestSlabRequest';
import type { DepositProductInterestStatus } from './DepositProductInterestStatus';
import type { DepositProductInterestType } from './DepositProductInterestType';
import type { InterestBasis } from './InterestBasis';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an interest model record.
 */
export type DepositProductInterestRequest = {
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
    status: DepositProductInterestStatus;
    /**
     * The type of model
     */
    rateType: DepositProductInterestRateType;
    /**
     * Indicates the day count convention. This has to be specified for products that pay interest
     */
    interestBasis: InterestBasis;
    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    balanceType: DepositProductBalanceType;
    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    paymentFrequency: CalcFrequency;
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
    /**
     * The current index rate for interest calculations. This is updated based on the specified frequency
     */
    currentIndexRate?: number | null;
    /**
     * The interest calculation method
     */
    interestType: DepositProductInterestType;
    /**
     * The slab entries
     */
    interestSlabs: Array<DepositProductInterestSlabRequest>;
};

