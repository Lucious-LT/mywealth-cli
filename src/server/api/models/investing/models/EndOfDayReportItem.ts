/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an end of day report. The fields marked with an * means that they are required.
 */
export type EndOfDayReportItem = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The product id
     */
    productId: string;
    /**
     * The product code
     */
    productCode: string;
    /**
     * The product code
     */
    productCurrency: string;
    /**
     * The product label
     */
    productLabel: string;
    /**
     * The product code
     */
    productType: EndOfDayReportItem.productType;
    /**
     * The credit interest
     */
    creditInterest: number;
    /**
     * The debit interest
     */
    debitInterest: number;
    /**
     * The total interest liability for the product
     */
    interestLiability: number;
    /**
     * The total interest receivable for the product
     */
    interestReceivable: number;
    /**
     * The outstanding principal balance for the product
     */
    principalBalance: number;
    /**
     * The accrued withholding tax
     */
    withholdingTax: number;
    /**
     * The accrued withholding tax balance
     */
    withholdingTaxBalance: number;
    /**
     * The credit opening balance
     */
    creditOpeningBalance: number;
    /**
     * The credit closing balance
     */
    creditClosingBalance: number;
    /**
     * The debit opening balance
     */
    debitOpeningBalance: number;
    /**
     * The debit closing balance
     */
    debitClosingBalance: number;
    /**
     * The weighted average rate
     */
    weightedAverageRate: number;
    /**
     * The interest liability journal Id
     */
    interestLiabilityJournalId?: string;
    /**
     * The interest receivable journal Id
     */
    interestReceivableJournalId?: string;
    /**
     * The number of accounts
     */
    noOfAccounts: number;
};

export namespace EndOfDayReportItem {

    /**
     * The product code
     */
    export enum productType {
        FIXED_DEPOSIT = 'FIXED_DEPOSIT',
        TRADING = 'TRADING',
        MONEY_MARKET = 'MONEY_MARKET',
    }


}

