/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * An end of day valuation report for a fund
 */
export type FundValuation = {
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
     * The value of fund assets.
     */
    fundValue: number;
    /**
     * The income from fund assets for the day.
     */
    fundIncome: number;
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
     * The total cash inflow for the day.
     */
    cashInflow: number;
    /**
     * The total cash outflow for the day.
     */
    cashOutflow: number;
    /**
     * The accrued management fees for the valuation date.
     */
    accruedMgmtFee: number;
    /**
     * The total management fee liability from the GL on T-1.
     */
    mgmtFeeLiability: number;
    /**
     * The total miscellaneous fee liability from the GL on T. This is derived from the sum of balances in all sub accounts mapped to the fund config misc liability header on T.
     */
    miscLiability: number;
    /**
     * The total miscellaneous asset balance from the GL on T. This is derived from the sum of balances in all sub accounts mapped to the fund config misc asset header on T.
     */
    miscAsset: number;
    /**
     * The total miscellaneous income from the sum of movement in all sub accounts mapped to the fund config misc income header on T.
     */
    miscIncome: number;
    /**
     * The total miscellaneous expense from the sum of movement in all sub accounts mapped to the fund config misc expense header on T.
     */
    miscExpense: number;
    /**
     * The fund gross asset value for the day.
     */
    grossAssetValue: number;
    /**
     * The fund net asset value for the day.
     */
    netAssetValue: number;
    /**
     * The fund gross income for the day.
     */
    grossIncome: number;
    /**
     * The fund net income for the day.
     */
    netIncome: number;
    /**
     * The fund yield for the day.
     */
    yield: number;
    /**
     * The fund dividend distribution yield for the day. This is typically the same as the fund yield except for products that use a static dividend yield.
     */
    dividendYield: number;
    /**
     * The dividend distribution for the day.
     */
    accruedDividend: number;
    /**
     * The total number of units outstanding.
     */
    unitsOutstanding: number;
    /**
     * The bid price for the day
     */
    bidPrice: number;
    /**
     * The offer price for the day
     */
    offerPrice: number;
    /**
     * The journal ID used to accrue the dividend expense during valuation
     */
    dividendExpenseJournalId?: UUID | null;
    /**
     * The fund ID
     */
    fundId: UUID;
    /**
     * The fund code
     */
    fundCode: string;
    /**
     * The fund label
     */
    fundLabel: string;
    fundPercentage?: number;
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
    misAssetPercentage?: number;
    totalFeeLiability?: number;
};

