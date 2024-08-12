/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineRule } from './CreditLineRule';
import type { DepositProductCategory } from './DepositProductCategory';
import type { DepositProductType } from './DepositProductType';
import type { ProductStatus } from './ProductStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a product record.
 */
export type DepositProductRequest = {
    /**
     * Indicates if the product pays interest.
     */
    payInterest: boolean;
    /**
     * The product interest configuration for payment of interest
     */
    depositInterestConfigId?: UUID | null;
    /**
     * The account ID for processing interest due from overdrafts (Income). This is required if overdrafts are enabled.
     */
    depositInterestLiabilityAccountId?: UUID | null;
    /**
     * Indicates if overdrafts are allowed. This is only applicable to current account products.
     */
    allowOverDrafts: boolean;
    /**
     * The maximum overdraft limit
     */
    overDraftLimit?: number | null;
    /**
     * This defines the rules for processing credit when overdrafts are enabled for an account
     */
    creditLineRule?: CreditLineRule | null;
    /**
     * The product interest configuration for calculating overdraft or debit interest
     */
    overDraftInterestConfigId?: UUID | null;
    /**
     * The account ID for processing interest expense from deposits (Expense). This is required if interest payment is enabled.
     */
    overDraftInterestReceivableAccountId?: UUID | null;
    /**
     * The account ID for the account used to process overdrafts (Asset). This is required if overdrafts are enabled.
     */
    overDraftAssetAccountId?: UUID | null;
    /**
     * The account ID for the account used to process overdrafts (Provision). This is required if overdrafts are enabled.
     */
    overDraftProvisionAccountId?: UUID | null;
    /**
     * The account ID for processing interest income from overdrafts (Income). This is required if overdrafts are enabled.
     */
    overDraftInterestIncomeAccountId?: UUID | null;
    /**
     * The account ID for processing interest expense from deposits (Expense). This is required if interest payment is enabled.
     */
    depositInterestExpenseAccountId?: UUID | null;
    /**
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a teller account is not provided.
     */
    transSrcAccountId: UUID;
    /**
     * The account ID of the deposit control (Liability)
     */
    depositLiabilityAccountId: UUID;
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
    notes?: string | null;
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
    status: ProductStatus;
    /**
     * The product category
     */
    category: DepositProductCategory;
    /**
     * The type of the product
     */
    depositType: DepositProductType;
    /**
     * The minimum balance required to open the account
     */
    minOpeningBalance?: number | null;
    /**
     * The minimum balance required to maintain the account
     */
    minAccountBalance?: number | null;
    /**
     * Indicates if transfers are enabled for this product
     */
    transfersEnabled: boolean;
    /**
     * Indicates if bill payments are enabled for this product
     */
    billPayEnabled: boolean;
    /**
     * Indicates if cards can be issued for this product
     */
    cardsEnabled: boolean;
    /**
     * The overdraft interest tax configuration
     */
    overDraftInterestTaxConfigId?: UUID | null;
    /**
     * The deposit interest tax configuration
     */
    depositInterestTaxConfigId?: UUID | null;
};

