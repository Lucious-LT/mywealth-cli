/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ContactKycDTO = {
    role?: ContactKycDTO.role;
    gender?: ContactKycDTO.gender;
    maritalStatus?: ContactKycDTO.maritalStatus;
    title?: ContactKycDTO.title;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    username?: string;
    birthDate?: string;
    idNo?: string;
    idType?: ContactKycDTO.idType;
    idExpDate?: string;
    profession?: string;
    nationality?: string;
    mobileNo?: string;
    email?: string;
    notes?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postCode?: string;
    country?: string;
};

export namespace ContactKycDTO {

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

    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        NA = 'NA',
    }

    export enum maritalStatus {
        SINGLE = 'SINGLE',
        MARRIED = 'MARRIED',
    }

    export enum title {
        MR = 'MR',
        MRS = 'MRS',
        MISS = 'MISS',
        DR = 'DR',
        PROF = 'PROF',
        REV = 'REV',
        OTHER_TITLES = 'OTHER_TITLES',
    }

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

