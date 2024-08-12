/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Request to change a password
 */
export type PasswordChangeTokenRequest = {
    /**
     * The password reset token
     */
    tokenId: string;
    /**
     * A password that matches the configured pattern eg '((?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,100})'
     */
    password: string;
};

