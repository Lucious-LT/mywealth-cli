/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Request to generate a password token
 */
export type PasswordTokenRequest = {
    /**
     * The username
     */
    username: string;
    /**
     * The tenant url
     */
    tenantUrl: string;
};

