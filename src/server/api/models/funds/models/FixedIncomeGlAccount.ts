/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FixedIncomeCategory } from './FixedIncomeCategory';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type FixedIncomeGlAccount = {
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
     * The bond category. This is used to select the accounts if specified
     */
    category?: FixedIncomeCategory | null;
    /**
     * The gl mapping description
     */
    label: string;
    /**
     * A default GL account used to fund the fund for the specified currency
     */
    transSourceAccountId: UUID;
    /**
     * A default GL account used to fund the fund for the specified currency
     */
    transSourceAccountLabel: string;
    /**
     * A default GL account used to fund the fund for the specified currency
     */
    transSourceAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    couponReceivableAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    couponReceivableAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    couponReceivableAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    couponIncomeAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    couponIncomeAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    couponIncomeAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    faceValueTradedAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    faceValueTradedAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    faceValueTradedAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumExpenseAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumExpenseAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    faceValuePremiumExpenseAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountIncomeAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountIncomeAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    faceValueDiscountIncomeAccountCode: string;
    /**
     * A GL account used to process bonds
     */
    expenseAccountId: UUID;
    /**
     * A GL account used to process bonds
     */
    expenseAccountLabel: string;
    /**
     * A GL account used to process bonds
     */
    expenseAccountCode: string;
};

