/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';

export type EndOfDayRequest = {
    /**
     * The request start date
     */
    startDate: LocalDate;
    /**
     * The request end date
     */
    endDate: LocalDate;
    /**
     * Holds the tenant configuration.
     */
    tenant?: string | null;
    /**
     * Holds start time.
     */
    startTime?: LocalDateTime | null;
    /**
     * Holds the end time.
     */
    endTime?: LocalDateTime | null;
};

