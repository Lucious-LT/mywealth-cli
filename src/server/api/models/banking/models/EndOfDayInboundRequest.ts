/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

export type EndOfDayInboundRequest = {
    /**
     * The request start date
     */
    startDate: LocalDate;
    /**
     * The request end date
     */
    endDate: LocalDate;
};

