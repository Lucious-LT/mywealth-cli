/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineExposureType } from './CreditLineExposureType';
import type { CreditLineStatus } from './CreditLineStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type CreditLine = {
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
     * The client ID from the crm service
     */
    clientId: UUID;
    /**
     * The client description
     */
    clientLabel: string;
    /**
     * The client code from CRM
     */
    clientCode: string;
    /**
     * A unique code generated by the system
     */
    code: string;
    /**
     * The credit currency
     */
    currency: string;
    /**
     * The maximum exposure amount
     */
    maxExposure: number;
    /**
     * The maximum exposure amount
     */
    usedAmount: number;
    /**
     * The arrangement description
     */
    label: string;
    /**
     * The description of the credit facility
     */
    notes?: string | null;
    /**
     * The start date of the arrangement. Loans can only be disbursed or overdraft accounts activated after this date.
     */
    startDate: LocalDate;
    /**
     * The end date of the arrangement. Loans can only be disbursed if the expected maturity is before this end date.
     */
    endDate: LocalDate;
    /**
     * The date that the credit arrangement was approved.
     */
    approvalDate?: LocalDate | null;
    /**
     * The date that the credit arrangement was rejected.
     */
    rejectionDate?: LocalDate | null;
    /**
     * The date that the credit arrangement was closed.
     */
    closeDate?: LocalDate | null;
    /**
     * The status of the credit arrangement
     */
    status: CreditLineStatus;
    /**
     * The type of the account
     */
    exposureType: CreditLineExposureType;
    /**
     * The available exposure
     */
    availableExposure?: number;
};

