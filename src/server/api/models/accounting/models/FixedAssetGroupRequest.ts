/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a prepaid expense record.
 */
export type FixedAssetGroupRequest = {
    /**
     * The record label
     */
    label: string;
    /**
     * A reference used to post the journals
     */
    reference: string;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * Notes related to the group
     */
    notes?: string | null;
    /**
     * The asset account used for processing the acquisition of the fixed asset
     */
    assetAccountId: UUID;
    /**
     * The depreciation expense account used for processing the depreciation of the fixed asset
     */
    expenseAccountId: UUID;
    /**
     * The accumulated depreciation account used for processing the depreciation of the fixed asset
     */
    accDepreciationAccountId: UUID;
    /**
     * The transaction source account
     */
    transactionSourceAccountId: UUID;
    /**
     * The disposal income account
     */
    disposalIncomeAccountId: UUID;
    /**
     * The disposal expense account
     */
    disposalExpenseAccountId: UUID;
    /**
     * The residual value of the asset
     */
    residualValue: number;
    /**
     * The asset lifespan in months
     */
    assetLifespan: number;
};

