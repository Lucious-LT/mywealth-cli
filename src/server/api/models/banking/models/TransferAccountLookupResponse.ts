/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransferType } from './TransferType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a transfer account lookup response.
 */
export type TransferAccountLookupResponse = {
    /**
     * The type of transfer
     */
    type: TransferType;
    /**
     * The destination account number
     */
    destAccountNo: string;
    /**
     * The destination account label
     */
    destAccountLabel: string;
    /**
     * The  ID of the counterparty institution involved in the transaction
     */
    institutionId: UUID | null;
    /**
     * The label of the destination institution
     */
    institutionLabel?: string | null;
    /**
     * The code of the counter party institution
     */
    institutionCode: string | null;
};

