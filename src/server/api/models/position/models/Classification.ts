/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a classification record.
 */
export type Classification = {
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
     * The industry code
     */
    industryCode: string;
    /**
     * The industry
     */
    industry: string;
    /**
     * The super sector code
     */
    superSectorCode: string;
    /**
     * The super sector
     */
    superSector: string;
    /**
     * The sector code
     */
    sectorCode: string | null;
    /**
     * The sector
     */
    sector: string;
    /**
     * The sub sector code
     */
    subSectorCode: string;
    /**
     * The sub sector
     */
    subSector: string;
    /**
     * The classification description
     */
    definition: string;
};

