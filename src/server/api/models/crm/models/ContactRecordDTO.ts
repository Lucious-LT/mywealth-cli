/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The records returned
 */
export type ContactRecordDTO = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id?: string;
    /**
     * A reference number for the contact record in an upstream system
     */
    refCode?: string;
    /**
     * A label for the contact record
     */
    label?: string;
    /**
     * The role that this contact plays in the contact record eg 'INDV_OWNER' for individual accounts.
     */
    role?: ContactRecordDTO.role;
    /**
     * The gender for individual contacts
     */
    gender?: ContactRecordDTO.gender;
    /**
     * First name of the contact
     */
    firstName?: string;
    /**
     * Middle name of the contact
     */
    middleName?: string;
    /**
     * Last name of the contact
     */
    lastName?: string;
    /**
     * The date of birth and should hold the incorporation date for corporate accounts
     */
    birthDate?: string;
    /**
     * The number of the document used to identify the contact
     */
    idNo?: string;
    /**
     * The clientType of document used to identify the contact
     */
    idType?: ContactRecordDTO.idType;
    /**
     * The expiration date of the ID document
     */
    idExpDate?: string;
    /**
     * A valid phone number
     */
    mobileNo?: string;
    /**
     * A valid email address
     */
    email?: string;
};

export namespace ContactRecordDTO {

    /**
     * The role that this contact plays in the contact record eg 'INDV_OWNER' for individual accounts.
     */
    export enum role {
        CORP_DIRECTOR = 'CORP_DIRECTOR',
        INDV_OWNER = 'INDV_OWNER',
        BENEFICIAL_OWNER = 'BENEFICIAL_OWNER',
        JOINT_PRIMARY = 'JOINT_PRIMARY',
        JOINT_SECONDARY = 'JOINT_SECONDARY',
        TRUST_ADMINISTRATOR = 'TRUST_ADMINISTRATOR',
        OTHER = 'OTHER',
        NEXT_OF_KIN = 'NEXT_OF_KIN',
    }

    /**
     * The gender for individual contacts
     */
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        NA = 'NA',
    }

    /**
     * The clientType of document used to identify the contact
     */
    export enum idType {
        PASSPORT = 'PASSPORT',
        NATIONAL_ID = 'NATIONAL_ID',
        DRIVERS_LICENSE = 'DRIVERS_LICENSE',
        COMPANY_ID = 'COMPANY_ID',
        VOTER_ID = 'VOTER_ID',
        BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
        RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
        WORK_PERMIT = 'WORK_PERMIT',
        STUDENT_ID = 'STUDENT_ID',
        SOCIAL_SECURITY_CARD = 'SOCIAL_SECURITY_CARD',
        CERTIFICATE_OF_CITIZENSHIP = 'CERTIFICATE_OF_CITIZENSHIP',
        CERTIFICATE_OF_INCORPORATION = 'CERTIFICATE_OF_INCORPORATION',
        CERTIFICATE_OF_LIQUIDATION = 'CERTIFICATE_OF_LIQUIDATION',
        CERTIFICATE_OF_NATURALIZATION = 'CERTIFICATE_OF_NATURALIZATION',
        CERTIFICATE_OF_RESIDENCE = 'CERTIFICATE_OF_RESIDENCE',
        UTILITY_BILL = 'UTILITY_BILL',
        BANK_STATEMENT = 'BANK_STATEMENT',
        PAYSLIP = 'PAYSLIP',
        TAX_RETURN = 'TAX_RETURN',
        OTHER_DOCUMENTS = 'OTHER_DOCUMENTS',
    }


}

