/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { MoneyMarketCategory } from './MoneyMarketCategory';
import type { UUID } from './UUID';

export type MoneyMarketGlAccount = {
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
     * A currency of the GL mapping. All mapped accounts must be in the same currency
     */
    currency: string;
    /**
     * The discounted instrument category. This is used to select the accounts if specified
     */
    category?: MoneyMarketCategory | null;
    /**
     * The gl mapping description
     */
    label: string;
    /**
     * A default GL account used to fund the book for the specified currency
     */
    transSourceAccountId: UUID;
    /**
     * A default GL account used to fund the book for the specified currency
     */
    transSourceAccountLabel: string;
    /**
     * A default GL account used to fund the book for the specified currency
     */
    transSourceAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    assetAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    assetAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    assetAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    liabilityAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    liabilityAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    liabilityAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    intReceivableAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    intReceivableAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    intReceivableAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    intIncomeAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    intIncomeAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    intIncomeAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    whtTaxAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    whtTaxAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    whtTaxAccountCode: string;
    /**
     * A GL account used to process discounted instruments
     */
    expenseAccountId: UUID;
    /**
     * A GL account used to process discounted instruments
     */
    expenseAccountLabel: string;
    /**
     * A GL account used to process discounted instruments
     */
    expenseAccountCode: string;
};

