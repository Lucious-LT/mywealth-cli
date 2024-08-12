/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlacementCategory } from './PlacementCategory';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a GL configuration.
 */
export type PlacementGlAccountRequest = {
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
    category?: PlacementCategory | null;
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

