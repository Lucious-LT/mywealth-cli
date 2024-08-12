/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a branch. The fields marked with an * means that they are required.
 */
export type Branch = {
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
     * The status of the branch. See the enumeration for acceptable values.
     */
    status: Branch.status;
    /**
     * The type of branch. See the enumeration for acceptable values.
     */
    type: Branch.type;
    /**
     * A unique branch code.
     */
    code: string;
    /**
     * The branch's country code
     */
    country: string;
    /**
     * A text that describes the branch
     */
    label: string;
    /**
     * Any notes that apply to this branch
     */
    notes?: string;
};

export namespace Branch {

    /**
     * The status of the branch. See the enumeration for acceptable values.
     */
    export enum status {
        PENDING = 'PENDING',
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
    }

    /**
     * The type of branch. See the enumeration for acceptable values.
     */
    export enum type {
        PHYSICAL = 'PHYSICAL',
        ECHANNEL = 'ECHANNEL',
    }


}

