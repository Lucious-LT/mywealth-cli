/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MoneyMarketCategory } from './MoneyMarketCategory';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a GL configuration.
 */
export type MoneyMarketGlAccountRequest = {
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
    category?: MoneyMarketCategory | null;
    /**
     * The account ID from the GL system
     */
    assetAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    liabilityAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    intReceivableAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    intIncomeAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    whtTaxAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    expenseAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    transSourceAccountId: UUID;
};

