/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlSubAccountTransactionStatus } from './GlSubAccountTransactionStatus';
import type { GlSubAccountTransactionType } from './GlSubAccountTransactionType';
import type { GlSubAccountType } from './GlSubAccountType';
import type { JournalType } from './JournalType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type SubAccountTransaction = {
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
     * A reference code for the record in an upstream system
     */
    refCode: string;
    /**
     * A unique transaction #
     */
    transactionNo: string;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The request description
     */
    label: string;
    /**
     * Notes related to the request
     */
    notes?: string | null;
    /**
     * The status of the request
     */
    status: GlSubAccountTransactionStatus;
    /**
     * The transaction type
     */
    transactionType: GlSubAccountTransactionType;
    /**
     * The type of journal
     */
    journalType: JournalType;
    /**
     * The value date for the journal
     */
    valueDate: LocalDate;
    /**
     * The transaction date for the journal
     */
    tranDate: LocalDate;
    /**
     * he source account used for the posting. This typically an expense or income account
     */
    sourceAccountGlId: UUID;
    /**
     * This will typically be an ID for a portfolio, bank account, insurance account, etc. Note that this subAccountId is used to track the activity and balance for the underlying product account.
     */
    subAccountId: UUID;
    /**
     * This is the GL account used to track the sub account activity. This is typically an asset or liability account. This GL account must be configured to use the same currency as the product account.
     */
    subAccountGlId: UUID;
    /**
     * An optional branch identifier. This is used to track the balance sheet, cost and expenses for ledger entries related to accounts that are mapped to the branch.
     */
    branchId?: UUID | null;
    /**
     * An sub account type must be specified.
     */
    subAccountType: GlSubAccountType;
    /**
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    /**
     * A journal ID that is used to track the journal that was created for this transaction.
     */
    journalId: UUID;
};

