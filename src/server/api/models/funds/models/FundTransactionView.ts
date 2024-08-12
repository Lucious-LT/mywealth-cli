/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundTransactionStatus } from './FundTransactionStatus';
import type { FundTransactionType } from './FundTransactionType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fund transaction record.
 */
export type FundTransactionView = {
    accountId: UUID;
    orderType: FundTransactionType;
    secId: string;
    requestedQty?: number;
    requestedVal?: number;
    price?: number;
    requestDate: LocalDate;
    currency: string;
    orderStatus: FundTransactionStatus;
    orderNo: string;
};

