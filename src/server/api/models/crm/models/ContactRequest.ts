/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

/**
 * A JSON blob representing a contact. The fields marked with an * means that they are required.
 */
export type ContactRequest = {
    /**
     * The contact's ID. If not specified a new contact record will be created
     */
    id?: string;
    /**
     * The role that this contact plays in the contact record eg 'INDV_OWNER' for individual accounts.
     */
    role: ContactRequest.role;
    /**
     * The marital status for individual contacts
     */
    maritalStatus: ContactRequest.maritalStatus;
    /**
     * The gender for individual contacts
     */
    gender: ContactRequest.gender;
    /**
     * A reference number for the contact record in an upstream system
     */
    refCode?: string;
    /**
     * A label for the contact record
     */
    label?: string;
    /**
     * A title for the contact record
     */
    title: ContactRequest.title;
    /**
     * Notes on the contact record
     */
    notes?: string;
    /**
     * First name of the contact
     */
    firstName: string;
    /**
     * Middle name of the contact
     */
    middleName?: string;
    /**
     * Last name of the contact
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
     * A unique username for the contact
     */
    username?: string;
    /**
     * Indicates if this contact is allowed to login
     */
    grantLoginAccess: boolean;
    /**
     * A password that matches the configured pattern eg '((?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,100})'
     */
    password?: string;
    /**
     * The date of birth and should hold the incorporation date for corporate accounts
     */
    birthDate: string;
    /**
     * The number of the document used to identify the contact
     */
    idNo?: string;
    /**
     * The number of the document used to identify in the financial system eg BVN
     */
    finIdNo?: string;
    /**
     * The clientType of document used to identify the contact
     */
    idType?: ContactRequest.idType;
    /**
     * The expiration date of the ID document
     */
    idExpDate?: string;
    /**
     * The contact's profession
     */
    profession?: string;
    /**
     * The contact's nationality
     */
    nationality?: string;
    /**
     * The contact's total net worth range
     */
    networthTotalRange?: ContactRequest.networthTotalRange;
    /**
     * The contact's annual income range
     */
    annualIncomeRange?: ContactRequest.annualIncomeRange;
    /**
     * The contact's liquid net worth range
     */
    networthLiquidRange?: ContactRequest.networthLiquidRange;
    /**
     * The contact's source of wealth
     */
    sourceOfWealth?: ContactRequest.sourceOfWealth;
    /**
     * The contact's investment knowledge or sophistication
     */
    investmentExperience?: ContactRequest.investmentExperience;
    /**
     * The contact's risk tolerance
     */
    riskTolerance?: ContactRequest.riskTolerance;
    /**
     * The employer's name
     */
    employerName?: string;
    /**
     * The employer's address
     */
    employerAddress?: string;
    /**
     * The contact's risk tolerance
     */
    investmentObj?: ContactRequest.investmentObj;
    /**
     * Indicates if the contact is flagged as a risk for money laundering infractions
     */
    moneyLaunderingRisk?: boolean;
    /**
     * Indicates if the contact is politically exposed
     */
    politicallyExposed?: boolean;
    /**
     * Indicates if the contact has a prior criminal conviction
     */
    criminalConviction?: boolean;
    /**
     * URL where the picture image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    pictureUrl?: string;
    /**
     * URL where the signature is stored. This is system generated.
     */
    signatureUrl?: string;
};

export namespace ContactRequest {

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
     * The marital status for individual contacts
     */
    export enum maritalStatus {
        SINGLE = 'SINGLE',
        MARRIED = 'MARRIED',
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
     * A title for the contact record
     */
    export enum title {
        MR = 'MR',
        MRS = 'MRS',
        MISS = 'MISS',
        DR = 'DR',
        PROF = 'PROF',
        REV = 'REV',
        OTHER_TITLES = 'OTHER_TITLES',
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

