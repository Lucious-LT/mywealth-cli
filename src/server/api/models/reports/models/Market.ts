/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a market record.
 */
export type Market = {
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
     * The market identifier
     */
    marketCode: string;
    /**
     * The market description
     */
    description: string;
    /**
     * The country
     */
    country: string;
};

