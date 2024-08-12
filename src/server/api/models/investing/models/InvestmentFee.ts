/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a fee. The fields marked with an * means that they are required.
 */
export type InvestmentFee = {
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
     * The GL account ID used to process the fees
     */
    glAccountId: string;
    /**
     * The GL account label used to process the fees
     */
    glAccountLabel: string;
    /**
     * The GL account code used to process the fees
     */
    glAccountCode: string;
    /**
     * A unique fee code
     */
    code: string;
    /**
     * The fee description
     */
    label: string;
    /**
     * The status of the fee
     */
    status: InvestmentFee.status;
    /**
     * The asset class that the fee applies to.
     */
    instrumentType: InvestmentFee.instrumentType;
    /**
     * The type of fee
     */
    feeType: InvestmentFee.feeType;
    /**
     * The aspect of the transaction that the fee should apply to
     */
    applyTo: InvestmentFee.applyTo;
    /**
     * The fee currency
     */
    currency: string;
    /**
     * The flat rate. This will be added to the % value
     */
    fixedAmount: number;
    /**
     * The percentage rate. This combined with the flat rate to determine total fee amount
     */
    percentageRate: number;
    /**
     * Indicates that this fee is deducted at source and should not be part of a broker's liability
     */
    deductedAtSource: boolean;
};

export namespace InvestmentFee {

    /**
     * The status of the fee
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The asset class that the fee applies to.
     */
    export enum instrumentType {
        ALL = 'ALL',
        EQUITY = 'EQUITY',
        REAL_ESTATE = 'REAL_ESTATE',
        FUND = 'FUND',
        ETF = 'ETF',
        CRYPTO = 'CRYPTO',
        COMMODITY = 'COMMODITY',
        BOND = 'BOND',
        COMMERCIAL_PAPER = 'COMMERCIAL_PAPER',
        TREASURY_BILL = 'TREASURY_BILL',
        FUTURES = 'FUTURES',
        OPTIONS = 'OPTIONS',
        GDR = 'GDR',
        CASH = 'CASH',
        ADR = 'ADR',
    }

    /**
     * The type of fee
     */
    export enum feeType {
        TRADING = 'TRADING',
        DEPOSITORY = 'DEPOSITORY',
        REGULATOR = 'REGULATOR',
        TAX = 'TAX',
        MANAGEMENT = 'MANAGEMENT',
    }

    /**
     * The aspect of the transaction that the fee should apply to
     */
    export enum applyTo {
        CONSIDERATION = 'CONSIDERATION',
        COMMISSION = 'COMMISSION',
        GROSS_ASSET_VALUE = 'GROSS_ASSET_VALUE',
    }


}

