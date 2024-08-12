/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WithHoldingTaxSlabRequest } from './WithHoldingTaxSlabRequest';

/**
 * A JSON blob representing withholding ta. The fields marked with an * means that they are required.
 */
export type WithHoldingTaxRequest = {
    /**
     * The status of the rule. See the enumeration for acceptable values.
     */
    status: WithHoldingTaxRequest.status;
    /**
     * A text recordId that describes the commission
     */
    label: string;
    /**
     * Any notes that apply to this commission
     */
    notes?: string;
    /**
     * The currency for the commission values.
     */
    currency: string;
    /**
     * The start date for the commission
     */
    startDate: string;
    /**
     * The end date for the commission
     */
    endDate: string;
    /**
     * The type of model
     */
    rateType: WithHoldingTaxRequest.rateType;
    /**
     * The default rate for tax calculations
     */
    defaultRate: number;
    /**
     * The fixed amount that is added to the calculated value
     */
    fixedAmount: number;
    /**
     * The slab entries
     */
    taxSlabs?: Array<WithHoldingTaxSlabRequest>;
    /**
     * The GL account label used to process the wht liability
     */
    withholdingTaxAccountId: string;
};

export namespace WithHoldingTaxRequest {

    /**
     * The status of the rule. See the enumeration for acceptable values.
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The type of model
     */
    export enum rateType {
        FIXED = 'FIXED',
        TIERED = 'TIERED',
    }


}

