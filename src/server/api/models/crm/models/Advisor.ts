/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { AdvisorGroup } from './AdvisorGroup';

/**
 * Describes an advisor in the system. The fields marked with an * means that they are required.
 */
export type Advisor = {
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
     * The marital status of the advisor
     */
    maritalStatus: Advisor.maritalStatus;
    /**
     * Tags that can be used to describe the advisor skills
     */
    tags?: Array<string>;
    /**
     * The gender of the advisor
     */
    gender: Advisor.gender;
    /**
     * A system generated code for the advisor
     */
    code: string;
    /**
     * A label for the advisor record
     */
    label: string;
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
    address: Address;
    group: AdvisorGroup;
    /**
     * The date of birth
     */
    birthDate: string;
    /**
     * URL where the picture image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    pictureUrl?: string;
    /**
     * A reference code for the advisor record in an upstream system
     */
    refCode: string;
};

export namespace Advisor {

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

