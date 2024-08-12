/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user record.
 */
export type UserRequest = {
    /**
     * The user name
     */
    username: string;
    /**
     * The user name
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
    active: boolean;
    /**
     * The tenant url
     */
    tenantUrl: string;
    /**
     * A base 64 encoded representation of the picture or avatar
     */
    picture?: string | null;
    /**
     * Indicates if the user profile has 2FA activated
     */
    use2FA: boolean;
};

