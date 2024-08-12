/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Request to change a password
 */
export type PasswordChangeAdminRequest = {
    /**
     * The username
     */
    username: string;
    /**
     * The old password
     */
    oldPassword?: string;
    /**
     * The new password
     */
    newPassword: string;
};

