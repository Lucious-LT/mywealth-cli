/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type AccountBalanceReport = {
    id: UUID;
    code: string;
    currency: string;
    label: string;
    type: string;
    balance?: number;
    lastTranDate: LocalDate;
    valueDate: LocalDate;
};

