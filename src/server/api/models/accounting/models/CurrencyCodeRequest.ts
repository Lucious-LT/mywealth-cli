/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a currency rate record.
 */
export type CurrencyCodeRequest = {
    /**
     * Indicates if this is an active currency
     */
    active: boolean;
    /**
     * The currency code
     */
    code: string;
    /**
     * The currency label
     */
    label: string;
};

