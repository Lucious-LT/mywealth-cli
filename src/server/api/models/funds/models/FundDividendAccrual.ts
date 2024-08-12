/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { MMFundDividendAccrualStatus } from './MMFundDividendAccrualStatus';
import type { UUID } from './UUID';

export type FundDividendAccrual = {
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
     * The investment account ID
     */
    accountId: UUID;
    /**
     * The dividend accrued
     */
    accruedDividend: number;
    /**
     * The outstanding principal amount
     */
    principal: number;
    /**
     * The status of the accrual
     */
    status: MMFundDividendAccrualStatus;
    /**
     * The accrual date
     */
    accrualDate: LocalDate;
    /**
     * The reference to the ID used to post the accrual when the dividend is distributed
     */
    dividendDistId?: UUID | null;
    /**
     * The fund ID
     */
    fundId: UUID;
    /**
     * The report ID
     */
    reportId: UUID;
};

