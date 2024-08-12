/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvestmentAccountPositionView } from './InvestmentAccountPositionView';

export type InvestmentAccountView = {
    accountType: string;
    productType: string;
    productCode: string;
    productLabel: string;
    accountNo: string;
    accountLabel: string;
    status: string;
    currency: string;
    startingCashBalance?: number;
    endingCashBalance?: number;
    beginningCost?: number;
    endingCost?: number;
    beginningValue?: number;
    endingValue?: number;
    gainLoss?: number;
    gainLossPercent?: number;
    cashInflowReportPeriod?: number;
    cashOutflowReportPeriod?: number;
    securitiesBoughtReportPeriod?: number;
    securitiesSoldReportPeriod?: number;
    dividendsAndOtherIncomeReportPeriod?: number;
    transactionCostAndFeesReportPeriod?: number;
    taxesReportPeriod?: number;
    cashInflowYearToDate?: number;
    cashOutflowYearToDate?: number;
    securitiesBoughtYearToDate?: number;
    securitiesSoldYearToDate?: number;
    dividendsAndOtherIncomeYearToDate?: number;
    transactionCostAndFeesYearToDate?: number;
    taxesYearToDate?: number;
    notes?: string | null;
    refCode: string;
    branch: string;
    positions: Array<InvestmentAccountPositionView>;
};

