/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a position summary report for an instrument.
 */
export type PositionSummaryView = {
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The type of the instrument
     */
    instrumentType: string;
    /**
     * The instrument label
     */
    secId: string;
    /**
     * The instrument description
     */
    secDesc: string;
    /**
     *
     * The total quantity of the instrument held in all the accounts.
     *
     */
    quantity: number;
    /**
     * The journal date
     */
    journalDate: LocalDate;
};

