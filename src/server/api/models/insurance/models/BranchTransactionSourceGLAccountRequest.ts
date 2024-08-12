/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a GL record.
 */
export type BranchTransactionSourceGLAccountRequest = {
    /**
     * The loan fee label
     */
    label: string;
    /**
     * The GL account label used to process the fee
     */
    glAccountId: UUID;
    /**
     * The fee currency
     */
    currency: string;
};

