/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';
import type { TenantLicenceType } from './TenantLicenceType';
import type { TenantStatus } from './TenantStatus';

export type Tenant = {
    id?: ObjectId | null;
    /**
     * The tenant that this record belongs to.
     */
    tenant: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * The tenant identifier.
     */
    tenantId: string;
    /**
     * The label of the tenant record
     */
    tenantLabel: string;
    /**
     * The institution identifier assigned by a card processing network eg VISA or MASTERCARD.
     */
    cardInstitutionId?: string | null;
    /**
     * The financial institution code assigned by a reserve or central bank. For example in Nigeria DMBs will have a numbers like 000011 and OFIs 950547. It is important to ensure that the padding convention is applied when this number is configured as it is used when generating valid bank account numbers eg NUBAN in some markets.
     */
    bankInstitutionId?: string | null;
    /**
     * The sort code assigned by a clearing institution.
     */
    bankSortCode?: string | null;
    /**
     * The default currency used by this tenant
     */
    defaultCurrency?: string | null;
    /**
     * The username of the tenant administrator
     */
    adminUsername: string;
    /**
     * The username for batch jobs
     */
    batchUsername: string;
    /**
     * The oidc group code generated for the tenant
     */
    adminGroup: string;
    /**
     * The email address of the tenant administrator
     */
    adminEmail: string;
    /**
     * The modules licensed by the tenant
     */
    licensedModules: Array<TenantLicenceType>;
    /**
     * The status of the tenant
     */
    status: TenantStatus;
    /**
     * The license file
     */
    licenseFile?: string | null;
    /**
     * Indicates if this tenant has been setup on the OIDC platform
     */
    syncedWithOIDC?: boolean;
    /**
     * Holds the tenant logo
     */
    logo?: Blob | null;
    /**
     * The first address line
     */
    stmtAddressLine1?: string | null;
    /**
     * The second address line
     */
    stmtAddressLine2?: string | null;
    /**
     * The address city
     */
    stmtCity?: string | null;
    /**
     * The address state
     */
    stmtState?: string | null;
    /**
     * The address post code
     */
    stmtPostCode?: string | null;
    /**
     * A valid country code @See https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for values
     */
    stmtCountry?: string | null;
    /**
     * The company / legal entity phone
     */
    stmtPhone?: string | null;
    /**
     * The company / legal entity email
     */
    stmtEmail?: string | null;
    /**
     * The company / legal entity website
     */
    stmtWebsite?: string | null;
    /**
     * The name of the entity that is displayed in statements
     */
    stmtEntityName?: string | null;
    /**
     * The email address used to deliver statements
     */
    stmtMailFrom?: string | null;
    /**
     * The footer that appears on statements
     */
    stmtFooter?: string | null;
    /**
     * The API key for subscribing to market data
     */
    marketDataApiKey?: string | null;
};

