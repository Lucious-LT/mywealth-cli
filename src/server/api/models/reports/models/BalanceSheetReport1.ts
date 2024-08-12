/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

export type BalanceSheetReport1 = {
    assets?: number;
    liability?: number;
    equity?: number;
    currency: string;
    valueDate: LocalDate;
};

