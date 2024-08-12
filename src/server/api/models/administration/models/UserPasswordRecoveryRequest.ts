/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user password change request.
 */
export type UserPasswordRecoveryRequest = {
    /**
     * The users email
     */
    email: string;
    /**
     * The tenant url
     */
    tenantUrl: string;
};

