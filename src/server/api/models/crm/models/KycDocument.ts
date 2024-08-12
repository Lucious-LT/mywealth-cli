/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { KycReport } from './KycReport';

/**
 * A JSON blob representing a KYC request. The fields marked with an * means that they are required.
 */
export type KycDocument = {
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
     * The record category submitted.
     */
    recordType: KycDocument.recordType;
    /**
     * The type of ID document submitted.
     */
    idType?: KycDocument.idType;
    /**
     * An optional ID no. This is required for electronic ID validation workflows
     */
    idNo?: string;
    /**
     * Optionally specify the authority that issued the document
     */
    idIssuer?: string;
    /**
     * The expiration date of the ID document
     */
    idExpDate?: string;
    /**
     * The status of record. This will be updated by the compliance service when it has been processed
     */
    status: KycDocument.status;
    /**
     * The type of file
     */
    fileType?: string;
    /**
     * The name of the file
     */
    fileName?: string;
    /**
     * The size of the uploaded document
     */
    fileSize?: number;
    /**
     * Any notes on the document
     */
    notes?: string;
    /**
     * The expiration date of the document
     */
    validUntil?: string;
    kycReport?: KycReport;
    /**
     * URL where the document image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    fileUrl?: string;
    contactId?: string;
    clientId?: string;
};

export namespace KycDocument {

    /**
     * The record category submitted.
     */
    export enum recordType {
        PICTURE = 'PICTURE',
        SIGNATURE = 'SIGNATURE',
        IDENTITY = 'IDENTITY',
        ADDRESS = 'ADDRESS',
        OTHERS = 'OTHERS',
    }

    /**
     * The type of ID document submitted.
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
     * The status of record. This will be updated by the compliance service when it has been processed
     */
    export enum status {
        SUBMITTED = 'SUBMITTED',
        ACCEPTED = 'ACCEPTED',
        PROCESSED = 'PROCESSED',
        DELIVERED = 'DELIVERED',
        REJECTED = 'REJECTED',
    }


}

