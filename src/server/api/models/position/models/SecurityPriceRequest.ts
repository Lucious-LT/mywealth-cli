/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentType } from './InstrumentType';
import type { LocalDate } from './LocalDate';

export type SecurityPriceRequest = {
    /**
     * The market ID for price record
     */
    marketCode: string;
    /**
     * The unique security identifier for the fund.
     */
    secId: string;
    /**
     * The date the fund was created
     */
    tradeDate: LocalDate;
    /**
     * The previous trading session closing price.
     */
    prevClosePx: number;
    /**
     * The trading session opening price..
     */
    openPx: number;
    /**
     * The trading session highest price
     */
    highPx: number;
    /**
     * The trading session lowest price.
     */
    lowPx: number;
    /**
     * The trading session closing price.
     */
    closePx: number;
    /**
     * The trading session reference price.
     */
    refPx: number;
    /**
     * The trading session average price.
     */
    avgPx: number;
    /**
     * The volume traded.
     */
    volTraded: number;
    /**
     * The value traded.
     */
    valTraded: number;
    /**
     * The value traded.
     */
    transCount: number;
    /**
     * The type of the instrument
     */
    instrumentType: InstrumentType;
};

