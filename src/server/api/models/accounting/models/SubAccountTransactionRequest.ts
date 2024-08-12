/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlSubAccountTransactionType } from './GlSubAccountTransactionType';
import type { GlSubAccountType } from './GlSubAccountType';
import type { JournalType } from './JournalType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a sub account journal request. This request can be used to process a debit or credit on a product / sub account. The supported product types are: LOAN, DEPOSIT & INVESTMENT accounts. The GL entries will be created based on the mapped product's client liability / asset control and the GL account specified in the request. All the GL accounts used in this request must be active and configured to use the same currency. The specified product account must be active and also configured to use the same currency. A user journal will be generated from the request and automatically posted to the GL if the autoPost flag is set to true. Credit requests will be subject to the configured credit limits for the product. This should be used for the processing of transactions such as maintenance fees and other misc charges or adjustments.
 */
export type SubAccountTransactionRequest = {
    /**
     * The request currency
     */
    currency: string;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * Indicates if the generated journal should be automatically posted
     */
    autoPost?: boolean;
    /**
     * The request description
     */
    label: string;
    /**
     * Notes related to the request
     */
    notes?: string | null;
    /**
     * The type of journal
     */
    journalType: JournalType;
    /**
     * The transaction type
     */
    transactionType: GlSubAccountTransactionType;
    /**
     * The value date for the journal
     */
    valueDate: LocalDate;
    /**
     * The transaction date for the journal
     */
    tranDate: LocalDate;
    /**
     * The source account used for the posting. This typically an expense or income account
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
     * The reference code in an upstream system
     */
    refCode?: string | null;
};

