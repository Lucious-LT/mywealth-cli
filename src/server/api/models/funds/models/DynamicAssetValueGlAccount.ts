/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DynAssetValueCategory } from './DynAssetValueCategory';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type DynamicAssetValueGlAccount = {
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
     * The asset category. This is used to select the accounts if specified
     */
    category?: DynAssetValueCategory | null;
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
     * A GL account used to process income or loss when assets are traded
     */
    incomeAccountId: UUID;
    /**
     * A GL account used to process income or loss when assets are traded
     */
    incomeAccountLabel: string;
    /**
     * A GL account used to process income or loss when assets are traded
     */
    incomeAccountCode: string;
    /**
     * A GL account used to track the value of assets traded
     */
    assetAccountId: UUID;
    /**
     * A GL account used to track the value of assets traded
     */
    assetAccountLabel: string;
    /**
     * A GL account used to track the value of assets traded
     */
    assetAccountCode: string;
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

