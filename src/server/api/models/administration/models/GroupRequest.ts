/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a user group record.
 */
export type GroupRequest = {
    /**
     * The group ID
     */
    name: string;
    /**
     * The roles assigned to the group
     */
    roles: Array<string>;
};

