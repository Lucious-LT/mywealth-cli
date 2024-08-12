/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a reset request.
 */
export type User2FAResetRequest = {
    /**
     * The user name
     */
    username: string;
    /**
     * The user name
     */
    email?: string | null;
};

