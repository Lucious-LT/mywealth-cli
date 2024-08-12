/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentType } from './InstrumentType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a position instrument report for an account.
 */
export type PositionInstrumentView = {
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The type of the instrument
     */
    instrumentType: InstrumentType;
    /**
     * The instrument label
     */
    secId: string;
    /**
     * The instrument description
     */
    secDesc: string;
    /**
     * The description of the security
     */
    secNotes?: string | null;
    /**
     * The international security identification number for the instrument.
     */
    isin?: string | null;
    /**
     * The market code of the instrument
     */
    marketCode: string;
    /**
     *
     * The currency of the position. This is the currency of the instrument and not the report.
     * It is used to calculate the current value, total cost, WAC, etc of the position.
     *
     */
    instrumentCurrency: string;
    /**
     *
     * This is typically 1 but if the instrument/position is denominated in a different currency from the report,
     * the currency rate will be used to convert the position value to the report currency.
     * The rate used will be the rate on the value date of the report (positionDate).
     * If no rates are maintained for the value date, the last maintained rate prior to the report date will be used.
     * If the system does not find a valid rate, it will return an error.
     *
     */
    currencyRate: number;
    /**
     *
     * The current price of the instrument.This will be returned in the currency of the report.
     * For bonds this will be the clean price.
     *
     */
    currentPrice: number;
    /**
     *
     * The price conversion ratio applicable to the instrument. This is typically 1 for equities and 10 for bonds.
     *
     */
    priceConvRatio: number;
    /**
     * The par value of the instrument. This is typically 1 for equity and 1000 for bonds.
     */
    parValue: number;
    /**
     *
     * The position quantity. For bonds this will be the number of bond units. For equities this will be the number of shares.
     * To get the face value for a bond, multiply the quantity by the conversion ratio.
     *
     */
    quantity: number;
    /**
     * The weighted average cost per unit. This will be returned in the currency of the report.
     */
    avgCost: number;
    /**
     * The total cost based on the WAC. This will be returned in the currency of the report.
     */
    totalCost: number;
    /**
     * The current value of the position. This will be returned in the currency of the report.
     */
    currentValue: number;
    /**
     * The date that the first position was opened.
     */
    positionStartDate: LocalDate;
};

