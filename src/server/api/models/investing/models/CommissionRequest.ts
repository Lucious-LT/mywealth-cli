/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommissionSlabRequest } from './CommissionSlabRequest';

/**
 * A JSON blob representing commission. The fields marked with an * means that they are required.
 */
export type CommissionRequest = {
    /**
     * The status of the rule. See the enumeration for acceptable values.
     */
    status: CommissionRequest.status;
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
    rateType: CommissionRequest.rateType;
    /**
     * The default rate for interest calculations
     */
    defaultRate: number;
    /**
     * The minimum rate for interest calculations
     */
    minRate: number;
    /**
     * The maximum rate for interest calculations
     */
    maxRate: number;
    /**
     * The fixed amount that is added to the calculated value
     */
    fixedAmount: number;
    /**
     * The slab entries
     */
    commissionSlabs?: Array<CommissionSlabRequest>;
};

export namespace CommissionRequest {

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

