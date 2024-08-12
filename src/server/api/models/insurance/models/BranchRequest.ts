/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BranchCashLiabilityGLAccountRequest } from './BranchCashLiabilityGLAccountRequest';
import type { BranchStatus } from './BranchStatus';
import type { BranchTransactionSourceGLAccountRequest } from './BranchTransactionSourceGLAccountRequest';
import type { BranchType } from './BranchType';

/**
 * A JSON blob representing an branch record.
 */
export type BranchRequest = {
    /**
     * The branch code
     */
    code: string;
    /**
     * The branch label
     */
    label: string;
    /**
     * The status of the branch
     */
    status: BranchStatus;
    /**
     * The type of branch
     */
    type: BranchType;
    /**
     * The branch country code
     */
    country: string;
    /**
     * This is the account that will be act as the bank / funding source when cash transactions are processed.
     */
    branchTransactionSourceGLAccount: Array<BranchTransactionSourceGLAccountRequest>;
    /**
     * This is the account that will be used to post the client liability when cash transactions are processed.
     */
    branchCashLiabilityGLAccount: Array<BranchCashLiabilityGLAccountRequest>;
};

