/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a registration request.
 */
export type User2FARegistrationRequest = {
    /**
     * The token secret
     */
    secret: string;
    /**
     * The code from the authenticator app
     */
    code: string;
    /**
     * The username
     */
    username: string;
};

