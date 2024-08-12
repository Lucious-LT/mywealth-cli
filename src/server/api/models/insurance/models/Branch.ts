/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BranchCashLiabilityGLAccount } from './BranchCashLiabilityGLAccount';
import type { BranchStatus } from './BranchStatus';
import type { BranchTransactionSourceGLAccount } from './BranchTransactionSourceGLAccount';
import type { BranchType } from './BranchType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Branch = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    branchCashLiabilityGLAccount: Array<BranchCashLiabilityGLAccount>;
    branchTransactionSourceGLAccount: Array<BranchTransactionSourceGLAccount>;
    /**
     * A unique branch code
     */
    code: string;
    /**
     * The branch's country code
     */
    country: string;
    /**
     * The branch's description
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
};

