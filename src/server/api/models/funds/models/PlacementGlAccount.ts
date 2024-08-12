/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { PlacementCategory } from './PlacementCategory';
import type { UUID } from './UUID';

export type PlacementGlAccount = {
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
     * The counter party category. This is used to select the accounts if specified
     */
    category?: PlacementCategory | null;
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
     * A GL account used to process placements
     */
    assetAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    assetAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    assetAccountCode: string;
    /**
     * A GL account used to process placements
     */
    liabilityAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    liabilityAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    liabilityAccountCode: string;
    /**
     * A GL account used to process placements
     */
    intReceivableAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    intReceivableAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    intReceivableAccountCode: string;
    /**
     * A GL account used to process placements
     */
    intIncomeAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    intIncomeAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    intIncomeAccountCode: string;
    /**
     * A GL account used to process placements
     */
    whtTaxAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    whtTaxAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    whtTaxAccountCode: string;
    /**
     * A GL account used to process placements
     */
    expenseAccountId: UUID;
    /**
     * A GL account used to process placements
     */
    expenseAccountLabel: string;
    /**
     * A GL account used to process placements
     */
    expenseAccountCode: string;
};

