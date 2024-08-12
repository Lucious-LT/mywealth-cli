/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookStatus } from './BookStatus';
import type { BookType } from './BookType';
import type { DynamicAssetValueGlAccount } from './DynamicAssetValueGlAccount';
import type { FixedIncomeGlAccount } from './FixedIncomeGlAccount';
import type { LocalDateTime } from './LocalDateTime';
import type { MoneyMarketGlAccount } from './MoneyMarketGlAccount';
import type { PlacementGlAccount } from './PlacementGlAccount';
import type { UUID } from './UUID';

export type TreasuryBook = {
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
     * The client ID from the CRM system
     */
    clientId: UUID;
    /**
     * The client number from the CRM system
     */
    clientCode: string;
    /**
     * The client label from the CRM system
     */
    clientLabel: string;
    /**
     * A unique treasury book code
     */
    code: string;
    /**
     * A currency used for valuing the book
     */
    valuationCurrency: string;
    /**
     * The treasury book's description
     */
    label: string;
    /**
     * The status of the treasury book
     */
    status: BookStatus;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     * The type of treasury book
     */
    type: BookType;
    /**
     * GL accounts for processing dynamic asset value positions
     */
    dynAssetValueAccounts: Array<DynamicAssetValueGlAccount>;
    /**
     * GL accounts for processing fixed income positions
     */
    fixedIncomeAccounts: Array<FixedIncomeGlAccount>;
    /**
     * GL accounts for processing money market positions
     */
    moneyMarketAccounts: Array<MoneyMarketGlAccount>;
    /**
     * GL accounts for processing placement positions
     */
    placementAccounts: Array<PlacementGlAccount>;
};

