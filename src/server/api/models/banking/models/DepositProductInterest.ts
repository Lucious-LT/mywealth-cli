/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CalcFrequency } from './CalcFrequency';
import type { DepositProductBalanceType } from './DepositProductBalanceType';
import type { DepositProductInterestRateType } from './DepositProductInterestRateType';
import type { DepositProductInterestSlab } from './DepositProductInterestSlab';
import type { DepositProductInterestStatus } from './DepositProductInterestStatus';
import type { DepositProductInterestType } from './DepositProductInterestType';
import type { InterestBasis } from './InterestBasis';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type DepositProductInterest = {
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
     * A unique model code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The interest model description
     */
    label: string;
    /**
     * The status of the interest model
     */
    status: DepositProductInterestStatus;
    /**
     * The source of the interest rate
     */
    rateType: DepositProductInterestRateType;
    /**
     * The interest calculation method
     */
    interestType: DepositProductInterestType;
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
    interestSlabs: Array<DepositProductInterestSlab>;
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
};

