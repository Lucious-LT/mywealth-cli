/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a currency rate record.
 */
export type CurrencyRateRequest = {
    /**
     * The date from which the rate is valid
     */
    validFrom: LocalDate;
    /**
     * The base currency
     */
    baseCurrency: string;
    /**
     * The quote currency
     */
    quoteCurrency: string;
    /**
     * The rate for converting from base to quote
     */
    rate: number;
};

