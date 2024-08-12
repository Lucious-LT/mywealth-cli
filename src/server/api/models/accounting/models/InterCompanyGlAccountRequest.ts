/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UUID } from './UUID';

/**
 * A JSON blob representing inter company GL account mapping.
 */
export type InterCompanyGlAccountRequest = {
    /**
     * The GL mapping label
     */
    label: string;
    /**
     * The GL account label used to process inter company transactions
     */
    glAccountId: UUID;
    /**
     * The currency of the GL account
     */
    currency: string;
};

