/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a  product. The fields marked with an * means that they are required.
 */
export type MoneyMarketProductRequest = {
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
     * The account ID of the face value liability (Liability)
     */
    faceValueLiabilityAccountId: string;
    /**
     * The account ID of the processing commission (Income)
     */
    commissionIncomeAccountId?: string;
    /**
     * The minimum face value amount allowed for this product
     */
    minFaceValueAmount: number;
    /**
     * The maximum face value amount allowed for this product
     */
    maxFaceValueAmount: number;
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
    status: MoneyMarketProductRequest.status;
    /**
     * The product category
     */
    category: MoneyMarketProductRequest.category;
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
    interestBasis: MoneyMarketProductRequest.interestBasis;
    /**
     * The product interest type
     */
    interestType: MoneyMarketProductRequest.interestType;
    /**
     * Enforce the interest rates for the product. If this is set to true, the interest rates
     * will be enforced and the system will not allow any changes to the interest rates.
     *
     */
    enforceRates: boolean;
    /**
     * The default maturity date. If this is configured and no tenor is provided when a transaction is booked,
     * it will be used to calculate the tenor. Transactions coming from channels such as the client portal will
     * typically use this value to distribute the product. However if a tenor is provided when booking a transaction,
     * that value will be used to determine the maturity date.
     *
     */
    maturityDate?: string;
};

export namespace MoneyMarketProductRequest {

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
        CAPITALIZED = 'CAPITALIZED',
        UPFRONT = 'UPFRONT',
    }


}

