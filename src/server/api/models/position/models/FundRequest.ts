/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundType } from './FundType';
import type { InstrumentStatus } from './InstrumentStatus';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type FundRequest = {
    /**
     * The market ID for this fund
     */
    marketId: UUID;
    /**
     * The date the fund was created
     */
    issueDate: LocalDate;
    /**
     * The unique security identifier for the fund.
     */
    secId: string;
    /**
     * The number of days it takes to settle the trade
     */
    settlementDays: number;
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
     * The logo for the fund. This should be a base64 encoded string
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
     * The url to the image for the fund
     */
    imageUrl?: string | null;
    /**
     * The international security identification number for the fund.
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
     * The instrument currency
     */
    currency: string;
    /**
     * The instrument price
     */
    price: number;
    /**
     * The par value of the instrument. This is typically 1 for fund
     */
    parValue: number;
    /**
     * The current yield for money market funds
     */
    yield: number;
    /**
     * The current yield for money market funds
     */
    bidPrice: number;
    /**
     * The current yield for money market funds
     */
    offerPrice: number;
    /**
     *
     * The price conversion ratio applicable to the instrument. This is typically 10 for bonds.
     *
     */
    priceConvRatio: number;
    /**
     * The issued quantity.
     */
    issuedQty: number;
    fundType: FundType;
};

