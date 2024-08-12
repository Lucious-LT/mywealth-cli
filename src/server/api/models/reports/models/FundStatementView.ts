/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundStatementLineView } from './FundStatementLineView';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a statement report for an fund and account.
 */
export type FundStatementView = {
    /**
     * The id of the client
     */
    clientId: UUID;
    /**
     * The client code
     */
    clientCode: string;
    /**
     * The label of the client
     */
    clientLabel: string;
    /**
     * The id of the account
     */
    accountId: UUID;
    /**
     * The account no
     */
    accountNo: string;
    /**
     * The label of the portfolio
     */
    accountLabel: string;
    instrumentId: UUID;
    secId: string;
    secDesc: string;
    marketCode: string;
    /**
     * The start date of the report
     */
    startDate: LocalDate;
    /**
     * The end date of the report
     */
    endDate: LocalDate;
    /**
     * The currency of the report
     */
    currency: string;
    /**
     * The opening balance
     */
    openingBalance?: number;
    /**
     * The total subscription
     */
    totalSubscription?: number;
    /**
     * The total redemption
     */
    totalRedemption?: number;
    /**
     * The total accrued interest
     */
    accruedInterest?: number;
    /**
     * The cash balance
     */
    cashBalance?: number;
    /**
     * The current unit balance
     */
    closingBalance?: number;
    /**
     * The current price for each fund unit
     */
    currentPrice?: number;
    /**
     * The value of the units held.
     */
    closingValue?: number;
    /**
     * The portfolio gain
     */
    gainLoss?: number;
    /**
     * The  portfolio percentage gain
     */
    gainLossPercent?: number;
    /**
     * The instruments held
     */
    statementLines: Array<FundStatementLineView>;
};

