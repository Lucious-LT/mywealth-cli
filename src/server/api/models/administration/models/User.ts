/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user record.
 */
export type User = {
    /**
     * The username
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
     * Indicates if the user is active or not. Active users will count towards the license limit.
     */
    active?: boolean;
    /**
     * Indicates if the user profile has 2FA activated
     */
    use2FA: boolean;
    /**
     * A flag that indicates if the TOTP has been setup in the clients profile
     */
    isTotpSetup: boolean;
    /**
     * The KC client Id
     */
    id: string;
    totpSetup?: boolean;
    name: string;
};

