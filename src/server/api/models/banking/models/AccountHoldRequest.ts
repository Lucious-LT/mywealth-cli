/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountHoldType } from './AccountHoldType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account hold record.
 */
export type AccountHoldRequest = {
    /**
     * The narration on the hold
     */
    label: string;
    /**
     * The notes on the hold
     */
    notes?: string | null;
    /**
     * The ID of the account that the hold applies to
     */
    accountId: UUID;
    /**
     * The type of the hold
     */
    holdType: AccountHoldType;
    /**
     * The start or effective date of the request
     */
    expirationTime: LocalDateTime;
    /**
     * The hold amount
     */
    amount: number;
    /**
     * The bill currency
     */
    currency: string;
};

