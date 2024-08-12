/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

export type PremiumConfigSlab = {
    id?: UUID | null;
    /**
     * The starting value
     */
    startingValue: number;
    /**
     * The ending value
     */
    endingValue: number;
    /**
     * The premium rate
     */
    rate: number;
};

