/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { PartnerStatus } from './PartnerStatus';
import type { PartnerType } from './PartnerType';
import type { UUID } from './UUID';

export type Partner = {
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
    /**
     * The GL liability account ID used to process premiums and claims for this partner
     */
    glAccountId: UUID;
    /**
     * The GL account label used to process transfers with this institution
     */
    glAccountLabel: string;
    /**
     * The GL account code used to process premiums and claims for this partner
     */
    glAccountCode: string;
    /**
     * A unique institution code
     */
    code: string;
    /**
     * A routing number for the counter party
     */
    routingNo?: string | null;
    /**
     * A swift code for the counter party
     */
    swiftCode?: string | null;
    /**
     * The partner's country code
     */
    country: string;
    /**
     * The partner's description
     */
    label: string;
    /**
     * The status of the partner
     */
    status: PartnerStatus;
    /**
     * The type of partner
     */
    type: PartnerType;
    partnerProducts: Array<string>;
};

