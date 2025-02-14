/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsuranceProductType } from './InsuranceProductType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { PaymentStatus } from './PaymentStatus';
import type { PaymentTransactionType } from './PaymentTransactionType';
import type { PolicyPaymentTerms } from './PolicyPaymentTerms';
import type { UUID } from './UUID';

export type Payment = {
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
     * The journal ID used to process the payment
     */
    journalId?: UUID | null;
    /**
     * The transaction reference
     */
    reference: string;
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
     * A unique schedule code generated by the system
     */
    code: string;
    /**
     * The type of the transaction
     */
    transactionType: PaymentTransactionType;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction description
     */
    label: string;
    /**
     * The transaction notes
     */
    notes: string;
    /**
     * The status of the transaction
     */
    status: PaymentStatus;
    /**
     * The due date
     */
    dueDate?: LocalDate | null;
    /**
     * The transaction date
     */
    transactionDate: LocalDate;
    /**
     * The ID of the branch that processed the transaction
     */
    branchId: UUID;
    /**
     * The account id used for processing the transaction
     */
    accountId: UUID;
    /**
     * The account label used for processing the transaction
     */
    accountLabel: string;
    /**
     * The account number used for processing the transaction
     */
    accountNo: string;
    /**
     * The policy id used for processing the transaction
     */
    policyId?: UUID | null;
    /**
     * The policy label used for processing the transaction
     */
    policyLabel?: string | null;
    /**
     * The policy number used for processing the transaction
     */
    policyNo?: string | null;
    /**
     * The type of product associated with the payment - AUTO, LIFE, HEALTH, HOME, etc.
     */
    productType?: InsuranceProductType | null;
    /**
     * The payment terms - MONTHLY, QUARTERLY, etc.
     */
    paymentTerms?: PolicyPaymentTerms | null;
    /**
     * The claim id used for processing the transaction
     */
    claimId?: UUID | null;
    /**
     * The claim label used for processing the transaction
     */
    claimLabel?: string | null;
    /**
     * The claim number used for processing the transaction
     */
    claimNo?: string | null;
};

