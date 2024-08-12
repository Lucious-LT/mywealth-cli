/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a  product. The fields marked with an * means that they are required.
 */
export type InvestmentProductRequest = {
    /**
     * Indicates if the product pays interest.
     */
    payInterest: boolean;
    /**
     * The product interest configuration for payment of interest
     */
    cashInterestConfigId?: string;
    /**
     * The account ID for interest due to clients. This is required if interest payment is enabled.
     */
    cashInterestLiabilityAccountId?: string;
    /**
     * Indicates if margins are allowed. This is only applicable to margin account products.
     */
    allowMargin: boolean;
    /**
     * The maximum margin limit
     */
    marginLimit?: number;
    /**
     * The product interest configuration for calculating margin or debit interest
     */
    marginInterestConfigId?: string;
    /**
     * The account ID for processing interest receivable from margin loans (Asset). This is required if margin is enabled.
     */
    marginInterestReceivableAccountId?: string;
    /**
     * The account ID for the control account used to process margin (Asset). This is required if margins are enabled.
     */
    marginAssetAccountId?: string;
    /**
     * The account ID for processing interest income from margin (Income). This is required if margins are enabled.
     */
    marginInterestIncomeAccountId?: string;
    /**
     * The account ID for processing interest expense for cash balances (Expense). This is required if interest payment is enabled.
     */
    cashInterestExpenseAccountId?: string;
    /**
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a teller account is not provided.
     */
    transSrcAccountId: string;
    /**
     * The account ID of the cash control (Liability)
     */
    cashLiabilityAccountId: string;
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
    status: InvestmentProductRequest.status;
    /**
     * The product category
     */
    category: InvestmentProductRequest.category;
    /**
     * The type of the product
     */
    type: InvestmentProductRequest.type;
    /**
     * The commission configuration for the product
     */
    commissionId?: string;
    /**
     * The account ID of the processing commission (Income)
     */
    commissionIncomeAccountId?: string;
    /**
     * Fees attached to the product
     */
    fees?: Array<string>;
    /**
     * Automatically approve and submit the transaction
     */
    autoApprove?: boolean;
    /**
     * The account ID for accruing the withholding taxes (Liability)
     */
    withholdingTaxAccountId?: string;
    /**
     * The account ID for processing agent commission liabilities.  (Liability)
     */
    agentCommissionAccountId?: string;
    /**
     * The account ID for processing custodian receivables.  (Asset)
     */
    custodianReceivableAccountId?: string;
    /**
     * The account ID for clearing trades. (Asset). If this is not configured, the default transaction source (Bank) will be used when processing trades.
     */
    tradeClearingAccountId?: string;
    /**
     * The account ID for settling trades.  (Asset)
     */
    tradeSettlementAccountId?: string;
    /**
     * The default maximum open buy limit allowed for this product. Setting this to zero will disable this feature.
     */
    maxOpenBuyLimit?: number;
    /**
     * The default maximum daily buy limit allowed for this product. Setting this to zero will disable this feature.
     */
    maxDailyBuyLimit?: number;
    /**
     * The capital gains tax rate  (%)
     */
    capitalGainsTaxRate?: number;
    /**
     * The initial margin requirement
     */
    initialMarginRequirement?: number;
    /**
     * The default hair cut applied to exchange traded assets that are used as margin collateral
     */
    marginCollateralHairCut?: number;
    /**
     * The capital gains tax rate
     */
    marginNotificationThreshold?: number;
    /**
     * The maintenance margin requirement
     */
    maintenanceMarginRequirement?: number;
    /**
     * The number of business days allowed to resolve a margin call before the positions are automatically closed
     */
    marginCallWindow?: number;
};

export namespace InvestmentProductRequest {

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
     * The type of the product
     */
    export enum type {
        TRADING = 'TRADING',
        ASSET_MGMT = 'ASSET_MGMT',
    }


}

