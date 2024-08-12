/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a client report record.
 */
export type ClientRecordDTO = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id?: string;
    /**
     * The unique system generated client code
     */
    code?: string;
    /**
     * A reference code for the client record in an upstream system
     */
    refCode?: string;
    /**
     * A label for the client record
     */
    label?: string;
    /**
     * The type of client record
     */
    clientType?: ClientRecordDTO.clientType;
    /**
     * The current status of the client
     */
    status?: ClientRecordDTO.status;
};

export namespace ClientRecordDTO {

    /**
     * The type of client record
     */
    export enum clientType {
        CORPORATE = 'CORPORATE',
        JOINT = 'JOINT',
        TRUST = 'TRUST',
        INDIVIDUAL = 'INDIVIDUAL',
    }

    /**
     * The current status of the client
     */
    export enum status {
        PENDING = 'PENDING',
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
        DORMANT = 'DORMANT',
        CLOSED = 'CLOSED',
    }


}

