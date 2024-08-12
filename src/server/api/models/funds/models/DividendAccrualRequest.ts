/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

/**
 * A JSON blob representing a dividend distribution request record.
 */
export type DividendAccrualRequest = {
    fundCode: string;
    accountCode: string;
    accrualDate: LocalDate;
    principal?: number;
    accruedAmount?: number;
};