    /**
     * The contact's total net worth range
     */
    export enum networthTotalRange {
        LESS_THAN_100K = 'LESS_THAN_100K',
        LESS_THAN_250K = 'LESS_THAN_250K',
        LESS_THAN_500K = 'LESS_THAN_500K',
        LESS_THAN_1M = 'LESS_THAN_1M',
        LESS_THAN_5M = 'LESS_THAN_5M',
        LESS_THAN_10M = 'LESS_THAN_10M',
        LESS_THAN_25M = 'LESS_THAN_25M',
        LESS_THAN_50M = 'LESS_THAN_50M',
        LESS_THAN_100M = 'LESS_THAN_100M',
        LESS_THAN_250M = 'LESS_THAN_250M',
        LESS_THAN_500M = 'LESS_THAN_500M',
        LESS_THAN_1B = 'LESS_THAN_1B',
        MORE_THAN_1B = 'MORE_THAN_1B',
    }

    /**
     * The contact's annual income range
     */
    export enum annualIncomeRange {
        LESS_THAN_100K = 'LESS_THAN_100K',
        LESS_THAN_250K = 'LESS_THAN_250K',
        LESS_THAN_500K = 'LESS_THAN_500K',
        LESS_THAN_1M = 'LESS_THAN_1M',
        LESS_THAN_5M = 'LESS_THAN_5M',
        LESS_THAN_10M = 'LESS_THAN_10M',
        LESS_THAN_25M = 'LESS_THAN_25M',
        LESS_THAN_50M = 'LESS_THAN_50M',
        LESS_THAN_100M = 'LESS_THAN_100M',
        LESS_THAN_250M = 'LESS_THAN_250M',
        LESS_THAN_500M = 'LESS_THAN_500M',
        LESS_THAN_1B = 'LESS_THAN_1B',
        MORE_THAN_1B = 'MORE_THAN_1B',
    }

    /**
     * The contact's liquid net worth range
     */
    export enum networthLiquidRange {
        LESS_THAN_100K = 'LESS_THAN_100K',
        LESS_THAN_250K = 'LESS_THAN_250K',
        LESS_THAN_500K = 'LESS_THAN_500K',
        LESS_THAN_1M = 'LESS_THAN_1M',
        LESS_THAN_5M = 'LESS_THAN_5M',
        LESS_THAN_10M = 'LESS_THAN_10M',
        LESS_THAN_25M = 'LESS_THAN_25M',
        LESS_THAN_50M = 'LESS_THAN_50M',
        LESS_THAN_100M = 'LESS_THAN_100M',
        LESS_THAN_250M = 'LESS_THAN_250M',
        LESS_THAN_500M = 'LESS_THAN_500M',
        LESS_THAN_1B = 'LESS_THAN_1B',
        MORE_THAN_1B = 'MORE_THAN_1B',
    }

    /**
     * The contact's source of wealth
     */
    export enum sourceOfWealth {
        GIFTS = 'GIFTS',
        INHERITANCE = 'INHERITANCE',
        BUSINESS = 'BUSINESS',
        EMPLOYMENT = 'EMPLOYMENT',
        INVESTMENTS = 'INVESTMENTS',
        OTHER_SOURCES = 'OTHER_SOURCES',
    }

    /**
     * The contact's investment knowledge or sophistication
     */
    export enum investmentExperience {
        NOVICE = 'NOVICE',
        INTERMEDIATE = 'INTERMEDIATE',
        EXPERIENCED = 'EXPERIENCED',
    }

    /**
     * The contact's risk tolerance
     */
    export enum riskTolerance {
        CONSERVATIVE = 'CONSERVATIVE',
        MODERATE_CONSERVATIVE = 'MODERATE_CONSERVATIVE',
        MODERATE = 'MODERATE',
        MODERATE_AGGRESSIVE = 'MODERATE_AGGRESSIVE',
        AGGRESSIVE = 'AGGRESSIVE',
    }

    /**
     * The contact's risk tolerance
     */
    export enum investmentObj {
        CAPITAL_PRESERVATION = 'CAPITAL_PRESERVATION',
        RETIREMENT_INCOME = 'RETIREMENT_INCOME',
        AGGRESSIVE_GROWTH = 'AGGRESSIVE_GROWTH',
    }


}

