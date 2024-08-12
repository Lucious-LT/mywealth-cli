/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes a kyc tier in the system. The fields marked with an * means that they are required.
 */
export type KycTier = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * Indicates when the record was created.
     */
    createdAt: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * Indicates when the record was last modified.
     */
    updatedAt: string;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * A unique tier code
     */
    code: string;
    /**
     * The tier description
     */
    label: string;
    /**
     * The tier currency
     */
    currency: string;
    /**
     * The maximum balance that that can be held in the account.
     */
    maxAccountBalance?: number;
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

