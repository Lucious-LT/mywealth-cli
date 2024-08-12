/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a branch. The fields marked with an * means that they are required.
 */
export type BranchRequest = {
    /**
     * The status of the branch. See the enumeration for acceptable values.
     */
    status: BranchRequest.status;
    /**
     * The type of branch. See the enumeration for acceptable values.
     */
    type: BranchRequest.type;
    /**
     * A unique branch code
     */
    code: string;
    /**
     * A valid country code
     */
    country: string;
    /**
     * A text recordId that describes the branch
     */
    label: string;
    /**
     * Any notes that apply to this branch
     */
    notes?: string;
};

export namespace BranchRequest {

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

