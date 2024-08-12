/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Commission } from './Commission';
import type { InvestmentInterest } from './InvestmentInterest';

/**
 * A JSON blob representing a product. The fields marked with an * means that they are required.
 */
export type InvestmentProduct = {
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
     * Indicates if the product pays interest
     */
    payInterest: boolean;
    /**
     * Automatically approve and submit the transaction
     */
    autoApprove: boolean;
    /**
     * Indicates if margin is allowed
     */
    allowMargin: boolean;
    /**
     * The maximum margin limit. This is a global maximum and any account facility cannot exceed this value
     */
    marginLimit?: number;
    cashInterestConfig?: InvestmentInterest;
    marginInterestConfig?: InvestmentInterest;
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
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a funding source account is not provided.
     */
    transSrcAccountId: string;
    /**
     * The default account label for the transaction source
     */
    transSrcAccountLabel: string;
    /**
     * The default account # for the transaction source
     */
    transSrcAccountNo: string;
    /**
     * The account ID for the control account used to process margin loans (Asset). This is required if overdrafts are enabled.
     */
    marginAssetAccountId?: string;
    /**
     * The account label for the control account used to process margin loans (Asset)
     */
    marginAssetAccountLabel?: string;
    /**
     * The account # for the control account used to process margin loans (Asset)
     */
    marginAssetAccountNo?: string;
    /**
     * The account ID for processing interest due from margin loans (Asset). This is required if overdrafts are enabled.
     */
    marginInterestReceivableAccountId?: string;
    /**
     * The account label for processing interest due from margin loans (Asset). This is required if overdrafts are enabled.
     */
    marginInterestReceivableAccountLabel?: string;
    /**
     * The account # for processing interest due from margin loans (Asset). This is required if overdrafts are enabled.
     */
    marginInterestReceivableAccountNo?: string;
    /**
     * The account ID for processing interest income from margin loans (Income). This is required if overdrafts are enabled.
     */
    marginInterestIncomeAccountId?: string;
    /**
     * The account label for processing interest income from margin loans (Income). This is required if overdrafts are enabled.
     */
    marginInterestIncomeAccountLabel?: string;
    /**
     * TThe account # for processing interest income from margin loans (Income). This is required if overdrafts are enabled.
     */
    marginInterestIncomeAccountNo?: string;
    /**
     * The account ID for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    cashInterestLiabilityAccountId?: string;
    /**
     * The account label for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    cashInterestLiabilityAccountLabel?: string;
    /**
     * The account # for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    cashInterestLiabilityAccountNo?: string;
    /**
     * The account ID for processing interest expense from cash deposits (Expense). This is required if interest payment is enabled.
     */
    cashInterestExpenseAccountId?: string;
    /**
     * The account label for processing interest expense from cash deposits (Expense). This is required if interest payment is enabled.
     */
    cashInterestExpenseAccountLabel?: string;
    /**
     * The account # for processing interest expense from cash deposits (Expense). This is required if interest payment is enabled.
     */
    cashInterestExpenseAccountNo?: string;
    /**
     * The account ID for the control account (Liability)
     */
    cashLiabilityAccountId: string;
    /**
     * The account label for the control account (Liability)
     */
    cashLiabilityAccountLabel: string;
    /**
     * The account # for the control account (Liability)
     */
    cashLiabilityAccountNo: string;
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
    status: InvestmentProduct.status;
    /**
     * The product category
     */
    category: InvestmentProduct.category;
    /**
     * The type of the product
     */
    type: InvestmentProduct.type;
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
     * The account ID for processing agent commission liabilities.  (Liability)
     */
    agentCommissionAccountId?: string;
    /**
     * The account label of the ledger used for processing agent commission liabilities
     */
    agentCommissionAccountLabel?: string;
    /**
     * The account number of the ledger used for processing agent commission liabilities
     */
    agentCommissionAccountNo?: string;
    /**
     * The account ID for processing custodian receivables.  (Asset)
     */
    custodianReceivableAccountId?: string;
    /**
     * The account label of the ledger used for processing custodian receivables
     */
    custodianReceivableAccountLabel?: string;
    /**
     * The account number of the ledger used for processing custodian receivables
     */
    custodianReceivableAccountNo?: string;
    /**
     * The account ID for clearing trades. (Asset). If this is not configured, the default transaction source (Bank) will be used when processing trades.
     */
    tradeClearingAccountId?: string;
    /**
     * The account label of the ledger used for clearing trades
     */
    tradeClearingAccountLabel?: string;
    /**
     * The account number of the ledger used for clearing trades
     */
    tradeClearingAccountNo?: string;
    /**
     * The account ID for settling trades.  (Asset)
     */
    tradeSettlementAccountId?: string;
    /**
     * The account label of the ledger used for settling trades. This is usually the bank or default transaction source account.
     */
    tradeSettlementAccountLabel?: string;
    /**
     * The account number of the ledger used for settling trades
     */
    tradeSettlementAccountNo?: string;
    /**
     * The default maximum open buy limit allowed for this product. Setting this to zero will disable this feature.
     */
    maxOpenBuyLimit?: number;
    /**
     * The default maximum daily buy limit allowed for this product. Setting this to zero will disable this feature.
     */
    maxDailyBuyLimit?: number;
    /**
     * The capital gains tax rate (%)
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
    investmentFees?: Array<string>;
};

export namespace InvestmentProduct {

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

