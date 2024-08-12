/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanPaymentScheduleView } from './LoanPaymentScheduleView';
import type { LocalDate } from './LocalDate';

export type LoanAccountView = {
    accountType: string;
    productType: string;
    productCode: string;
    productLabel: string;
    accountNo: string;
    accountLabel: string;
    status: string;
    currency: string;
    notes?: string | null;
    refCode: string;
    branch: string;
    loanType: string;
    interestRate?: number;
    principalAmount?: number;
    balloonAmount?: number;
    disbursementDate: LocalDate;
    paymentFrequency: string;
    paymentDay?: number;
    tenor?: number;
    loanPaymentSchedule: Array<LoanPaymentScheduleView>;
    totalFees?: number;
    upfrontFees?: number;
    amortizedFees?: number;
    capitalizedFees?: number;
    totalTaxes?: number;
    upfrontTaxes?: number;
    amortizedTaxes?: number;
    totalInterest?: number;
    loanStatus: string;
    beginningValue?: number;
    endingValue?: number;
};

