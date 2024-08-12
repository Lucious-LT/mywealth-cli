/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a fee. The fields marked with an * means that they are required.
 */
export type InvestmentFeeRequest = {
    /**
     * The investment fee label
     */
    label: string;
    /**
     * The GL account label used to process the fee
     */
    glAccountId: string;
    /**
     * The status of the investment fee
     */
    status: InvestmentFeeRequest.status;
    /**
     * The type of investment fee
     */
    feeType: InvestmentFeeRequest.feeType;
    /**
     * The part of the investment that the fee should apply to
     */
    applyTo: InvestmentFeeRequest.applyTo;
    /**
     * The asset class that the fee applies to.
     */
    instrumentType: InvestmentFeeRequest.instrumentType;
    /**
     * The fee currency
     */
    currency: string;
    /**
     * The fixed amount
     */
    fixedAmount: number;
    /**
     * The percentage rate. This is combined with the flat rate to determine total fee amount
     */
    percentageRate: number;
    /**
     * Indicates that this fee is deducted at source and should not be part of a broker's liability
     */
    deductedAtSource: boolean;
};

export namespace InvestmentFeeRequest {

    /**
     * The status of the investment fee
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
    }

    /**
     * The type of investment fee
     */
    export enum feeType {
        TRADING = 'TRADING',
        DEPOSITORY = 'DEPOSITORY',
        REGULATOR = 'REGULATOR',
        TAX = 'TAX',
        MANAGEMENT = 'MANAGEMENT',
    }

    /**
     * The part of the investment that the fee should apply to
     */
    export enum applyTo {
        CONSIDERATION = 'CONSIDERATION',
        COMMISSION = 'COMMISSION',
        GROSS_ASSET_VALUE = 'GROSS_ASSET_VALUE',
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


}

