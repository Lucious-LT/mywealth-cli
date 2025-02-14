/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AmortizationFrequency } from './AmortizationFrequency';
import type { AmortizationStatus } from './AmortizationStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { PrePaymentSchedule } from './PrePaymentSchedule';
import type { UUID } from './UUID';

export type PrePayment = {
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
     * The amortization status
     */
    status: AmortizationStatus;
    /**
     * The transaction date ie when the asset was created or purchased. Note that if the effective date is after the start date, the system assumes that this is a transferred schedule and will not post the initial transfer entry.
     */
    effectiveDate: LocalDate;
    /**
     * The amortization start date. This should be equal to or greater than the effective date.
     */
    startDate: LocalDate;
    /**
     * The amortization end date. This should be after the start date
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
    schedule: Array<PrePaymentSchedule>;
    /**
     * The record label
     */
    label: string;
    /**
     * The journal id that was used to create the prepayment
     */
    journalId?: UUID | null;
    /**
     * The transaction source account
     */
    transactionSourceAccountId: UUID;
    /**
     * The transaction asset account
     */
    assetAccountId: UUID;
    /**
     * The transaction expense account
     */
    expenseAccountId: UUID;
};

