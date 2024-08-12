/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The slab entries
 */
export type WithHoldingTaxSlabRequest = {
    /**
     * The ID of the slab
     */
    slabId?: string;
    /**
     * The starting value
     */
    startingValue: number;
    /**
     * The ending value
     */
    endingValue: number;
    /**
     * The slab rate for tax calculation
     */
    rate: number;
    /**
     * The fixed amount
     */
    fixedAmount: number;
    /**
     * The minimum tax amount
     */
    minAmount: number;
    /**
     * The maximum tax amount
     */
    maxAmount: number;
};

