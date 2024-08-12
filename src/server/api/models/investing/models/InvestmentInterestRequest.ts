/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvestmentInterestSlabRequest } from './InvestmentInterestSlabRequest';

/**
 * A JSON blob representing an interest model. The fields marked with an * means that they are required.
 */
export type InvestmentInterestRequest = {
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The interest model label
     */
    label: string;
    /**
     * The status of the model
     */
    status: InvestmentInterestRequest.status;
    /**
     * The type of model
     */
    rateType: InvestmentInterestRequest.rateType;
    /**
     * Indicates the day count convention. This has to be specified for products that pay interest
     */
    interestRateDays: InvestmentInterestRequest.interestRateDays;
    /**
     * Indicates the account balance used for interest calculation. This has to be specified for products that pay interest
     */
    balanceType: InvestmentInterestRequest.balanceType;
    /**
     * Indicates the frequency at which accrued interest will be posted into accounts.This has to be specified for products that pay interest
     */
    paymentFrequency: InvestmentInterestRequest.paymentFrequency;
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
     * The reference rate instrument from the treasury service
     */
    indexRateId?: string;
    /**
     * Indicates the frequency at which the index rate will be updated for the product.This has to be specified for products that use index rates.
     */
    indexUpdateFrequency?: InvestmentInterestRequest.indexUpdateFrequency;
    /**
     * The current index rate for interest calculations. This is updated based on the specified frequency
     */
    currentIndexRate?: number;
    /**
     * The slab entries
     */
    interestSlabs?: Array<InvestmentInterestSlabRequest>;
};

export namespace InvestmentInterestRequest {

    /**
     * The status of the model
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

