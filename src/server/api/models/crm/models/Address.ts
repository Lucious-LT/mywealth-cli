/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes an address in the system
 */
export type Address = {
    id?: string;
    type: Address.type;
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
    postCode: string;
    /**
     * A valid country code @See https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes for values
     */
    country: string;
};

export namespace Address {

    export enum type {
        PRIMARY = 'PRIMARY',
        ALTERNATE = 'ALTERNATE',
    }


}

