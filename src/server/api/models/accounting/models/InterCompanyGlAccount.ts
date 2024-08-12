/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * A record representing an inter company GL account mapping.
 */
export type InterCompanyGlAccount = {
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
     * The GL account ID used to process the company transactions
     */
    glAccountId: UUID;
    /**
     * The GL account label used to process the inter company transactions
     */
    glAccountLabel: string;
    /**
     * The GL account code used to process the inter company transactions
     */
    glAccountCode: string;
    /**
     * A currency of the GL mapping
     */
    currency: string;
    /**
     * The gl mapping description
     */
    label: string;
};

