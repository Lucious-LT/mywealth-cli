/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BalanceSheetAccount } from './BalanceSheetAccount';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an income statement report.
 */
export type BalanceSheetReport = {
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
     * The total assets
     */
    totalAssets: number;
    /**
     * The total liability
     */
    totalLiability: number;
    /**
     * The total equity
     */
    totalEquity: number;
    /**
     * The value date of the report
     */
    valueDate: LocalDate;
    /**
     * The accounts included in the income statement report
     */
    accounts: Array<BalanceSheetAccount>;
};

