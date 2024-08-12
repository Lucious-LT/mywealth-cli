/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a currency quote record.
 */
export type CurrencyQuote = {
    /**
     * The date from which the quote is valid
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
    /**
     * Indicates if this was an indirect quote
     */
    indirect: boolean;
};

