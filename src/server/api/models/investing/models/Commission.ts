/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommissionSlab } from './CommissionSlab';

/**
 * A JSON blob representing a commission. The fields marked with an * means that they are required.When processing a transaction, the commission is calculated based on the commission type and the transaction amount.If the rate type is fixed, the default rate is used. If the rate type is tiered, the rate is calculated based on the configured tiers.If a tier is not found, the default rate is used. The fixed amount is added to the calculated value.
 */
export type Commission = {
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
     * The status of the rule. See the enumeration for acceptable values.
     */
    status: Commission.status;
    /**
     * A unique commission code that is generated by the investing service.
     */
    code: string;
    /**
     * A text that describes the commission
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
     * The rate type
     */
    rateType: Commission.rateType;
    /**
     * The default rate
     */
    defaultRate: number;
    /**
     * The fixed amount that is added to the calculated value
     */
    fixedAmount: number;
    /**
     * The minimum rate for fixed rates
     */
    minRate: number;
    /**
     * The maximum rate for fixed rates
     */
    maxRate: number;
    commissionSlabs?: Array<CommissionSlab>;
};

export namespace Commission {

    /**
     * The status of the rule. See the enumeration for acceptable values.
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The rate type
     */
    export enum rateType {
        FIXED = 'FIXED',
        TIERED = 'TIERED',
    }


}

