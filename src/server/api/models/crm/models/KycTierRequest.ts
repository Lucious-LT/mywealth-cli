/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a kyc tier and the associated limits. The fields marked with an * means that they are required.
 */
export type KycTierRequest = {
    /**
     * The kyc tier code
     */
    code: string;
    /**
     * The kyc tier label
     */
    label: string;
    /**
     * The limit currency
     */
    currency: string;
    /**
     * The maximum balance that that can be held in the account.
     */
    maxAccountBalance: number;
    /**
     * The maximum value of deposits that can be processed with the account in a day across all channels.
     */
    maxDailyDepositLimit: number;
    /**
     * The maximum value of withdrawals that can be processed with the account in a day across all channels.
     */
    maxDailyWithdrawalLimit: number;
    /**
     * The maximum amount that can be withdrawn in a single transaction.
     */
    maxTransWithdrawalLimit: number;
};

