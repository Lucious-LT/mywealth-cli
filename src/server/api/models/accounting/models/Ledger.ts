/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlSubAccountType } from './GlSubAccountType';
import type { JournalType } from './JournalType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Ledger = {
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
     * The transaction currency
     */
    transCurrency: string;
    /**
     * The reference #. This is typically the journal number.
     */
    refNo?: string | null;
    /**
     * The report currency
     */
    reportCurrency: string;
    /**
     * The value date for the ledger entry
     */
    valueDate: LocalDate;
    /**
     * The transaction date for the ledger entry
     */
    tranDate: LocalDate;
    /**
     * The ledger description
     */
    label: string;
    /**
     * The type of journal
     */
    journalType: JournalType;
    /**
     * An optional sub account or product identifier. This will typically be an ID for a portfolio, bank account, insurance account, etc. Note that this subAccountId is used to track the activity and balance for the underlying product account and can only be specified when the account entry is created.
     */
    subAccountId?: UUID | null;
    /**
     * An optional sub account label that is resolved using the subAccountId.
     */
    subAccountLabel?: string | null;
    /**
     * An optional branch identifier. This is used to track the balance sheet, cost and expenses for ledger entries related to accounts that are mapped to the branch.
     */
    branchId?: UUID | null;
    /**
     * An optional sub account type. This must be specified if a sub account is attached to the journal entry and is used to validate the sub account ID.
     */
    subAccountType?: GlSubAccountType | null;
    currencyRate: number;
    /**
     * The transaction debit amount
     */
    transDebit: number;
    /**
     * The transaction credit amount
     */
    transCredit: number;
    /**
     * The report debit amount. This is the value converted to the company's reporting currency.
     */
    reportDebit: number;
    /**
     * The report credit amount.  This is the value converted to the company's reporting currency.
     */
    reportCredit: number;
    /**
     * Indicates if this ledger entry was from a reversal
     */
    reversal: boolean;
    accountId?: UUID | null;
    accountCode?: string | null;
    accountCurrency?: string | null;
    journalId?: UUID | null;
    journalNo?: string | null;
};

