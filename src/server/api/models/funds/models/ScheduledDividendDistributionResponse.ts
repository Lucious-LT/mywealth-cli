/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a dividend distribution response record.
 */
export type ScheduledDividendDistributionResponse = {
    distributionDate?: LocalDate | null;
    amount?: number;
    currency: string;
    message: string;
};

