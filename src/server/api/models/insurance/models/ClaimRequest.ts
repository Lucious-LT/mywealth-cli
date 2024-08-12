/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an claim record.
 */
export type ClaimRequest = {
    /**
     * The claim label
     */
    claimLabel: string;
    /**
     * The reference claim number
     */
    refClaimNo: string;
    /**
     * The claim currency
     */
    currency: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The amount claimed
     */
    claimAmount: number;
    /**
     * The amount approved
     */
    approvedAmount?: number | null;
    /**
     * Indicates the date that the claim incident happened
     */
    claimDate: LocalDate;
    /**
     * Indicates the date the claim was processed
     */
    dateProcessed?: LocalDate | null;
    /**
     * The policy ID for the claim
     */
    policyId: UUID;
};

