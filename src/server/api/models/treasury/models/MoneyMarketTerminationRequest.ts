/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a discounted instrument termination request.
 */
export type MoneyMarketTerminationRequest = {
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
    terminationDate: LocalDate;
    /**
     * The discount rate
     */
    discountRate: number;
};

