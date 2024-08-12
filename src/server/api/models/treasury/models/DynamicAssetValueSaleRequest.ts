/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fixed income sale request.
 */
export type DynamicAssetValueSaleRequest = {
    /**
     * The transaction ID
     */
    transactionId: UUID;
    /**
     * The quantity to sell
     */
    quantity: number;
    /**
     * The termination date
     */
    tradeDate: LocalDate;
    /**
     * The settlement days
     */
    settlementDays: number;
    /**
     * The transaction price
     */
    price: number;
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
};

