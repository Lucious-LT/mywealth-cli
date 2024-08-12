/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';

/**
 * A JSON blob representing a user record.
 */
export type UserProfile = {
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
     * The user ID on the authorization server
     */
    kcId?: string | null;
    /**
     * The user name
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
     * The groups assigned to the user
     */
    groups: Array<string>;
    /**
     * Indicates if the user is active or not
     */
    active?: boolean;
    /**
     * Holds the users picture or avatar
     */
    picture?: Blob | null;
    /**
     * Indicates if the user profile has 2FA activated
     */
    use2FA: boolean;
    /**
     * The 2FA secret
     */
    totpSecret?: string | null;
    /**
     * A temporary token used to validate the OTP
     */
    otpAccessToken?: string | null;
    /**
     * A flag that indicates if the TOTP has been setup in the clients profile
     */
    isTotpSetup: boolean;
};

