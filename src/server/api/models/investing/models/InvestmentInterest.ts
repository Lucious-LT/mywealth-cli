/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvestmentInterestSlab } from './InvestmentInterestSlab';

/**
 * A JSON blob representing a product interest. The fields marked with an * means that they are required.
 */
export type InvestmentInterest = {
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
     * A unique model code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The interest model description
     */
    label: string;
    /**
     * The status of the interest model
     */
    status: InvestmentInterest.status;
    /**
     * The source of the interest rate
     */
    rateType: InvestmentInterest.rateType;
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
     * Indicates the day count convention. This has to be specified for products that pay interest
     */
    interestRateDays: InvestmentInterest.interestRateDays;
    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    balanceType: InvestmentInterest.balanceType;
    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    paymentFrequency: InvestmentInterest.paymentFrequency;
    interestSlabs?: Array<InvestmentInterestSlab>;
    /**
     * The reference rate instrument from the treasury service
     */
    indexRateId?: string;
    /**
     * Indicates the frequency at which the index rate will be updated for the product.This has to be specified for products that use index rates.
     */
    indexUpdateFrequency?: InvestmentInterest.indexUpdateFrequency;
    /**
     * The current index rate for interest calculations. This is updated based on the specified frequency
     */
    currentIndexRate?: number;
};

export namespace InvestmentInterest {

    /**
     * The status of the interest model
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The source of the interest rate
     */
    export enum rateType {
        FIXED = 'FIXED',
        INDEXED = 'INDEXED',
        TIERED = 'TIERED',
    }

    /**
     * Indicates the day count convention. This has to be specified for products that pay interest
     */
    export enum interestRateDays {
        Y360 = 'Y360',
        Y364 = 'Y364',
        Y365 = 'Y365',
        ACTUAL = 'ACTUAL',
    }

    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    export enum balanceType {
        AVERAGE_DAILY_BALANCE = 'AVERAGE_DAILY_BALANCE',
        MINIMUM_DAILY_BALANCE = 'MINIMUM_DAILY_BALANCE',
        END_OF_DAY_BALANCE = 'END_OF_DAY_BALANCE',
    }

    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    export enum paymentFrequency {
        MONTHLY = 'MONTHLY',
        DAILY = 'DAILY',
    }

    /**
     * Indicates the frequency at which the index rate will be updated for the product.This has to be specified for products that use index rates.
     */
    export enum indexUpdateFrequency {
        MONTHLY = 'MONTHLY',
        DAILY = 'DAILY',
    }


}

