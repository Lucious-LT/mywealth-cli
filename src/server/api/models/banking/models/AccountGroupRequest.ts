/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountGroupStatus } from './AccountGroupStatus';
import type { AccountGroupType } from './AccountGroupType';

/**
 * A JSON blob representing an group request.
 */
export type AccountGroupRequest = {
    /**
     * The group label
     */
    label: string;
    /**
     * Notes on the group
     */
    notes?: string | null;
    /**
     * The status of the group
     */
    status: AccountGroupStatus;
    /**
     * The type of group
     */
    type: AccountGroupType;
    /**
     * The account group code
     */
    code: string;
};

