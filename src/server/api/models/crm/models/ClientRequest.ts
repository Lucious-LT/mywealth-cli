/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { ContactRequest } from './ContactRequest';

/**
 * A JSON blob representing a client. The fields marked with an * means that they are required.
 */
export type ClientRequest = {
    /**
     * The clientType of client and this is typically 'INDIVIDUAL' for individual accounts or 'CORPORATE' for legal entities such as trusts.
     */
    clientType: ClientRequest.clientType;
    /**
     * The business structure for corporate clients. This is required if the client clientType is 'CORPORATE'
     */
    businessStructure?: ClientRequest.businessStructure;
    /**
     * A reference number for the client record in an upstream system
     */
    refCode?: string;
    /**
     * A label for the client record
     */
    label?: string;
    /**
     * Notes on the client record
     */
    notes?: string;
    /**
     * A valid email address
     */
    email: string;
    /**
     * The email address to use for notification and defaults to the primary email if not specified
     */
    notificationEmail?: string;
    /**
     * A valid phone number
     */
    mobileNo: string;
    /**
     * A valid phone number
     */
    officeNo?: string;
    /**
     * The default valuation currency for the client.
     */
    valuationCurrency: string;
    /**
     * The client's group Id. This is the group that the client belongs to.
     */
    groupId: string;
    /**
     * The client's advisor group Id. This is the advisor group (team) responsible for managing the relationship. You can create and use a team with only 1 member if you intend to attach only 1 employee/advisor to the client.
     */
    advisorGroupId?: string;
    /**
     * The client's kyc tier Id. This is the kyc tier assigned to the client
     */
    kycTierId?: string;
    /**
     * Address records for the client. You can have multiple addresses for a client, but only one can be the primary address.
     */
    address: Array<Address>;
    /**
     * Contact records for the client.
     * If the client clientType is INDIVIDUAL then you must have only 1 contact with a role of INDV_OWNER and the others can only be NEXT_OF_KIN or OTHER.
     * If the client clientType is JOINT then you must have 2 or more contacts with only 1 JOINT_PRIMARY & 1 JOINT_SECONDARY and the others can only be NEXT_OF_KIN or OTHER.
     * If the client clientType is CORPORATE then you must have at least 1 BENEFICIAL_OWNER and the others can only be CORP_DIRECTOR, NEXT_OF_KIN or OTHER
     * If the client clientType is a TRUST then you must have at least 1 BENEFICIAL_OWNER and 1 TRUST_ADMINISTRATOR and the others can only be NEXT_OF_KIN or OTHER
     *
     */
    contact: Array<ContactRequest>;
    /**
     * A base 64 encoded representation of the picture or avatar. To delete this value when patching these records set the value to 'null'
     */
    picture?: string;
    /**
     * The certificate # or ID issued by state or federal agency that incorporated the business
     */
    businessIncCode?: string;
    /**
     * Indicates if the account should automatically be approved when created. Note that this flag only applies when creating a new client record and defaults to false
     */
    autoApprove?: boolean;
    /**
     * The date that the relationship started. Defaults to the current date if not provided.
     */
    relationshipStartDate?: string;
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
    /**
     * The ID of the advisor. The advisor within the team that the client is assigned to.
     */
    advisorId?: string;
};

export namespace ClientRequest {

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
     * The business structure for corporate clients. This is required if the client clientType is 'CORPORATE'
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


}

