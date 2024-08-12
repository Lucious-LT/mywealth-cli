/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookStatus } from './BookStatus';
import type { BookType } from './BookType';
import type { DynamicAssetValueGlAccountRequest } from './DynamicAssetValueGlAccountRequest';
import type { FixedIncomeGlAccountRequest } from './FixedIncomeGlAccountRequest';
import type { MoneyMarketGlAccountRequest } from './MoneyMarketGlAccountRequest';
import type { PlacementGlAccountRequest } from './PlacementGlAccountRequest';

/**
 * A JSON blob representing an treasury book record.
 */
export type TreasuryBookRequest = {
    /**
     * The treasury book code
     */
    code: string;
    /**
     * The description of the treasury book
     */
    label: string;
    /**
     * Notes related to the book
     */
    notes?: string | null;
    /**
     * The status of the treasury book
     */
    status: BookStatus;
    /**
     * The type of treasury book
     */
    type: BookType;
    /**
     * A currency used for valuing the book
     */
    valuationCurrency: string;
    /**
     * GL accounts for dynamic asset value positions
     */
    dynAssetValueAccounts: Array<DynamicAssetValueGlAccountRequest>;
    /**
     * GL accounts for processing fixed income positions
     */
    fixedIncomeAccounts: Array<FixedIncomeGlAccountRequest>;
    /**
     * GL accounts for processing money market positions
     */
    moneyMarketAccounts: Array<MoneyMarketGlAccountRequest>;
    /**
     * GL accounts for processing placement positions
     */
    placementAccounts: Array<PlacementGlAccountRequest>;
};

