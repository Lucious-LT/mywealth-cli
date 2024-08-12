/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Commission } from './Commission';
import type { InvestmentInterest } from './InvestmentInterest';

/**
 * A JSON blob representing a money market product. The fields marked with an * means that they are required.
 */
export type MoneyMarketProduct = {
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
     * Enforce the discount rates for the product. If this is set to true, the discount rates
     * will be enforced and the system will not allow any changes to the discount rates.
     *
     */
    enforceRates: boolean;
    interestConfig: InvestmentInterest;
    /**
     * The product interest basis
     */
    interestBasis: MoneyMarketProduct.interestBasis;
    /**
     * The minimum principal amount allowed. This is a global maximum and any transaction must be above this threshold.
     */
    minFaceValueAmount?: number;
    /**
     * The maximum principal amount allowed. This is a global maximum and any transaction cannot exceed this value
     */
    maxFaceValueAmount?: number;
    /**
     * Automatically approve and process the transaction
     */
    autoApprove: boolean;
    commissionConfig?: Commission;
    /**
     * The account ID for commission processing. This is used when processing transactions and commission is to be paid for the transaction
     */
    commissionIncomeAccountId?: string;
    /**
     * The default account label for commission processing
     */
    commissionIncomeAccountLabel?: string;
    /**
     * The default account # for commission processing
     */
    commissionIncomeAccountNo?: string;
    /**
     * The account ID for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    interestLiabilityAccountId: string;
    /**
     * The account label for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    interestLiabilityAccountLabel: string;
    /**
     * The account # for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    interestLiabilityAccountNo: string;
    /**
     * The account ID for processing interest expense on deposits (Expense). This is required if interest payment is enabled.
     */
    interestExpenseAccountId: string;
    /**
     * The account label for processing interest expense expense on deposits (Expense). This is required if interest payment is enabled.
     */
    interestExpenseAccountLabel: string;
    /**
     * The account # for processing interest expense expense on deposits (Expense). This is required if interest payment is enabled.
     */
    interestExpenseAccountNo: string;
    /**
     * The account ID for the investment face value (Liability)
     */
    faceValueLiabilityAccountId: string;
    /**
     * The account label for the investment face value (Liability)
     */
    faceValueLiabilityAccountLabel: string;
    /**
     * The account # for the investment face value (Liability)
     */
    faceValueLiabilityAccountNo: string;
    /**
     * A unique product code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The product currency
     */
    currency: string;
    /**
     * The product short label
     */
    label: string;
    /**
     * The product description
     */
    description: string;
    /**
     * The status of the product
     */
    status: MoneyMarketProduct.status;
    /**
     * The product category
     */
    category: MoneyMarketProduct.category;
    /**
     * The default interest type
     */
    interestType: MoneyMarketProduct.interestType;
    /**
     * The default maturity date. If this is configured and no tenor is provided when a transaction is booked,
     * it will be used to calculate the tenor. Transactions coming from channels such as the client portal will
     * typically use this value to distribute the product. However if a tenor is provided when booking a transaction,
     * that value will be used to determine the maturity date.
     *
     */
    maturityDate?: string;
    investmentFees?: Array<string>;
};

export namespace MoneyMarketProduct {

    /**
     * The product interest basis
     */
    export enum interestBasis {
        ACTUAL360 = 'Actual360',
        ACTUAL365 = 'Actual365',
        ACTUAL364 = 'Actual364',
        ACTUAL_ACTUAL = 'ActualActual',
        THIRTY360US = 'Thirty360US',
        THIRTY360EUROPEAN = 'Thirty360European',
        THIRTY365 = 'Thirty365',
    }

    /**
     * The status of the product
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The product category
     */
    export enum category {
        PERSONAL = 'PERSONAL',
        BUSINESS = 'BUSINESS',
    }

    /**
     * The default interest type
     */
    export enum interestType {
        CAPITALIZED = 'CAPITALIZED',
        UPFRONT = 'UPFRONT',
    }


}

