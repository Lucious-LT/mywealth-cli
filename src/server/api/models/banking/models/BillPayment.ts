/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillPaymentStatus } from './BillPaymentStatus';
import type { BillSchedule } from './BillSchedule';
import type { BillSchedulePaymentFrequency } from './BillSchedulePaymentFrequency';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type BillPayment = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The journal ID used to process the payment
     */
    journalId?: UUID | null;
    /**
     * The bill pay schedule
     */
    schedule: BillSchedule;
    /**
     * A unique payment code
     */
    code: string;
    /**
     * A reference label
     */
    label: string;
    /**
     * The start date
     */
    paymentDate: LocalDate;
    /**
     * The amount paid
     */
    paymentAmount: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The status of the payment
     */
    status: BillPaymentStatus;
    accountId: UUID;
    billerId: UUID;
    /**
     * The ID of the bill pay schedule
     */
    scheduleId: UUID;
    /**
     * The label of the bill pay schedule
     */
    scheduleLabel: string;
    paymentFrequency: BillSchedulePaymentFrequency;
    /**
     * The code of the bill pay schedule
     */
    scheduleCode: string;
};

