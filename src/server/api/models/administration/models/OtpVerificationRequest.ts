/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user password change request.
 */
export type OtpVerificationRequest = {
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
    /**
     * The code from the authenticator app
     */
    code: string;
};

