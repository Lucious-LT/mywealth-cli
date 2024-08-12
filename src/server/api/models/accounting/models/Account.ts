/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlAccountStatus } from './GlAccountStatus';
import type { GlAccountType } from './GlAccountType';
import type { GlAccountUsage } from './GlAccountUsage';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Account = {
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
     * A unique account code
     */
    code: string;
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
    /**
     * The account currency
     */
    currency: string;
    /**
     * The account description
     */
    label: string;
    /**
     * The status of the account
     */
    status: GlAccountStatus;
    /**
     * The type of the account
     */
    type: GlAccountType;
    /**
     * Specifies if this is a header or posting account
     */
    usage: GlAccountUsage;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     * Allow manual entries
     */
    allowManualEntries: boolean | null;
    /**
     * The company ID
     */
    companyId: UUID;
    /**
     * The company description
     */
    companyLabel: string;
    /**
     * The company code
     */
    companyCode: string;
};

