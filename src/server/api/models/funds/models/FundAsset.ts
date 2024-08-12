/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { ProductType } from './ProductType';
import type { UUID } from './UUID';

/**
 * An end of day report item for the funds module
 */
export type FundAsset = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The report business date
     */
    reportDate: LocalDate;
    /**
     * The product type
     */
    productType: ProductType;
    /**
     * The product category
     */
    category: string;
    /**
     * The investment currency
     */
    currency: string;
    /**
     * The transaction code
     */
    transactionCode: string;
    /**
     * The transaction ID
     */
    transactionId: UUID;
    /**
     * The transaction label
     */
    transactionLabel: string;
    /**
     * The account code
     */
    accountCode: string;
    /**
     * The account ID
     */
    accountId: UUID;
    /**
     * The account label
     */
    accountLabel: string;
    /**
     * The fund code
     */
    fundCode: string;
    /**
     * The fund ID
     */
    fundId: UUID;
    /**
     * The fund label
     */
    fundLabel: string;
    /**
     * The accrued interest or income for the day
     */
    accruedIncome: number;
    /**
     * The total accrued interest or income for the investment
     */
    totalIncome: number;
    /**
     * The withholding tax for the day
     */
    accruedWithHoldingTax: number;
    /**
     * The total accrued withholding tax for the investment
     */
    totalWithHoldingTax: number;
    /**
     * The current asset value
     */
    assetValue: number;
};

