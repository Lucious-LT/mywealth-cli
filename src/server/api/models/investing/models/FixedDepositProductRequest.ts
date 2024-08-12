/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a  product. The fields marked with an * means that they are required.
 */
export type FixedDepositProductRequest = {
    /**
     * The product interest configuration for payment of interest
     */
    interestConfigId: string;
    /**
     * The account ID for processing interest liability.
     */
    interestLiabilityAccountId: string;
    /**
     * The account ID for processing interest expense. (Expense).
     */
    interestExpenseAccountId: string;
    /**
     * The account ID of the deposit liability (Liability)
     */
    depositLiabilityAccountId: string;
    /**
     * The account ID of the processing commission (Income)
     */
    commissionIncomeAccountId?: string;
    /**
     * The minimum principal amount allowed for this product
     */
    minPrincipalAmount: number;
    /**
     * The maximum principal amount allowed for this product
     */
    maxPrincipalAmount: number;
    /**
     * The product code
     */
    code: string;
    /**
     * The product label
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string;
    /**
     * The product description
     */
    description: string;
    /**
     * The product currency
     */
    currency: string;
    /**
     * The status of the product
     */
    status: FixedDepositProductRequest.status;
    /**
     * The product category
     */
    category: FixedDepositProductRequest.category;
    /**
     * The commission configuration for the product
     */
    commissionId?: string;
    /**
     * Fees attached to the product
     */
    fees?: Array<string>;
    /**
     * Automatically approve and submit the transaction
     */
    autoApprove?: boolean;
    /**
     * The product interest basis
     */
    interestBasis: FixedDepositProductRequest.interestBasis;
    /**
     * The product interest type
     */
    interestType: FixedDepositProductRequest.interestType;
    /**
     * The minimum tenor allowed. This is a global maximum and any transaction must be above this threshold.
     */
    minTenor: number;
    /**
     * The maximum tenor allowed. This is a global maximum and any transaction cannot exceed this value
     */
    maxTenor: number;
    /**
     * Enforce the interest rates for the product. If this is set to true, the interest rates
     * will be enforced and the system will not allow any changes to the interest rates.
     *
     */
    enforceRates: boolean;
    /**
     * The withholding tax rate
     */
    withholdingTaxRate?: number;
    /**
     * The penalty rate for early termination
     */
    earlyTerminationRate?: number;
    /**
     * The account ID for accruing the withholding taxes (Liability)
     */
    withholdingTaxAccountId?: string;
};

export namespace FixedDepositProductRequest {

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


}

