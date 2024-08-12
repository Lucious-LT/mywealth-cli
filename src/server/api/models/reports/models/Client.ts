/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientBusinessStructure } from './ClientBusinessStructure';
import type { ClientStatus } from './ClientStatus';
import type { ClientType } from './ClientType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Client = {
    /**
     * The unique ID for the record generated in the DW. This is the ID that is used in all facts that reference this dimension
     */
    whId?: number;
    /**
     * The unique ID for the record from the source service.
     */
    serviceId: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * The service that generated the data
     */
    service: string;
    deleted: boolean;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * The type of client and this is typically 'INDIVIDUAL' for individual accounts or 'CORPORATE' for legal entities such as trusts.
     */
    clientType: ClientType;
    /**
     * The business structure for corporate clients. This is required if the client type is 'CORP'
     */
    businessStructure?: ClientBusinessStructure | null;
    /**
     * The certificate # or ID issued by state or federal agency that incorporated the business
     */
    businessIncCode?: string | null;
    /**
     * URL where the picture image is stored. This is system generated and used by the KYC AI based classification service during the identity verification workflow.
     */
    pictureUrl?: string | null;
    /**
     * Notes on the client record
     */
    notes?: string | null;
    /**
     * The current status of the client
     */
    status: ClientStatus;
    /**
     * The unique system generated client code
     */
    code: string;
    /**
     * A reference code for the client record in an upstream system
     */
    refCode?: string | null;
    /**
     * A label for the client record
     */
    label: string;
    /**
     * A valid phone number
     */
    mobileNo: string;
    /**
     * A valid email address
     */
    email: string;
    /**
     * The email address to use for notification and defaults to the primary email if not specified
     */
    notificationEmail?: string | null;
    /**
     * The date that the relationship started. Defaults to the current date if not provided.
     */
    relationshipStartDate: LocalDate;
    /**
     * A valid phone number
     */
    officeNo?: string | null;
    /**
     * A system generated referral code when none is provided
     */
    referralCode?: string | null;
    /**
     * The default valuation currency for the client.
     */
    valuationCurrency: string;
    /**
     * The unique ID for the client group.
     */
    groupId?: UUID | null;
    /**
     * The warehouse ID for the client group.
     */
    whGroupId?: number | null;
    /**
     * The unique ID for the advisor group.
     */
    advisorGroupId?: UUID | null;
    /**
     * The warehouse ID for the advisor group.
     */
    whAdvisorGroupId?: number | null;
    /**
     * The advisor code
     */
    advisorCode?: string | null;
    /**
     * The advisor label
     */
    advisorLabel?: string | null;
    /**
     * The advisor email
     */
    advisorEmail?: string | null;
    /**
     * The unique ID for the kyc tier.
     */
    kycTierId?: UUID | null;
    /**
     * The warehouse ID for the kyc tier.
     */
    whKycTierId?: number | null;
    /**
     * The settlement bank name
     */
    stlBankName?: string | null;
    /**
     * The settlement bank routing number
     */
    stlBankRoutingNo?: string | null;
    /**
     * The settlement bank swift code
     */
    stlBankSwiftCode?: string | null;
    /**
     * The settlement bank branch
     */
    stlBankBranch?: string | null;
    /**
     * The settlement bank address
     */
    stlBankAddress?: string | null;
    /**
     * The settlement account name
     */
    stlBankAccountName?: string | null;
    /**
     * The settlement account number
     */
    stlBankAccountNo?: string | null;
    /**
     * The settlement bank account opening date
     */
    stlBankAccountOpenDate?: LocalDate | null;
    /**
     * The address type
     */
    addressType: string;
    /**
     * The address line 1
     */
    addressLine1: string;
    /**
     * The address line 2
     */
    addressLine2?: string | null;
    /**
     * The address city
     */
    addressCity: string;
    /**
     * The address state
     */
    addressState: string;
    /**
     * The address post code
     */
    addressPostCode: string;
    /**
     * The address country
     */
    addressCountry: string;
    contactRole: string;
    contactMaritalStatus: string;
    contactGender: string;
    contactRefCode?: string | null;
    contactLabel: string;
    contactTitle: string | null;
    contactFirstName: string;
    contactMiddleName?: string | null;
    contactLastName: string;
    contactEmail: string;
    contactMobileNo: string;
    contactOfficeNo?: string | null;
    contactBirthDate: LocalDate;
    contactIdNo?: string | null;
    contactFinIdNo?: string | null;
    contactIdType?: string | null;
    contactIdExpDate?: LocalDate | null;
    contactProfession?: string | null;
    contactNationality?: string | null;
    contactNetworthTotalRange?: string | null;
    contactAnnualIncomeRange?: string | null;
    contactNetworthLiquidRange?: string | null;
    contactSourceOfWealth?: string | null;
    contactInvestmentExperience?: string | null;
    contactRiskTolerance?: string | null;
    contactEmployerName?: string | null;
    contactEmployerAddress?: string | null;
    contactInvestmentObj?: string | null;
    contactMoneyLaunderingRisk?: boolean | null;
    contactPoliticallyExposed?: boolean | null;
    contactCriminalConviction?: boolean | null;
};

