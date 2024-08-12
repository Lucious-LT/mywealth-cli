/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Commission } from './Commission';
import type { InvestmentInterest } from './InvestmentInterest';

/**
 * A JSON blob representing a fixed deposit product. The fields marked with an * means that they are required.
 */
export type FixedDepositProduct = {
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
     * Enforce the interest rates for the product. If this is set to true, the interest rates
     * will be enforced and the system will not allow any changes to the interest rates.
     *
     */
    enforceRates: boolean;
    interestConfig: InvestmentInterest;
    /**
     * The product interest basis
     */
    interestBasis: FixedDepositProduct.interestBasis;
    /**
     * The product interest type
     */
    interestType: FixedDepositProduct.interestType;
    /**
     * The minimum tenor allowed. This is a global maximum and any transaction must be above this threshold.
     */
    minTenor: number;
    /**
     * The maximum tenor allowed. This is a global maximum and any transaction cannot exceed this value
     */
    maxTenor: number;
    /**
     * The minimum principal amount allowed. This is a global maximum and any transaction must be above this threshold.
     */
    minPrincipalAmount?: number;
    /**
     * The maximum principal amount allowed. This is a global maximum and any transaction cannot exceed this value
     */
    maxPrincipalAmount?: number;
    /**
     * The penalty rate for early termination
     */
    earlyTerminationRate?: number;
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
     * The account ID for the deposit principal (Liability)
     */
    depositLiabilityAccountId: string;
    /**
     * The account label for the deposit principal (Liability)
     */
    depositLiabilityAccountLabel: string;
    /**
     * The account # for the deposit principal (Liability)
     */
    depositLiabilityAccountNo: string;
    /**
     * The withholding tax rate
     */
    withholdingTaxRate?: number;
    /**
     * The account ID for accruing the withholding taxes (Liability)
     */
    withholdingTaxAccountId?: string;
    /**
     * The account label for the withholding tax (Liability)
     */
    withholdingTaxAccountLabel?: string;
    /**
     * The account # for the withholding tax (Liability)
     */
    withholdingTaxAccountNo?: string;
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
    status: FixedDepositProduct.status;
    /**
     * The product category
     */
    category: FixedDepositProduct.category;
    investmentFees?: Array<string>;
};

export namespace FixedDepositProduct {

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
     * The product interest type
     */
    export enum interestType {
        FLAT = 'FLAT',
        SIMPLE = 'SIMPLE',
        COMPOUNDING = 'COMPOUNDING',
        AMORTIZED = 'AMORTIZED',
        AMORTIZED_CONT = 'AMORTIZED_CONT',
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


}

