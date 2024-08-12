/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fixed income sale request.
 */
export type FixedIncomeTerminationRequest = {
    /**
     * The transaction ID
     */
    transactionId: UUID;
    /**
     * The face value amount
     */
    faceValue: number;
    /**
     * The termination date
     */
    tradeDate: LocalDate;
    /**
     * The settlement days
     */
    settlementDays: number;
    /**
     * The clean price
     */
    cleanPrice: number;
};

