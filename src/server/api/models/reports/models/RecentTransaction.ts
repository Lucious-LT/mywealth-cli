/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';

export type RecentTransaction = {
    time: LocalDateTime;
    type: string;
    amount?: number;
    currency: string;
    description: string;
    account: string;
};

