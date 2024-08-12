/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a market record.
 */
export type MarketRequest = {
    /**
     * The market identifier
     */
    marketCode: string;
    /**
     * The market description
     */
    description: string;
    /**
     * The country
     */
    country: string;
};

