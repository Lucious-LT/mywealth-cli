/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginRequest = {
    /**
     * The username
     */
    username: string;
    /**
     * The password
     */
    password: string;
    /**
     * The session identifier
     */
    sessionId?: string;
    /**
     * The users ip address
     */
    ipAddress?: string;
};

