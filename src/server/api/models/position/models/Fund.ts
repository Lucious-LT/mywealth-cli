/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundType } from './FundType';
import type { InstrumentStatus } from './InstrumentStatus';
import type { InstrumentType } from './InstrumentType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Fund = {
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
     * The date the instrument was issued
     */
    issueDate: LocalDate;
    /**
     * The unique security identifier for the instrument in the market where it is traded.
     */
    secId: string | null;
    /**
     * The international security identification number for the instrument.
     */
    isin?: string | null;
    /**
     * The description of the security
     */
    secDesc: string;
    /**
     * The description of the security
     */
    secNotes?: string | null;
    /**
     * The url to the image for the instrument
     */
    imageUrl?: string | null;
    /**
     * The number of days it takes to settle trades
     */
    settlementDays: number;
    /**
     * The status of the instrument
     */
    status: InstrumentStatus;
    /**
     * The type of the instrument
     */
    type: InstrumentType;
    /**
     * Specifies if you can short the instrument. The default is false
     */
    allowShorts: boolean;
    /**
     * The logo for the equity.
     */
    logo?: Blob | null;
    /**
     * The logo file name
     */
    logoFileName?: string | null;
    /**
     * The logo filename.
     */
    logoMimeType?: string | null;
    /**
     * The instrument price
     */
    price: number;
    /**
     * The instrument currency
     */
    currency: string;
    /**
     * The par value of the instrument. This is typically 1 for equity and 1000 for bonds.
     */
    parValue: number;
    /**
     *
     * The price conversion ratio applicable to the instrument. This is typically 1 for equity and 10 for bonds.
     *
     */
    priceConvRatio: number;
    marketId: UUID;
    marketCode: string;
    /**
     * The minimum order quantity.
     */
    minOrderQuantity: number;
    /**
     * The current yield for money market funds
     */
    yield: number;
    /**
     * The current bid price. This is updated after fund valuation.
     */
    bidPrice: number;
    /**
     * The current offer price. This is updated after fund valuation.
     */
    offerPrice: number;
    /**
     * The current number of issued units
     */
    issuedQty: number;
    /**
     * The maximum order quantity.
     */
    maxOrderQuantity: number;
    /**
     * The order size multiple.
     */
    orderSizeStep: number;
    /**
     * Indicates if fractional unit orders are allowed
     */
    allowFractions: boolean;
    /**
     * The type of fund
     */
    fundType: FundType;
};

