/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

/**
 * Describes a lead in the system. The fields marked with an * means that they are required.
 */
export type Lead = {
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
     * The status of the lead
     */
    status: Lead.status;
    /**
     * The marital status of the lead
     */
    maritalStatus?: Lead.maritalStatus;
    /**
     * Tags that can be used to describe the lead profile
     */
    tags?: Array<string>;
    /**
     * The gender of the lead
     */
    gender?: Lead.gender;
    /**
     * The type of the lead
     */
    leadType: Lead.leadType;
    /**
     * A system generated code for the lead
     */
    code: string;
    /**
     * A reference code for the client record in an upstream system
     */
    refCode: string;
    /**
     * A label for the lead record
     */
    label: string;
    /**
     * A title for the lead record
     */
    title?: string;
    /**
     * Notes on the lead record
     */
    notes?: string;
    /**
     * First name of the lead
     */
    firstName: string;
    /**
     * Middle name of the lead
     */
    middleName?: string;
    /**
     * The lead source
     */
    leadSource?: string;
    /**
     * The lead's organization if related to a corporate entity. This is required if the lead type is a corporate.
     */
    organization?: string;
    /**
     * Last name of the lead
     */
    lastName: string;
    /**
     * A valid email address
     */
    email: string;
    /**
     * A valid phone number
     */
    mobileNo: string;
    /**
     * A valid phone number
     */
    officeNo?: string;
    address: Address;
    /**
     * The date of birth
     */
    birthDate?: string;
    /**
     * The client ID generated when the lead was converted
     */
    clientId?: string;
    /**
     * URL where the picture image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    pictureUrl?: string;
    /**
     * The advisor group id
     */
    advisorGroupId?: string;
    /**
     * The advisor group code
     */
    advisorGroupCode?: string;
    /**
     * The advisor group label
     */
    advisorGroupLabel?: string;
    /**
     * The client group id
     */
    clientGroupId?: string;
    /**
     * The client group code
     */
    clientGroupCode?: string;
    /**
     * The client group label
     */
    clientGroupLabel?: string;
};

export namespace Lead {

    /**
     * The status of the lead
     */
    export enum status {
        NEW = 'NEW',
        ASSIGNED = 'ASSIGNED',
        CONVERTED = 'CONVERTED',
        CLOSED = 'CLOSED',
    }

    /**
     * The marital status of the lead
     */
    export enum maritalStatus {
        SINGLE = 'SINGLE',
        MARRIED = 'MARRIED',
    }

    /**
     * The gender of the lead
     */
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        NA = 'NA',
    }

    /**
     * The type of the lead
     */
    export enum leadType {
        CORPORATE = 'CORPORATE',
        INDIVIDUAL = 'INDIVIDUAL',
        JOINT = 'JOINT',
        TRUST = 'TRUST',
    }


}

