/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsuranceAccountStatus } from './InsuranceAccountStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type InsuranceAccount = {
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
     * A unique account number
     */
    accountNo: string;
    /**
     * A account number generated by the insurance partner
     */
    refAccountNo?: string | null;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate: LocalDate;
    /**
     * A reference code for the account record in an upstream system
     */
    refCode: string;
    /**
     * The account description
     */
    accountLabel: string;
    /**
     * The account currency
     */
    currency: string;
    /**
     * The account balance
     */
    balance: number;
    /**
     * Indicates when the balance was updated.
     */
    balanceTime?: LocalDateTime | null;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The status of the account
     */
    status: InsuranceAccountStatus;
    branchId: UUID;
    branchLabel: string;
    cashLiabilityAccountId?: UUID | null;
    transactionSourceAccountId?: UUID | null;
};

