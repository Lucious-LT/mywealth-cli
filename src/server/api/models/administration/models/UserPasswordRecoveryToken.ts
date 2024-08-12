/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';

/**
 * A JSON blob representing a user password recovery request.
 */
export type UserPasswordRecoveryToken = {
    id?: ObjectId | null;
    /**
     * The tenant that this record belongs to.
     */
    tenant: string;
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
     * The user name
     */
    username: string;
    /**
     * The users email address
     */
    email: string;
    /**
     * The request time
     */
    requestTime: LocalDateTime;
    /**
     * Indicates that the token has been used
     */
    tokenUsed: boolean;
    /**
     * The token validity in minutes. This is the time the token is valid for and defaults to 60 minutes
     */
    tokenValidity: number;
};

