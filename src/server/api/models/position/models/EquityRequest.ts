/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentStatus } from './InstrumentStatus';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type EquityRequest = {
    /**
     * The market ID for this equity
     */
    marketId: UUID;
    /**
     * The date the equity was issued
     */
    issueDate: LocalDate;
    /**
     * The unique security identifier for the equity.
     */
    secId: string;
    /**
     * The number of days it takes to settle the trade
     */
    settlementDays: number;
    /**
     * The long margin requirement
     */
    longMarginReq: number;
    /**
     * The short margin requirement
     */
    shortMarginReq: number;
    /**
     * The minimum order quantity.
     */
    minOrderQuantity: number;
    /**
     * The maximum order quantity.
     */
    maxOrderQuantity: number;
    /**
     * The order size multiple.
     */
    orderSizeStep: number;
    /**
     * The logo for the equity. This should be a base64 encoded string
     */
    logo?: string | null;
    /**
     * The logo file name
     */
    logoFileName?: string | null;
    /**
     * The logo filename.
     */
    logoMimeType?: string | null;
    /**
     * Indicates if fractional share orders are allowed
     */
    allowFractions: boolean;
    /**
     * Indicates if this equity can be bought on margin
     */
    allowMargin: boolean;
    /**
     * The sub sector that the equity belongs to.
     */
    classificationId?: UUID | null;
    /**
     * The url to the image for the equity
     */
    imageUrl?: string | null;
    /**
     * The international security identification number for the equity.
     */
    isin?: string | null;
    /**
     * The name of the security
     */
    secDesc: string;
    /**
     * The description of the security
     */
    secNotes?: string | null;
    /**
     * The status of the instrument
     */
    status: InstrumentStatus;
    /**
     * Specifies if you can short the instrument. The default is false
     */
    allowShorts: boolean;
    /**
     * The instrument currency
     */
    currency: string;
    /**
     * The instrument price
     */
    price: number;
    /**
     * The par value of the instrument. This is typically 1 for equity
     */
    parValue: number;
    /**
     *
     * The price conversion ratio applicable to the instrument. This is typically 10 for bonds.
     *
     */
    priceConvRatio: number;
};

