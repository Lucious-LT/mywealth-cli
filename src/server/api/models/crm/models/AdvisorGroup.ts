/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an advisor group. The fields marked with an * means that they are required.
 */
export type AdvisorGroup = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * Indicates when the record was created.
     */
    createdAt: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * Indicates when the record was last modified.
     */
    updatedAt: string;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The clientType of advisor group.
     */
    type: AdvisorGroup.type;
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
     * Notes on the client group record
     */
    notes?: string;
    /**
     * A valid email address
     */
    email: string;
};

export namespace AdvisorGroup {

    /**
     * The clientType of advisor group.
     */
    export enum type {
        BANK = 'BANK',
        TRADE = 'TRADE',
        WEALTH = 'WEALTH',
    }


}

