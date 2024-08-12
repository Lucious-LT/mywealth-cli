/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricDetails } from './MetricDetails';
import type { RevenueVsExpense } from './RevenueVsExpense';
import type { TransactionDemographics } from './TransactionDemographics';
import type { TransactionDetails } from './TransactionDetails';

export type TransactionAnalyticsDashboard = {
    transactions: TransactionDetails;
    newAccounts: MetricDetails;
    revenue: MetricDetails;
    expense: MetricDetails;
    revenueVsExpense: RevenueVsExpense;
    newVsReturning: TransactionDemographics;
    gender: TransactionDemographics;
    age: TransactionDemographics;
    maritalStatus: TransactionDemographics;
};

