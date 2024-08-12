/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a registrar. The fields marked with an * means that they are required.
 */
export type InvestmentRegistrarRequest = {
    /**
     * The registrar label
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The registrar currency
     */
    currency: string;
    /**
     * The status of the registrar
     */
    status: InvestmentRegistrarRequest.status;
    /**
     * A reference number for the account record in an upstream system
     */
    refCode?: string;
    /**
     * A reference number for the account record in an upstream system
     */
    email: string;
    /**
     * A reference number for the account record in an upstream system
     */
    phone: string;
    /**
     * The first address line
     */
    addressLine1: string;
    /**
     * The second address line
     */
    addressLine2?: string;
    /**
     * The address city
     */
    city: string;
    /**
     * The address state
     */
    state: string;
    /**
     * The address post code
     */
    postCode?: string;
    /**
     * A valid country code @See https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for values
     */
    country: string;
};

export namespace InvestmentRegistrarRequest {

    /**
     * The status of the registrar
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }


}

