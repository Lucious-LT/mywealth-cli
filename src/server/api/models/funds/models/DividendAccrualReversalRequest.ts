/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a dividend distribution request record.
 */
export type DividendAccrualReversalRequest = {
    accountId: UUID;
    fundCode: string;
    accrualDate: LocalDate;
};

