/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an agent. The fields marked with an * means that they are required.
 */
export type InvestmentAgentRequest = {
    /**
     * The agent label
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The agent currency
     */
    currency: string;
    /**
     * The status of the agent
     */
    status: InvestmentAgentRequest.status;
    /**
     * The commission configuration for the agent
     */
    commissionId?: string;
    /**
     * The withholding tax configuration for the agent
     */
    withHoldingTaxId?: string;
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
     * The agent category
     */
    category: InvestmentAgentRequest.category;
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

export namespace InvestmentAgentRequest {

    /**
     * The status of the agent
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The agent category
     */
    export enum category {
        INDIVIDUAL = 'INDIVIDUAL',
        CORPORATE = 'CORPORATE',
        OTHERS = 'OTHERS',
    }


}

