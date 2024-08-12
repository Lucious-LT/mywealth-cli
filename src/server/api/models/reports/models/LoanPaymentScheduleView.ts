/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';

export type LoanPaymentScheduleView = {
    code: string;
    principal?: number;
    interest?: number;
    taxes?: number;
    fees?: number;
    penalty?: number;
    total?: number;
    minimumDue?: number;
    balance?: number;
    dueDate: LocalDate;
    startDate: LocalDate;
    daysInCycle?: number;
    status: string;
};

