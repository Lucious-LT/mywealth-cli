/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { TrialBalanceAccount } from './TrialBalanceAccount';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a trial balance report.
 */
export type TrialBalanceReport = {
    /**
     * The company ID
     */
    companyId: UUID;
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
     * The opening balance
     */
    openingBal: number;
    /**
     * The closing balance
     */
    closingBal: number;
    /**
     * The credit change / movement
     */
    creditMovement: number;
    /**
     * The debit change / movement
     */
    debitMovement: number;
    /**
     * The net change
     */
    netChange: number;
    /**
     * The start date of the report
     */
    startDate: LocalDate;
    /**
     * The end date of the report
     */
    endDate: LocalDate;
    /**
     * The accounts included in the trial balance report
     */
    accounts: Array<TrialBalanceAccount>;
};

