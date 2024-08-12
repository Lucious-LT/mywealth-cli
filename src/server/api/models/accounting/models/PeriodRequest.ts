/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { PeriodStatus } from './PeriodStatus';

/**
 * A JSON blob representing a financial period record.
 */
export type PeriodRequest = {
    /**
     * The current status of the period
     */
    status: PeriodStatus;
    /**
     * Notes on the period
     */
    notes: string;
    /**
     * The date that the period is closed. This cannot be a date in the future.
     */
    endDate: LocalDate;
};

