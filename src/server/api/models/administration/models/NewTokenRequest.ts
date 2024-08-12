/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a token request.
 */
export type NewTokenRequest = {
    /**
     * The user name
     */
    username: string;
    /**
     * The password
     */
    password: string;
    /**
     * The tenant identifier
     */
    tenant: string;
};

