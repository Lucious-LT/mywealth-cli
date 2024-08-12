/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The slab entries
 */
export type CommissionSlabRequest = {
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
     * The slab rate for commission calculation
     */
    rate: number;
};

