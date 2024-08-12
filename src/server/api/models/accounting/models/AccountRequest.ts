/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlAccountStatus } from './GlAccountStatus';
import type { GlAccountType } from './GlAccountType';
import type { GlAccountUsage } from './GlAccountUsage';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account record.
 */
export type AccountRequest = {
    /**
     * The account code. Please see the documentation for how to properly code your chart
     */
    code: string;
    /**
     * The account label
     */
    label: string;
    /**
     * The reporting currency used for managing the account.
     */
    currency: string;
    /**
     * The company ID for this account
     */
    companyId: UUID;
    /**
     * The status of the account
     */
    status: GlAccountStatus;
    /**
     * The type of the account
     */
    type: GlAccountType;
    /**
     * Specify if this is a header or posting account
     */
    usage: GlAccountUsage;
    /**
     * Allow manual entries
     */
    allowManualEntries: boolean;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     *
     * A prefix length for determining the sub accounts that report to a header account. For example, if you have a header account
     * with code 100000 and you want to specify that all accounts with code 100001, 100002, 100003, 100101, 100202, etc report to this account
     * you would specify a value of 3 for this field. When evaluating control account balances, the system will report balances for all posting accounts
     * that start with the prefix 100. This field is optional and should be used only when configuring header accounts.
     * This field will be set to 0 for posting accounts.
     *
     */
    subAccountPrefixLength: number;
};

