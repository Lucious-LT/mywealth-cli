/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account record.
 */
export type DepositAccountRequest = {
    /**
     * The account label
     */
    accountLabel: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The client ID from CRM of the account owner
     */
    clientId: UUID;
    /**
     * The product ID for the account
     */
    productId: UUID;
    /**
     * The branch ID for the account
     */
    branchId: UUID;
    /**
     * The account group ID
     */
    accountGroupId?: UUID | null;
    /**
     * The overdraft interest rate
     */
    overdraftInterestRate?: number | null;
    /**
     * The overdraft limit
     */
    overdraftLimit?: number | null;
    /**
     * The savings or credit balance interest rate
     */
    depositInterestRate?: number | null;
    /**
     * Indicates if the account should be automatically approved
     */
    autoApprove?: boolean;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate?: LocalDate | null;
};

