/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';

export type RecentTransaction = {
    transactionTime: LocalDateTime;
    transactionType: string;
    transactionAmount?: number;
    transactionCurrency: string;
    transactionDescription: string;
    transactionAccount: string;
};

