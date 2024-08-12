/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an end of day request. The fields marked with an * means that they are required.
 */
export type EndOfDayRequest = {
    /**
     * The start date
     */
    startDate: string;
    /**
     * The start date
     */
    endDate: string;
    /**
     * Holds the tenant configuration
     */
    tenant?: string;
    /**
     * The start time
     */
    startTime?: string;
    /**
     * The end time
     */
    endTime?: string;
};

