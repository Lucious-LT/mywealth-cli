/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user record.
 */
export type UserSignupRequest = {
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
     * The tenant url
     */
    tenantUrl: string;
    /**
     * The groups assigned to the user
     */
    groups: Array<string>;
    use2FA?: boolean;
};

