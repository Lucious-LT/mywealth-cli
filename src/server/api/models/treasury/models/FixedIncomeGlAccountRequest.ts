/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FixedIncomeCategory } from './FixedIncomeCategory';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a GL configuration.
 */
export type FixedIncomeGlAccountRequest = {
    /**
     * The config label
     */
    label: string;
    /**
     * The fee currency
     */
    currency: string;
    /**
     * The category
     */
    category?: FixedIncomeCategory | null;
    /**
     * The account ID from the GL system
     */
    couponReceivableAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    couponIncomeAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    faceValueTradedAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    faceValuePremiumAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    faceValuePremiumExpenseAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    faceValueDiscountAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    faceValueDiscountIncomeAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    expenseAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    transSourceAccountId: UUID;
};

