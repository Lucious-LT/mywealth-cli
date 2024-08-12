/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillSchedulePaymentFrequency } from './BillSchedulePaymentFrequency';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a bill pay schedule record.
 */
export type BillScheduleRequest = {
    /**
     * The bill pay schedule label
     */
    label: string;
    /**
     * The ID of the bank account used for processing the bill
     */
    accountId: UUID;
    /**
     * The ID of the biller
     */
    billerId: UUID;
    /**
     * The payment frequency
     */
    paymentFrequency: BillSchedulePaymentFrequency;
    /**
     * The start or effective date of the request
     */
    startDate: LocalDate;
    /**
     * The bill amount
     */
    billAmount: number;
    /**
     * The bill currency
     */
    currency: string;
    /**
     * Indicates if the request should be auto approved
     */
    autoApprove: boolean;
};

