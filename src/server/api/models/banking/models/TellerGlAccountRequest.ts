/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing a teller GL account mapping.
 */
export type TellerGlAccountRequest = {
    /**
     * The GL mapping label
     */
    label: string;
    /**
     * The GL account label used to process transactions for the teller
     */
    glAccountId: UUID;
    /**
     * The currency of the GL account
     */
    currency: string;
};

