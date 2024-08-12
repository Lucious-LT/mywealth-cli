/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a position summary report for an instrument.
 */
export type PositionDetailView = {
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The id of the investment account
     */
    accountId: UUID;
    /**
     *
     * The quantity of held by the client in the account.
     *
     */
    quantity: number;
    /**
     * The report date
     */
    journalDate: LocalDate;
};

