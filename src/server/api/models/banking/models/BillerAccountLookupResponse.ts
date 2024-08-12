/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a biller account lookup response.
 */
export type BillerAccountLookupResponse = {
    /**
     * The biller account number
     */
    billerAccountNo: string;
    /**
     * The biller account label
     */
    billerAccountLabel: string;
    /**
     * The  ID of the biller institution involved in the transaction
     */
    billerId: UUID;
    /**
     * The code of the counter party institution
     */
    billerCode: string;
    /**
     * The label of the destination institution
     */
    billerLabel?: string | null;
};

