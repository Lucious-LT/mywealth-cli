/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlAccountType } from './GlAccountType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a statement line record.
 */
export type BalanceSheetAccount = {
    /**
     * The account ID
     */
    id: UUID;
    /**
     * The account label
     */
    label: string;
    /**
     * The account code
     */
    code: string;
    /**
     * The type of account
     */
    type: GlAccountType;
    /**
     * The closing balance
     */
    closingBal: number;
};

