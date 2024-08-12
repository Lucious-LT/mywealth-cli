/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing an interest model record.
 */
export type PremiumConfigSlabRequest = {
    /**
     * The ID of the slab
     */
    slabId?: UUID | null;
    /**
     * The starting value
     */
    startingValue: number;
    /**
     * The ending value
     */
    endingValue: number;
    /**
     * The slab rate for premium calculations
     */
    rate: number;
};

