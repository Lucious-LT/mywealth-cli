/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { ProfitLossAccount } from './ProfitLossAccount';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an income statement report.
 */
export type ProfitLossReport = {
    /**
     * The company ID
     */
    companyId: UUID;
    /**
     * An optional branch ID. If this is specified only income and expenses posted with this branch code will be included in the report.
     */
    branchId?: UUID | null;
    /**
     * The company code
     */
    companyCode: string;
    /**
     * A text value that describes the company
     */
    companyLabel: string;
    /**
     * The statement currency
     */
    currency: string;
    /**
     * The total income
     */
    totalIncome: number;
    /**
     * The total expense
     */
    totalExpense: number;
    /**
     * The net income
     */
    netIncome: number;
    /**
     * The start date of the report
     */
    startDate: LocalDate;
    /**
     * The end date of the report
     */
    endDate: LocalDate;
    /**
     * The accounts included in the income statement report
     */
    accounts: Array<ProfitLossAccount>;
};

