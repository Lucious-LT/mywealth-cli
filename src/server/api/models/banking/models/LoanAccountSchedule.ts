/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanAccountScheduleStatus } from './LoanAccountScheduleStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type LoanAccountSchedule = {
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
     * A unique schedule code
     */
    code: string;
    /**
     * The scheduled principal payment
     */
    principal: number;
    /**
     * The scheduled interest payment.
     */
    interest: number;
    /**
     * The scheduled tax payment.
     */
    taxes: number;
    /**
     * The scheduled fee payment
     */
    fees: number;
    /**
     * The scheduled penalty payment
     */
    penalty: number;
    /**
     * The total amount due.
     */
    total: number;
    /**
     * The minimum amount due.
     */
    minimumDue: number;
    /**
     * The balance after this schedule is processed.
     */
    balance: number;
    /**
     * The due date for the payment cycle
     */
    dueDate: LocalDate;
    /**
     * The start date for the payment cycle
     */
    startDate: LocalDate;
    /**
     * The number of days in the payment cycle
     */
    daysInCycle: number;
    /**
     * Indicates if this scheduled payment has been processed
     */
    paid: boolean;
    /**
     * The status of the schedule
     */
    status: LoanAccountScheduleStatus;
};

