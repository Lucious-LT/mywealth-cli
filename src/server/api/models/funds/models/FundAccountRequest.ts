/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundAccountStatus } from './FundAccountStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fund account.
 */
export type FundAccountRequest = {
    /**
     * The account label
     */
    label: string;
    /**
     * The account currency
     */
    currency: string;
    /**
     * The fund ID
     */
    fundId: UUID;
    /**
     * The status of the account
     */
    status: FundAccountStatus;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     * The funds account code from the investing service. If this is provided, it will be used to attach the funds account to an account in the trading module. Orders for exchange traded securities can then be executed through that account.
     */
    tradingAccountCode?: string | null;
};

