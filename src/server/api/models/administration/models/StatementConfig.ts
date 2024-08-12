/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a tenant's statement parameters.
 */
export type StatementConfig = {
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
    stmtMailFrom?: string | null;
    defaultCurrency?: string | null;
};

