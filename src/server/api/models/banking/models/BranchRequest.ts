/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BranchGlAccountRequest } from './BranchGlAccountRequest';
import type { BranchStatus } from './BranchStatus';
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
     * GL accounts attached to the branch
     */
    glAccounts: Array<BranchGlAccountRequest>;
};

