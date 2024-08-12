/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing an interest model record.
 */
export type LoanProductInterestSlabRequest = {
    /**
     * The ID of the slab
     */
    slabId?: UUID | null;
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

