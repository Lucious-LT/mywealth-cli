/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BudgetDetails } from './BudgetDetails';
import type { BudgetDistribution } from './BudgetDistribution';
import type { ProfitLossDetail } from './ProfitLossDetail';
import type { TransactionDistribution } from './TransactionDistribution';
import type { TransactionSummary } from './TransactionSummary';

export type TransactionActivityDashboard = {
    clientTotal?: number;
    clientActive?: number;
    productTotal?: number;
    productActive?: number;
    transactionTotal?: number;
    transactionScheduled?: number;
    caseTotal?: number;
    caseActive?: number;
    transactionSummary: TransactionSummary;
    transactionDistribution: TransactionDistribution;
    budgetDistribution: BudgetDistribution;
    budgetDetails: BudgetDetails;
    weeklyExpenses: ProfitLossDetail;
    monthlyExpenses: ProfitLossDetail;
    yearlyExpenses: ProfitLossDetail;
};

