/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { ProductType } from './ProductType';
import type { UUID } from './UUID';

/**
 * An end of day report item for the treasury module
 */
export type EndOfDayReportItem = {
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
     * The book code
     */
    bookCode: string;
    /**
     * The book ID
     */
    bookId: UUID;
    /**
     * The book label
     */
    bookLabel: string;
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
     * The withholding tax for the day
     */
    assetValue: number;
};

