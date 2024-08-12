/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WithHoldingTaxSlab = {
    id?: string;
    /**
     * The starting value
     */
    startingValue: number;
    /**
     * The ending value
     */
    endingValue: number;
    /**
     * The tax rate
     */
    rate: number;
    /**
     * The fixed amount
     */
    fixedAmount: number;
    /**
     * The minimum fee amount
     */
    minAmount: number;
    /**
     * The maximum fee amount
     */
    maxAmount: number;
};

