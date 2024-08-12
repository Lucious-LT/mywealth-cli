/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

export type LoanProductInterestSlab = {
    id?: UUID | null;
    /**
     * The starting balance
     */
    startingBalance: number;
    /**
     * The ending balance
     */
    endingBalance: number;
    /**
     * The interest rate
     */
    rate: number;
};

