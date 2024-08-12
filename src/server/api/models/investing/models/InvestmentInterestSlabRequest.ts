/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The slab entries
 */
export type InvestmentInterestSlabRequest = {
    /**
     * The ID of the slab
     */
    slabId?: string;
    /**
     * The starting balance
     */
    startingBalance: number;
    /**
     * The ending balance
     */
    endingBalance: number;
    /**
     * The slab rate for interest calculations
     */
    rate: number;
};

