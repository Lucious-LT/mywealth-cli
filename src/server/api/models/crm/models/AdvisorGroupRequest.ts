/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an advisor group. The fields marked with an * means that they are required.
 */
export type AdvisorGroupRequest = {
    /**
     * The clientType of advisor
     */
    type: AdvisorGroupRequest.type;
    /**
     * Indicates if the group is active.
     */
    active: boolean;
    /**
     * The unique code for the group.
     */
    code: string;
    /**
     * The label describing the group.
     */
    label: string;
    /**
     * Notes on the advisor group record
     */
    notes?: string;
    /**
     * A valid email address
     */
    email: string;
};

export namespace AdvisorGroupRequest {

    /**
     * The clientType of advisor
     */
    export enum type {
        BANK = 'BANK',
        TRADE = 'TRADE',
        WEALTH = 'WEALTH',
    }


}

