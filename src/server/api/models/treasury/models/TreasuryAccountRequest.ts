/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TreasuryAccountStatus } from './TreasuryAccountStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a treasury account.
 */
export type TreasuryAccountRequest = {
    /**
     * The account label
     */
    label: string;
    /**
     * The account currency
     */
    currency: string;
    /**
     * The treasury book ID
     */
    treasuryBookId: UUID;
    /**
     * The status of the account
     */
    status: TreasuryAccountStatus;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     * The treasury account code from the investing service. If this is provided, it will be used to attach the treasury account to an account in the trading module. Orders for exchange traded securities can then be executed through that account.
     */
    tradingAccountCode?: string | null;
};

