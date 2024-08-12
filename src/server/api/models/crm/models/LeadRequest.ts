/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

/**
 * A JSON blob representing a lead. The fields marked with an * means that they are required.
 */
export type LeadRequest = {
    /**
     * The lead's client group Id. This is optional but is required if the lead is going to be converted to a client
     */
    clientGroupId?: string;
    /**
     * The marital status of the lead
     */
    maritalStatus?: LeadRequest.maritalStatus;
    /**
     * The gender of the lead
     */
    gender?: LeadRequest.gender;
    /**
     * A label for the lead record
     */
    label?: string;
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
     * A base 64 encoded representation of the picture or avatar. To delete this value when patching these records set the value to 'null'
     */
    picture?: string;
    /**
     * Tags that can be used to describe the lead skills
     */
    tags?: Array<string>;
    /**
     * The lead source
     */
    leadSource?: string;
    /**
     * The lead's organization if related to a corporate entity. This is required if the lead type is a corporate.
     */
    organization?: string;
    /**
     * The type of the lead
     */
    leadType: LeadRequest.leadType;
    /**
     * The ID of the advisor group that the lead is assigned to.
     */
    advisorGroupId?: string;
    /**
     * A reference number for the client record in an upstream system
     */
    refCode?: string;
};

export namespace LeadRequest {

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

