/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { TransferDirection } from './TransferDirection';
import type { TransferType } from './TransferType';

/**
 * A JSON blob representing an transfer request.
 */
export type TransferRequest = {
    /**
     * The code of the counter party institution
     */
    institutionCode: string;
    /**
     * The transfer description
     */
    description: string;
    /**
     * The transfer currency. This has to be the same as the account currency
     */
    currency: string;
    /**
     * The type of transfer
     */
    type: TransferType;
    /**
     * The direction of the
     */
    direction: TransferDirection;
    /**
     * The source account number
     */
    srcAccountNo?: string | null;
    /**
     * The source account label
     */
    srcAccountLabel?: string | null;
    /**
     * The destination account number
     */
    destAccountNo?: string | null;
    /**
     * The destination account label
     */
    destAccountLabel?: string | null;
    /**
     * The reference number / code provided by the client
     */
    reference?: string | null;
    /**
     * The transfer amount
     */
    amount: number;
    /**
     * The start or effective date of the request
     */
    date: LocalDate;
};

