/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account record.
 */
export type InsuranceAccountRequest = {
    /**
     * The account label
     */
    accountLabel: string;
    /**
     * The reference account number
     */
    refAccountNo: string;
    /**
     * The account currency
     */
    currency: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The client ID from CRM
     */
    clientId: UUID;
    /**
     * The branch ID from the insurance service
     */
    branchId: UUID;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate?: LocalDate | null;
};

