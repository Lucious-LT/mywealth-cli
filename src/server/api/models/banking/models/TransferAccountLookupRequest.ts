/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransferType } from './TransferType';

/**
 * A JSON blob representing a transfer account lookup request.
 */
export type TransferAccountLookupRequest = {
    /**
     * The type of transfer
     */
    type: TransferType;
    /**
     * The destination account number
     */
    destAccountNo: string;
    /**
     * The code of the counter party institution and is required for external transfers
     */
    institutionCode?: string | null;
};

