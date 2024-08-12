/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a dividend distribution response record.
 */
export type DividendDistributionResponse = {
    distributionId?: UUID | null;
    distributionDate?: LocalDate | null;
    amount?: number;
    currency: string;
};

