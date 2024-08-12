/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { AdvisorGroup } from './AdvisorGroup';
import type { ClientGroup } from './ClientGroup';
import type { Contact } from './Contact';
import type { KycTier } from './KycTier';

/**
 * A JSON blob representing a client. The fields marked with an * means that they are required.
 */
export type Client = {
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
     * The clientType of client and this is typically 'INDIVIDUAL' for individual accounts or 'CORPORATE' for legal entities such as trusts.
     */
    clientType: Client.clientType;
    /**
     * The business structure for corporate clients. This is required if the client clientType is 'CORP'
     */
    businessStructure?: Client.businessStructure;
    /**
     * The certificate # or ID issued by state or federal agency that incorporated the business
     */
    businessIncCode?: string;
    /**
     * The current status of the client
     */
    status: Client.status;
    /**
     * The unique system generated client code
     */
    code: string;
    /**
     * A reference code for the client record in an upstream system
     */
    refCode: string;
    /**
     * The date that the relationship started. Defaults to the current date if not provided.
     */
    relationshipStartDate: string;
    /**
     * A label for the client record
     */
    label: string;
    /**
     * Notes on the client record
     */
    notes?: string;
    /**
     * A valid phone number
     */
    mobileNo: string;
    /**
     * A valid phone number
     */
    officeNo?: string;
    /**
     * A system generated referral code used by the loyalty service
     */
    referralCode?: string;
    /**
     * Address records for the client. You can have multiple addresses for a client, but only one can be the primary address.
     */
    address?: Array<Address>;
    /**
     * Contact records for the client.
     * If the client clientType is INDIVIDUAL then you must have only 1 contact with a role of INDV_OWNER and the others can only be NEXT_OF_KIN or OTHER.
     * If the client clientType is JOINT then you must have 2 or more contacts with only 1 JOINT_PRIMARY & 1 JOINT_SECONDARY and the others can only be NEXT_OF_KIN or OTHER.
     * If the client clientType is CORPORATE then you must have at least 1 BENEFICIAL_OWNER and the others can only be CORP_DIRECTOR, NEXT_OF_KIN or OTHER
     * If the client clientType is a TRUST then you must have at least 1 BENEFICIAL_OWNER and 1 TRUST_ADMINISTRATOR and the others can only be NEXT_OF_KIN or OTHER
     *
     */
    contact: Array<Contact>;
    /**
     * The default valuation currency for the client.
     */
    valuationCurrency: string;
    group?: ClientGroup;
    advisorGroup?: AdvisorGroup;
    kycTier?: KycTier;
    /**
     * A valid email address
     */
    email: string;
    /**
     * The email address to use for notification and defaults to the primary email if not specified
     */
    notificationEmail?: string;
    /**
     * URL where the picture image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    pictureUrl?: string;
    /**
     * The settlement bank name
     */
    stlBankName?: string;
    /**
     * The settlement bank routing number
     */
    stlBankRoutingNo?: string;
    /**
     * The settlement bank swift code
     */
    stlBankSwiftCode?: string;
    /**
     * The settlement bank branch
     */
    stlBankBranch?: string;
    /**
     * The settlement bank address
     */
    stlBankAddress?: string;
    /**
     * The settlement account name
     */
    stlBankAccountName?: string;
    /**
     * The settlement account number
     */
    stlBankAccountNo?: string;
    /**
     * The settlement bank account opening date
     */
    stlBankAccountOpenDate?: string;
    advisorLabel?: string;
    advisorEmail?: string;
    advisorId?: string;
    advisorCode?: string;
};

export namespace Client {

    /**
     * The clientType of client and this is typically 'INDIVIDUAL' for individual accounts or 'CORPORATE' for legal entities such as trusts.
     */
    export enum clientType {
        CORPORATE = 'CORPORATE',
        JOINT = 'JOINT',
        TRUST = 'TRUST',
        INDIVIDUAL = 'INDIVIDUAL',
    }

    /**
     * The business structure for corporate clients. This is required if the client clientType is 'CORP'
     */
    export enum businessStructure {
        MULTI_MEMBER_LLC = 'MULTI_MEMBER_LLC',
        SINGLE_MEMBER_LLC = 'SINGLE_MEMBER_LLC',
        NON_PROFIT = 'NON_PROFIT',
        GOVERNMENT_AGENCY = 'GOVERNMENT_AGENCY',
        PRIVATE_CORPORATION = 'PRIVATE_CORPORATION',
        PUBLIC_CORPORATION = 'PUBLIC_CORPORATION',
        PARTNERSHIP = 'PARTNERSHIP',
        SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
        TRUST = 'TRUST',
        OTHER = 'OTHER',
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

