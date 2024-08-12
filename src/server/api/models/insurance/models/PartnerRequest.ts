/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartnerStatus } from './PartnerStatus';
import type { PartnerType } from './PartnerType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an partner record.
 */
export type PartnerRequest = {
    /**
     * The partner code
     */
    code: string;
    /**
     * The partner label
     */
    label: string;
    /**
     * The GL account used for processing transfers with the partner
     */
    glAccountId: UUID;
    /**
     * The status of the partner
     */
    status: PartnerStatus;
    /**
     * The type of partner
     */
    type: PartnerType;
    /**
     * The routing code of the partner
     */
    routingNo?: string | null;
    /**
     * The swift code of the partner
     */
    swiftCode?: string | null;
    /**
     * The partner country code
     */
    country: string;
    /**
     * The account IDs for the products
     */
    products: Array<string>;
};

