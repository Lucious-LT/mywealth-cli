/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a broker. The fields marked with an * means that they are required.
 */
export type InvestmentBroker = {
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
     * A unique broker code
     */
    code: string;
    /**
     * A reference code for the account record in an upstream system
     */
    refCode: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The broker account currency
     */
    currency: string;
    /**
     * The broker name or label
     */
    label: string;
    /**
     * The status of the broker
     */
    status: InvestmentBroker.status;
    /**
     * A valid email address
     */
    email: string;
    /**
     * A valid phone number
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
    /**
     * The cash balance for the account
     */
    cashBalance: number;
    /**
     * Indicates when the balance was updated.
     */
    balanceTime?: string;
};

export namespace InvestmentBroker {

    /**
     * The status of the broker
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }


}

