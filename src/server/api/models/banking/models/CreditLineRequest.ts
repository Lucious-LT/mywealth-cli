/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineExposureType } from './CreditLineExposureType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a credit arrangement record.
 */
export type CreditLineRequest = {
    /**
     * The client ID from CRM
     */
    clientId: UUID;
    /**
     * The credit arrangement label
     */
    label: string;
    /**
     * Notes on the credit arrangement
     */
    notes: string;
    /**
     * The credit arrangement currency
     */
    currency: string;
    /**
     * The maximum exposure amount
     */
    maxExposure: number;
    /**
     * The type of the credit arrangement
     */
    exposureType: CreditLineExposureType;
    /**
     * The start date of the arrangement. Loans can only be disbursed or overdraft accounts activated after this date.
     */
    startDate: LocalDate;
    /**
     * The end date of the arrangement. Loans can only be disbursed if the expected maturity is before this end date.
     */
    endDate: LocalDate;
};

