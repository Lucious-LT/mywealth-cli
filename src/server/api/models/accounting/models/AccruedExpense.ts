/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccruedExpenseSchedule } from './AccruedExpenseSchedule';
import type { AmortizationFrequency } from './AmortizationFrequency';
import type { AmortizationStatus } from './AmortizationStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type AccruedExpense = {
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
     * A unique transaction code generated by the system
     */
    code: string;
    /**
     * A reference used to post the journals
     */
    reference: string;
    /**
     * The amortization frequency
     */
    frequency: AmortizationFrequency;
    /**
     * The transaction date ie when the asset was created or purchased. Note that if the effective date is after the start date, the system assumes that this is a transferred schedule and will not post the initial transfer entry.
     */
    effectiveDate: LocalDate;
    /**
     * The amortization status
     */
    status: AmortizationStatus;
    /**
     * The amortization start date.
     */
    startDate: LocalDate;
    /**
     * The amortization end date.
     */
    endDate: LocalDate;
    /**
     * Notes related to the schedule
     */
    notes?: string | null;
    /**
     * The transaction currency.
     */
    currency: string;
    /**
     * The amount to be amortized
     */
    amount: number;
    /**
     * The amount that has been amortized
     */
    accrued: number;
    schedule: Array<AccruedExpenseSchedule>;
    /**
     * The record label
     */
    label: string;
    /**
     * The transaction liability account
     */
    liabilityAccountId: UUID;
    /**
     * The transaction expense account
     */
    expenseAccountId: UUID;
};

