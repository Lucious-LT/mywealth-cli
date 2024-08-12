/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstitutionStatus } from './InstitutionStatus';
import type { InstitutionType } from './InstitutionType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Institution = {
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
     * The institution's country code
     */
    country: string;
    /**
     * The institution's description
     */
    label: string;
    /**
     * The status of the institution
     */
    status: InstitutionStatus;
    /**
     * The type of institution
     */
    type: InstitutionType;
};

