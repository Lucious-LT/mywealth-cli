/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';

/**
 * A JSON blob representing a user login event.
 */
export type UserLoginEvent = {
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
     * The login session identifier
     */
    sessionId: string;
    /**
     * The ip address
     */
    ipAddress: string;
    /**
     * The event time
     */
    eventTime: LocalDateTime;
    /**
     * Indicates if the password was successfully verified
     */
    passwordVerified: boolean;
    /**
     * Indicates if the 2FA was successfully verified
     */
    otpVerified: boolean;
};

