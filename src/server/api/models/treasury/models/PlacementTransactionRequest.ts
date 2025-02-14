/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterestBasis } from './InterestBasis';
import type { InterestRateType } from './InterestRateType';
import type { LocalDate } from './LocalDate';
import type { PlacementCategory } from './PlacementCategory';
import type { PlacementInterestFrequency } from './PlacementInterestFrequency';
import type { PlacementRolloverRule } from './PlacementRolloverRule';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a placement transaction request.
 */
export type PlacementTransactionRequest = {
    /**
     * The asset category
     */
    category: PlacementCategory;
    /**
     * The rollover rule
     */
    rolloverRule: PlacementRolloverRule;
    /**
     * The treasury account ID
     */
    treasuryAccountId: UUID;
    /**
     * The counter party ID
     */
    counterPartyId: UUID;
    /**
     * The transaction label
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The face value amount
     */
    principal: number;
    /**
     * The coupon frequency
     */
    interestFrequency: PlacementInterestFrequency;
    /**
     * The interest basis
     */
    interestBasis: InterestBasis;
    /**
     * The interest type
     */
    interestType: InterestRateType;
    /**
     * The start date
     */
    startDate: LocalDate;
    /**
     * The tenor
     */
    tenor: number;
    /**
     * The custody rate
     */
    custodyFeeRate?: number | null;
    /**
     * The transaction rate
     */
    transactionFeeRate?: number | null;
    /**
     * The transaction fixed charge
     */
    fixedCharge?: number | null;
    /**
     * The interest rate
     */
    interestRate?: number;
    /**
     * The withholding tax rate
     */
    withHoldingTaxRate?: number | null;
    /**
     * The contract #
     */
    contractNo?: string | null;
    /**
     * The reference transaction code. This is usually a code generated by an upstream or used for uploading records
     */
    refCode?: string | null;
    /**
     * The position transfer date is used to indicate that the asset record was migrated from another system and accruals before this date will not be posted
     */
    positionTransferDate?: LocalDate | null;
    /**
     * The auto approve flag is used to indicate that the transaction should be approved automatically
     */
    autoApprove?: boolean;
};

