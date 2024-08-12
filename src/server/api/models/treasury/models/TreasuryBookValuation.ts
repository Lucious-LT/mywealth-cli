/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * An end of day valuation record for a treasury book
 */
export type TreasuryBookValuation = {
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
     * The valuation date
     */
    valuationDate: LocalDate;
    /**
     * The value of book assets.
     */
    bookValue: number;
    /**
     * The income from book assets for the day.
     */
    bookIncome: number;
    /**
     * The value of equity assets.
     */
    equityValue: number;
    /**
     * The income from equity assets for the day.
     */
    equityIncome: number;
    /**
     * The value of real estate assets.
     */
    realEstateValue: number;
    /**
     * The value of commodity assets.
     */
    commodityValue: number;
    /**
     * The value of crypto assets.
     */
    cryptoValue: number;
    /**
     * The value of derivative assets.
     */
    derivativeValue: number;
    /**
     * The value of unclassified assets.
     */
    othersValue: number;
    /**
     * The income from real estate assets for the day.
     */
    realEstateIncome: number;
    /**
     * The income from commodity assets for the day.
     */
    commodityIncome: number;
    /**
     * The income from crypto assets for the day.
     */
    cryptoIncome: number;
    /**
     * The income from derivative assets for the day.
     */
    derivativeIncome: number;
    /**
     * The income from other unclassified assets for the day.
     */
    othersIncome: number;
    /**
     * The value of fixed income assets.
     */
    fixedIncomeValue: number;
    /**
     * The income from fixed income assets for the day.
     */
    fixedIncomeIncome: number;
    /**
     * The value of money market assets.
     */
    moneyMarketValue: number;
    /**
     * The income from money market assets for the day.
     */
    moneyMarketIncome: number;
    /**
     * The value of placement assets.
     */
    placementValue: number;
    /**
     * The income from placement assets for the day.
     */
    placementIncome: number;
    /**
     * The total cash balance for the day.
     */
    cashBalance: number;
    /**
     * The book gross asset value for the day.
     */
    grossAssetValue: number;
    /**
     * The book gross income for the day.
     */
    grossIncome: number;
    /**
     * The book ID
     */
    treasuryBookId: UUID;
    /**
     * The book code
     */
    treasuryBookCode: string;
    /**
     * The book label
     */
    treasuryBookLabel: string;
    treasuryBookPercentage?: number;
    realEstatePercentage?: number;
    commodityPercentage?: number;
    cryptoPercentage?: number;
    derivativePercentage?: number;
    othersPercentage?: number;
    fixedIncomePercentage?: number;
    moneyMarketPercentage?: number;
    placementPercentage?: number;
    equityPercentage?: number;
    cashPercentage?: number;
};

