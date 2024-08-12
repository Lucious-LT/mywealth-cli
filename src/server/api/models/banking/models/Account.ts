/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountStatus } from './AccountStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { SubAccountType } from './SubAccountType';
import type { UUID } from './UUID';

export type Account = {
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
     * A reference code for the account record in an upstream system
     */
    refCode: string;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate: LocalDate;
    /**
     * The status of the account
     */
    status: AccountStatus;
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
    productType: string;
    accountType: SubAccountType;
    glAccountId: UUID;
    productId: UUID;
    transactionSourceId: UUID;
    productLabel: string;
    productCode: string;
    billPayEnabled?: boolean;
    transfersEnabled?: boolean;
    cardsEnabled?: boolean;
    /**
     * The account branch ID
     */
    branchId: UUID;
    /**
     * The account branch code
     */
    branchCode: string;
    /**
     * The account branch label
     */
    branchLabel: string;
    /**
     * The account group ID
     */
    accountGroupId?: UUID | null;
    /**
     * The account group code
     */
    accountGroupCode?: string | null;
    /**
     * The account group label
     */
    accountGroupLabel?: string | null;
    active?: boolean;
};

