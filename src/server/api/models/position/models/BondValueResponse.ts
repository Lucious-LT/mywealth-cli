/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

export type BondValueResponse = {
    accruedCoupon?: number;
    settlementDate: LocalDate;
    dirtyPrice?: number;
    cleanPrice?: number;
    yieldToMaturity?: number;
    lastCouponDate?: LocalDate | null;
    nextCouponDate: LocalDate;
    couponDays?: number;
    accruedDays?: number;
    cashflowAmount: Array<number>;
    cashflowDate: Array<string>;
};

