/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReportItem } from './EndOfDayReportItem';

/**
 * A JSON blob representing an end of day report. The fields marked with an * means that they are required.
 */
export type EndOfDayReport = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * Indicates when the record was created.
     */
    createdAt: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * Indicates when the record was last modified.
     */
    updatedAt: string;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The report date
     */
    reportDate: string;
    /**
     * The report tenant
     */
    reportTenant: string;
    /**
     * The status of the cash balance update
     */
    cashBalanceUpdateStatus: EndOfDayReport.cashBalanceUpdateStatus;
    /**
     * The status of the daily valuation of all investment accounts
     */
    accountValuationStatus: EndOfDayReport.accountValuationStatus;
    /**
     * The status of the daily accrual for all fixed deposit investments
     */
    fixedDepositAccrualStatus: EndOfDayReport.fixedDepositAccrualStatus;
    /**
     * The status of the daily accrual for all money market investments
     */
    moneyMarketAccrualStatus: EndOfDayReport.moneyMarketAccrualStatus;
    /**
     * The list of products and their details from the report
     */
    reportItems: Array<EndOfDayReportItem>;
};

export namespace EndOfDayReport {

    /**
     * The status of the cash balance update
     */
    export enum cashBalanceUpdateStatus {
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }

    /**
     * The status of the daily valuation of all investment accounts
     */
    export enum accountValuationStatus {
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }

    /**
     * The status of the daily accrual for all fixed deposit investments
     */
    export enum fixedDepositAccrualStatus {
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }

    /**
     * The status of the daily accrual for all money market investments
     */
    export enum moneyMarketAccrualStatus {
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }


}

