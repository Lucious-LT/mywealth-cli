/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CalcFrequency } from './CalcFrequency';
import type { InterestBasis } from './InterestBasis';
import type { LoanProductInterestBalanceType } from './LoanProductInterestBalanceType';
import type { LoanProductInterestRateType } from './LoanProductInterestRateType';
import type { LoanProductInterestSlab } from './LoanProductInterestSlab';
import type { LoanProductInterestStatus } from './LoanProductInterestStatus';
import type { LoanProductInterestType } from './LoanProductInterestType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type LoanProductInterest = {
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
     * The interest model description
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The status of the interest model
     */
    status: LoanProductInterestStatus;
    /**
     * The source of the rate
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
     * The minimum balance required for interest to be calculated
     */
    minBalance: number;
    /**
     * The maximum rate for interest calculations
     */
    maxRate: number;
    /**
     * Indicates the day count convention
     */
    interestBasis: InterestBasis;
    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    balanceType: LoanProductInterestBalanceType;
    /**
     * The interest calculation method
     */
    interestType: LoanProductInterestType;
    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    paymentFrequency: CalcFrequency;
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
    interestSlabs: Array<LoanProductInterestSlab>;
};

