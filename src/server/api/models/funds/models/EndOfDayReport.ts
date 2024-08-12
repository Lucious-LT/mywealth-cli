/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReportStatus } from './EndOfDayReportStatus';
import type { EndOfDaySummary } from './EndOfDaySummary';
import type { FundAsset } from './FundAsset';
import type { FundFeeAccrual } from './FundFeeAccrual';
import type { FundValuation } from './FundValuation';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * An end of day report for the funds module
 */
export type EndOfDayReport = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    tenant: string;
    /**
     * The report business date
     */
    valuationDate: LocalDate;
    /**
     * The status of the end of day processing for placement positions
     */
    placementAccrualStatus: EndOfDayReportStatus;
    /**
     * The status of the end of day processing for fixed income positions
     */
    fixedIncomeAccrualStatus: EndOfDayReportStatus;
    /**
     * The status of the end of day processing for money market positions
     */
    moneyMarketAccrualStatus: EndOfDayReportStatus;
    /**
     * The status of income / loss processing for dynamic asset value positions
     */
    dynAssetValueIncomeStatus: EndOfDayReportStatus;
    /**
     * The status of the fee accrual booking
     */
    fundFeeAccrualStatus: EndOfDayReportStatus;
    /**
     * The status of the fund valuation computation
     */
    fundValuationStatus: EndOfDayReportStatus;
    /**
     * The status of the dividend accrual booking for money market funds
     */
    dividendAccrualStatus: EndOfDayReportStatus;
    /**
     * The list of products and their details from the report
     */
    fundAssets: Array<FundAsset>;
    /**
     * The list of valuation records for the report
     */
    fundValuation: Array<FundValuation>;
    /**
     * The list of fee records from the report
     */
    fundFees: Array<FundFeeAccrual>;
    reportItemsSummary: Array<EndOfDaySummary>;
};

