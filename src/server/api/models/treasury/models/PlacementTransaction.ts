/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterestBasis } from './InterestBasis';
import type { InterestRateType } from './InterestRateType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { PlacementCategory } from './PlacementCategory';
import type { PlacementInterestFrequency } from './PlacementInterestFrequency';
import type { PlacementRolloverRule } from './PlacementRolloverRule';
import type { PlacementStatus } from './PlacementStatus';
import type { PlacementTransactionTranche } from './PlacementTransactionTranche';
import type { UUID } from './UUID';

export type PlacementTransaction = {
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
     * The reference code in an upstream system
     */
    refCode: string;
    /**
     * The asset category
     */
    category: PlacementCategory;
    /**
     * The rollover rule
     */
    rolloverRule: PlacementRolloverRule;
    /**
     * The custody fee rate
     */
    custodyFeeRate?: number | null;
    /**
     * The transaction fee rate
     */
    transactionFeeRate?: number | null;
    /**
     * The transaction fixed charge
     */
    fixedCharge?: number | null;
    /**
     * The interest rate
     */
    interestRate: number;
    /**
     * The withholding tax rate
     */
    withHoldingTaxRate?: number | null;
    /**
     * A unique transaction code
     */
    code: string;
    /**
     * The transaction's description
     */
    label: string;
    /**
     * The contract #
     */
    contractNo?: string | null;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The status of the transaction
     */
    status: PlacementStatus;
    /**
     * The interest frequency
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
     * The maturity date
     */
    maturityDate: LocalDate;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The face value amount
     */
    principal: number;
    /**
     * The total fee amount
     */
    totalFees: number;
    /**
     * The total transaction amount
     */
    totalAmount: number;
    /**
     * The expected interest amount
     */
    expectedInterest: number;
    /**
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    /**
     * The journal ID used to start the transaction
     */
    startingJournalId?: UUID | null;
    /**
     * The date the transaction was terminated
     */
    terminationDate?: LocalDate | null;
    /**
     * The journal ID used to process the termination
     */
    terminationJournalId?: UUID | null;
    /**
     * Tranche of all additions and withdrawals for the transaction
     */
    transactionTranches: Array<PlacementTransactionTranche>;
    /**
     * The position transfer date is used to indicate that the asset record was migrated from another system and accruals before this date will not be posted
     */
    positionTransferDate?: LocalDate | null;
    /**
     * The treasury account ID
     */
    treasuryAccountId: UUID;
    /**
     * The treasury account code
     */
    treasuryAccountCode: string;
    /**
     * The treasury account label
     */
    treasuryAccountLabel: string;
    /**
     * The treasury book ID
     */
    treasuryBookId: UUID;
    /**
     * The treasury book code
     */
    treasuryBookCode: string;
    /**
     * The treasury book label
     */
    treasuryBookLabel: string;
    /**
     * The counter party ID
     */
    counterPartyId: UUID;
    /**
     * The counter party code
     */
    counterPartyCode: string;
    /**
     * The counter party label
     */
    counterPartyLabel: string;
    principalBalance?: number;
    effectiveRate?: number;
};

