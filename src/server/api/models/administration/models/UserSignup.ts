/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';
import type { UserSignupStatus } from './UserSignupStatus';

/**
 * A JSON blob representing a user record.
 */
export type UserSignup = {
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
     * The user name will typically default to the email address
     */
    username: string;
    /**
     * The users email address
     */
    email: string;
    /**
     * The first name
     */
    firstName: string;
    /**
     * The last name
     */
    lastName: string;
    /**
     * The status of the user signup request
     */
    status: UserSignupStatus;
    /**
     * The default groups assigned to the user
     */
    groups: Array<string>;
    /**
     * The tenant url
     */
    tenantUrl: string;
    /**
     * Indicates if the user profile has 2FA activated
     */
    use2FA: boolean;
};

