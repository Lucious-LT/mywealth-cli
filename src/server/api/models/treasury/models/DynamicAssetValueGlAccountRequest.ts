/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DynAssetValueCategory } from './DynAssetValueCategory';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a GL configuration.
 */
export type DynamicAssetValueGlAccountRequest = {
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
    category?: DynAssetValueCategory | null;
    /**
     * The account ID from the GL system
     */
    assetAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    incomeAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    transSourceAccountId: UUID;
    /**
     * The account ID from the GL system
     */
    expenseAccountId: UUID;
};

