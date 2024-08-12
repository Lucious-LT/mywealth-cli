/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user profile update request.
 */
export type UserProfileUpdateRequest = {
    /**
     * The user name
     */
    username: string;
    /**
     * The user name
     */
    email: string;
    /**
     * The first name
     */
    firstName: string;
    /**
     * The last name
     */
    lastName: string;
    /**
     * A base 64 encoded representation of the picture or avatar
     */
    picture?: string | null;
};

