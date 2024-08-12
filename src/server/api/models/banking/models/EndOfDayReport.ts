/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReportItem } from './EndOfDayReportItem';

/**
 * A JSON blob representing an end of day report.
 */
export type EndOfDayReport = {
    /**
     * The report ID
     */
    id: number;
    /**
     * The report tenant
     */
    tenant: string;
    /**
     * The report business date
     */
    batchDate: string;
    /**
     * The status of the end of day balance update process
     */
    endOfDayBalanceStatus: string;
    /**
     * The status of the end of day interest accrual process
     */
    interestAccrualStatus: string;
    /**
     * The status of the end of day interest posting process
     */
    interestPostingStatus: string;
    /**
     * The status of the end of day loan performance analysis process
     */
    loanPerformanceStatus: string;
    /**
     * The list of products and their details from the report
     */
    reportItems: Array<EndOfDayReportItem>;
};

