/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { PlacementStatus } from './PlacementStatus';
import type { PlacementTransactionTrancheType } from './PlacementTransactionTrancheType';
import type { UUID } from './UUID';

export type PlacementTransactionTranche = {
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
     * The interest rate
     */
    interestRate: number;
    /**
     * The contract #
     */
    contractNo?: string | null;
    /**
     * The status of the transaction
     */
    status: PlacementStatus;
    /**
     * The transaction type
     */
    transactionType: PlacementTransactionTrancheType;
    /**
     * The start date
     */
    startDate: LocalDate;
    /**
     * The face value amount
     */
    principal: number;
    /**
     * The journal ID used to process the transaction
     */
    journalId?: UUID | null;
    /**
     * The total fee amount
     */
    totalFees: number;
    /**
     * The total transaction amount
     */
    totalAmount: number;
    transactionId: UUID;
};

