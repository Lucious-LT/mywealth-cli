/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanAccountDisbursementStatus } from './LoanAccountDisbursementStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { SubAccountType } from './SubAccountType';
import type { UUID } from './UUID';

export type LoanAccountDisbursement = {
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
     * The journal ID used to process the disbursement
     */
    journalId?: UUID | null;
    /**
     * The ID of the deposit account used to process the disbursement. This is optional but if specified, it has to be a deposit account ID that belongs to the client that owns the loan account.This deposit account has to be active, in the same currency as the loan and a have positive balance.
     */
    depositAccountId?: UUID | null;
    /**
     * The deposit account number used to process the disbursement
     */
    depositAccountNo?: string | null;
    /**
     * The deposit account label used to process the disbursement
     */
    depositAccountLabel?: string | null;
    /**
     * A unique disbursement code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The disbursement description
     */
    label: string;
    /**
     * The status of the disbursement
     */
    status: LoanAccountDisbursementStatus;
    /**
     * The disbursed principal
     */
    principal: number;
    /**
     * The total deducted taxes.
     */
    deductedTaxes: number;
    /**
     * The total deducted fees
     */
    deductedFees: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The date that the funds are scheduled to be disbursed. This is also the value date for the transaction.
     */
    date: LocalDate;
    productType: string;
    accountType: SubAccountType;
    productId: UUID;
    transactionSourceId: UUID;
    productLabel: string;
    productCode: string;
    clientId: UUID;
    clientLabel: string;
    clientCode: string;
    loanAccountId: UUID;
    loanAccountNo: string;
    loanAccountLabel: string;
    totalPrincipalAmount: number;
    interestRate: number;
    loanStartDate: LocalDate;
    expectedMaturity: LocalDate | null;
};

