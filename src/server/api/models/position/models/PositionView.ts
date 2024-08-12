/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { PositionInstrumentView } from './PositionInstrumentView';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a position summary report for an account.
 */
export type PositionView = {
    /**
     * The id of the portfolio
     */
    accountId: UUID;
    /**
     * The label of the portfolio
     */
    accountLabel: string;
    /**
     * The date of the position report
     */
    positionDate: LocalDate;
    /**
     * The currency of the report
     */
    reportCurrency: string;
    /**
     * The current value of the portfolio
     */
    totalValue: number;
    /**
     * The current value of the portfolio
     */
    totalCost: number;
    /**
     * The instruments held
     */
    positionInstruments: Array<PositionInstrumentView>;
    /**
     * The portfolio gain
     */
    gainLoss: number;
    /**
     * The  portfolio percentage gain
     */
    gainLossPercent: number;
};

