/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReportItem } from './EndOfDayReportItem';
import type { EndOfDayReportStatus } from './EndOfDayReportStatus';
import type { EndOfDaySummary } from './EndOfDaySummary';
import type { LocalDate } from './LocalDate';
import type { TreasuryBookValuation } from './TreasuryBookValuation';
import type { UUID } from './UUID';

/**
 * An end of day report for the treasury module
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
    batchDate: LocalDate;
    /**
     * The status of the end of day processing for placement positions
     */
    placementAccrual: EndOfDayReportStatus;
    /**
     * The status of the end of day processing for fixed income positions
     */
    fixedIncomeAccrual: EndOfDayReportStatus;
    /**
     * The status of the end of day processing for money market positions
     */
    moneyMarketAccrual: EndOfDayReportStatus;
    /**
     * The status of income / loss processing for dynamic asset lateinit  varue positions
     */
    dynAssetValueIncome: EndOfDayReportStatus;
    /**
     * The status of the fund valuation computation
     */
    bookValuationStatus: EndOfDayReportStatus;
    /**
     * The list of products and their details from the report
     */
    reportItems: Array<EndOfDayReportItem>;
    /**
     * The list of valuation records for the report
     */
    bookValuations: Array<TreasuryBookValuation>;
    reportItemsSummary: Array<EndOfDaySummary>;
};

