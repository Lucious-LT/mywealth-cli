/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentType } from './InstrumentType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type SecurityPrice = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The unique security identifier for the instrument in the market where it is traded.
     */
    secId: string;
    /**
     * The unique market ID
     */
    marketCode: string;
    /**
     * The trade date
     */
    tradeDate: LocalDate;
    /**
     * The previous trading session closing price.
     */
    prevClosePx: number;
    /**
     * The trading session opening price.
     */
    openPx: number;
    /**
     * The trading session highest price.
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
     * The trading session reference price. This is typically the previous session closing price
     */
    refPx: number;
    /**
     * The trading session average price.
     */
    avgPx: number;
    /**
     * The volume traded
     */
    volTraded: number;
    /**
     * The value traded
     */
    valTraded: number;
    /**
     * The number of transactions in the current trading session
     */
    transCount: number;
    /**
     * The type of the instrument
     */
    instrumentType: InstrumentType;
};

