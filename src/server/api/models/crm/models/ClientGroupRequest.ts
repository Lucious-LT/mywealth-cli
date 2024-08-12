/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a client group. The fields marked with an * means that they are required.
 */
export type ClientGroupRequest = {
    /**
     * The clientType of client
     */
    type: ClientGroupRequest.type;
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
     * The default valuation currency for the client group.
     */
    valuationCurrency: string;
};

export namespace ClientGroupRequest {

    /**
     * The clientType of client
     */
    export enum type {
        INDIVIDUAL = 'INDIVIDUAL',
        CORPORATE = 'CORPORATE',
        TRUST = 'TRUST',
        JOINT = 'JOINT',
    }


}

