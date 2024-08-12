/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TenantLicenceType } from './TenantLicenceType';
import type { TenantStatus } from './TenantStatus';

/**
 * A JSON blob representing a tenant record.
 */
export type TenantRequest = {
    /**
     * The tenant ID
     */
    tenantId: string;
    /**
     * The tenant label
     */
    tenantLabel: string;
    /**
     * The card institution identifier.
     */
    cardInstitutionId?: string | null;
    /**
     * The bank institution identifier.
     */
    bankInstitutionId?: string | null;
    defaultCurrency?: string | null;
    /**
     * The sort code assigned by a clearing institution.
     */
    bankSortCode?: string | null;
    /**
     * The admin username
     */
    adminUsername: string;
    /**
     * The batch username
     */
    batchUsername: string;
    /**
     * The admin email
     */
    adminEmail: string;
    /**
     * The admin group name
     */
    adminGroup: string;
    /**
     * The license file
     */
    licenseFile?: string | null;
    /**
     * The modules licensed by the tenant
     */
    licensedModules: Array<TenantLicenceType>;
    /**
     * The tenant status
     */
    status: TenantStatus;
    /**
     * A base 64 encoded representation of the tenants logo
     */
    logo?: string | null;
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
     * The footer that appears on statements
     */
    stmtFooter?: string | null;
    /**
     * The email address used to deliver statements
     */
    stmtMailFrom?: string | null;
    /**
     * The API key for subscribing to market data
     */
    marketDataApiKey?: string | null;
};

