/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountBalanceReport } from './AccountBalanceReport';
import type { BalanceSheetReport1 } from './BalanceSheetReport1';
import type { ProfitLossReport1 } from './ProfitLossReport1';
import type { RevenueSummary } from './RevenueSummary';

export type FinancialPerformanceDashboard = {
    revenue: RevenueSummary;
    balanceSheet: BalanceSheetReport1;
    profitLoss: ProfitLossReport1;
    accountBalances: Array<AccountBalanceReport>;
};

