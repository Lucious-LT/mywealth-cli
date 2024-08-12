/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { PlacementTransactionTrancheType } from './PlacementTransactionTrancheType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a placement transaction tranche request.
 */
export type PlacementTransactionTrancheRequest = {
    /**
     * The transaction ID
     */
    transactionId: UUID;
    /**
     * The face value amount
     */
    principal: number;
    /**
     * The start date
     */
    startDate: LocalDate;
    /**
     * The coupon rate
     */
    interestRate?: number;
    /**
     * The contract #
     */
    contractNo?: string | null;
    /**
     * The transaction type
     */
    transactionType: PlacementTransactionTrancheType;
};

