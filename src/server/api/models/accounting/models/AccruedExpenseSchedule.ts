/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccruedExpenseScheduleStatus } from './AccruedExpenseScheduleStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type AccruedExpenseSchedule = {
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
     * The scheduled amount
     */
    amount: number;
    /**
     * The balance after this schedule is processed.
     */
    balance: number;
    /**
     * The scheduled date
     */
    scheduledDate: LocalDate;
    /**
     * The status of the scheduled payment
     */
    status: AccruedExpenseScheduleStatus;
    /**
     * The journal id that was used to process this schedule.
     */
    journalId?: UUID | null;
};

