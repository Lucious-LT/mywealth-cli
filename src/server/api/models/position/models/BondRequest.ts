/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BondCouponDateGeneration } from './BondCouponDateGeneration';
import type { BondCouponFrequency } from './BondCouponFrequency';
import type { BondCouponType } from './BondCouponType';
import type { BondIssuerClassification } from './BondIssuerClassification';
import type { BondRiskClassification } from './BondRiskClassification';
import type { InstrumentStatus } from './InstrumentStatus';
import type { InterestBasis } from './InterestBasis';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type BondRequest = {
    /**
     * The maturity date of the bond
     */
    maturityDate: LocalDate;
    /**
     * The coupon rate specified on an annualized basis.
     */
    couponRate: number;
    /**
     * The issuers full name
     */
    issuersFullName: string;
    /**
     * The market ID for this bond
     */
    marketId: UUID;
    /**
     * The date the bond was issued
     */
    issueDate: LocalDate;
    /**
     * The unique security identifier for the bond.
     */
    secId: string;
    /**
     * The number of days it takes to settle the trade
     */
    settlementDays: number;
    /**
     * The minimum order value.
     */
    minOrderValue: number;
    /**
     * The maximum order value.
     */
    maxOrderValue: number;
    /**
     * The order size multiple.
     */
    orderSizeStep: number;
    /**
     * The logo for the bond. This should be a base64 encoded string
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
     * The url to the image for the bond
     */
    imageUrl?: string | null;
    /**
     * The international security identification number for the bond.
     */
    isin?: string | null;
    /**
     * The name of the bond
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
     * The par value of the instrument. This is typically 1000 for bonds.
     */
    parValue: number;
    /**
     *
     * The price conversion ratio applicable to the instrument. This is typically 10 for bonds.
     *
     */
    priceConvRatio: number;
    /**
     * The classification of the issuer
     */
    issuerClassification: BondIssuerClassification;
    /**
     * The classification of the risk
     */
    riskClassification?: BondRiskClassification | null;
    /**
     * The coupon frequency of the bond
     */
    couponFrequency: BondCouponFrequency;
    /**
     * The coupon type of the bond
     */
    couponType: BondCouponType;
    /**
     * The coupon date generation
     */
    couponDateGeneration: BondCouponDateGeneration;
    /**
     * The coupon interest basis
     */
    couponInterestBasis: InterestBasis;
};

