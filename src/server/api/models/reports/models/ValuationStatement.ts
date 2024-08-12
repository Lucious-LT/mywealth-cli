/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientView } from './ClientView';
import type { DepositAccountView } from './DepositAccountView';
import type { InsuranceAccountView } from './InsuranceAccountView';
import type { InvestmentAccountPositionView } from './InvestmentAccountPositionView';
import type { InvestmentAccountView } from './InvestmentAccountView';
import type { LoanAccountView } from './LoanAccountView';
import type { LocalDate } from './LocalDate';

export type ValuationStatement = {
    client: ClientView;
    depositAccounts: Array<DepositAccountView>;
    loanAccounts: Array<LoanAccountView>;
    insuranceAccounts: Array<InsuranceAccountView>;
    investmentAccounts: Array<InvestmentAccountView>;
    topHoldings: Array<InvestmentAccountPositionView>;
    currency: string;
    startDate: LocalDate;
    endDate: LocalDate;
    totalCashBalance?: number;
    totalHeldAmount?: number;
    totalPositionBalance?: number;
    totalPositionCost?: number;
    currentAccountValue?: number;
    previousAccountValue?: number;
    changesFromLastPeriod?: number;
    totalInflows?: number;
    totalOutflows?: number;
    totalFees?: number;
};

