/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user password change request.
 */
export type ResetTokenPasswordChangeRequest = {
    /**
     * The password reset token
     */
    resetToken: string;
    /**
     * The password
     */
    password: string;
};

