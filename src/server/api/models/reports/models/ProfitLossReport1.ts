/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

export type ProfitLossReport1 = {
    currency: string;
    income?: number;
    incomeTarget?: number;
    expense?: number;
    expenseTarget?: number;
    netIncome?: number;
    netIncomeTarget?: number;
    incomeChange?: number;
    expenseChange?: number;
    netIncomeChange?: number;
    incomeEntryCount?: number;
    expenseEntryCount?: number;
    valueDate: LocalDate;
};

