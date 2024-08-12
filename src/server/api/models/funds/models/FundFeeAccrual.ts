/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundFeeAccrualStatus } from './FundFeeAccrualStatus';
import type { FundFeeType } from './FundFeeType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type FundFeeAccrual = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The amount accrued for the day
     */
    accruedAmount: number;
    /**
     * The total amount accrued since inception
     */
    feeLiability: number;
    /**
     * The status of the accrual
     */
    status: FundFeeAccrualStatus;
    /**
     * The accrual date
     */
    accrualDate: LocalDate;
    /**
     * The journal ID used to post the accrual
     */
    journalId?: UUID | null;
    /**
     * The fund ID
     */
    fundId: UUID;
    /**
     * The fund code
     */
    fundCode: string;
    /**
     * The fund label
     */
    fundLabel: string;
    /**
     * The fee ID
     */
    feeId: UUID;
    /**
     * The fee label
     */
    feeLabel: string;
    /**
     * The fee code
     */
    feeType: FundFeeType;
    /**
     * The fee code
     */
    feeCode: string;
    /**
     * The valuation report ID
     */
    endOfDayReportId: UUID;
};

