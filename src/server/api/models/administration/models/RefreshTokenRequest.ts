/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a token request.
 */
export type RefreshTokenRequest = {
    /**
     * The refresh token
     */
    refreshToken: string;
    /**
     * The tenant identifier
     */
    tenant: string;
};

