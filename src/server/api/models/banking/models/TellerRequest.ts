/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TellerGlAccountRequest } from './TellerGlAccountRequest';
import type { TellerStatus } from './TellerStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an teller record.
 */
export type TellerRequest = {
    /**
     * The teller code
     */
    code: string;
    /**
     * The teller label
     */
    label: string;
    /**
     * The status of the teller
     */
    status: TellerStatus;
    /**
     * The ID of the branch where the teller is attached.
     */
    branchId: UUID;
    /**
     * GL accounts attached to the teller
     */
    glAccounts: Array<TellerGlAccountRequest>;
};

