/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

/**
 * A JSON blob representing an advisor. The fields marked with an * means that they are required.
 */
export type AdvisorRequest = {
    /**
     * The advisor's group Id
     */
    groupId: string;
    /**
     * The marital status of the advisor
     */
    maritalStatus: AdvisorRequest.maritalStatus;
    /**
     * The gender of the advisor
     */
    gender: AdvisorRequest.gender;
    /**
     * A label for the advisor record
     */
    label?: string;
    /**
     * A title for the advisor record
     */
    title?: string;
    /**
     * Notes on the advisor record
     */
    notes?: string;
    /**
     * First name of the advisor
     */
    firstName: string;
    /**
     * Middle name of the advisor
     */
    middleName?: string;
    /**
     * Last name of the advisor
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
    address?: Address;
    /**
     * The date of birth
     */
    birthDate: string;
    /**
     * A base 64 encoded representation of the picture or avatar. To delete this value when patching these records set the value to 'null'
     */
    picture?: string;
    /**
     * Tags that can be used to describe the advisor skills
     */
    tags?: Array<string>;
    /**
     * A reference number for the advisor record in an upstream system
     */
    refCode?: string;
};

export namespace AdvisorRequest {

    /**
     * The marital status of the advisor
     */
    export enum maritalStatus {
        SINGLE = 'SINGLE',
        MARRIED = 'MARRIED',
    }

    /**
     * The gender of the advisor
     */
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        NA = 'NA',
    }


}

