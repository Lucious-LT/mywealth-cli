/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineRule } from './CreditLineRule';
import type { DepositProductCategory } from './DepositProductCategory';
import type { DepositProductInterest } from './DepositProductInterest';
import type { DepositProductType } from './DepositProductType';
import type { LocalDateTime } from './LocalDateTime';
import type { ProductStatus } from './ProductStatus';
import type { Tax } from './Tax';
import type { UUID } from './UUID';

export type DepositProduct = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
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
     * Indicates if the product pays interest
     */
    payInterest: boolean;
    /**
     * Indicates if overdrafts are allowed. This is only applicable to current account products.
     */
    allowOverDrafts: boolean;
    /**
     * This defines the rules for processing credit when overdrafts are enabled for an account
     */
    creditLineRule?: CreditLineRule | null;
    /**
     * The maximum overdraft limit. This is a global maximum and any account facility cannot exceed this value
     */
    overDraftLimit?: number | null;
    /**
     * The product interest configuration for payment of interest
     */
    depositInterestConfig?: DepositProductInterest | null;
    /**
     * The product interest configuration for calculating overdraft or debit interest
     */
    overDraftInterestConfig?: DepositProductInterest | null;
    /**
     * The product tax configuration for calculating overdraft interest taxes
     */
    overDraftInterestTaxConfig?: Tax | null;
    /**
     * The product tax configuration for calculating deposit interest taxes
     */
    depositInterestTaxConfig?: Tax | null;
    /**
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a teller account is not provided.
     */
    transSrcAccountId: UUID;
    /**
     * The default account label for the transaction source
     */
    transSrcAccountLabel: string;
    /**
     * The default account # for the transaction source
     */
    transSrcAccountNo: string;
    /**
     * The account ID for the account used to process overdrafts (Asset). This is required if overdrafts are enabled.
     */
    overDraftAssetAccountId?: UUID | null;
    /**
     * The account label for the account used to process overdrafts (Asset)
     */
    overDraftAssetAccountLabel?: string | null;
    /**
     * The account # for the account used to process overdrafts (Asset)
     */
    overDraftAssetAccountNo?: string | null;
    /**
     * The account ID for the account used to process overdrafts (Provision). This is required if overdrafts are enabled.
     */
    overDraftProvisionAccountId?: UUID | null;
    /**
     * The account label for the account used to process overdrafts (Provision)
     */
    overDraftProvisionAccountLabel?: string | null;
    /**
     * The account # for the account used to process overdrafts (Provision)
     */
    overDraftProvisionAccountNo?: string | null;
    /**
     * The account ID for processing interest due from overdrafts (Asset). This is required if overdrafts are enabled.
     */
    overDraftInterestReceivableAccountId?: UUID | null;
    /**
     * The account label for processing interest due from overdrafts (Asset). This is required if overdrafts are enabled.
     */
    overDraftInterestReceivableAccountLabel?: string | null;
    /**
     * The account # for processing interest due from overdrafts (Asset). This is required if overdrafts are enabled.
     */
    overDraftInterestReceivableAccountNo?: string | null;
    /**
     * The account ID for processing interest income from overdrafts (Income). This is required if overdrafts are enabled.
     */
    overDraftInterestIncomeAccountId?: UUID | null;
    /**
     * The account label for processing interest income from overdrafts (Income). This is required if overdrafts are enabled.
     */
    overDraftInterestIncomeAccountLabel?: string | null;
    /**
     * TThe account # for processing interest income from overdrafts (Income). This is required if overdrafts are enabled.
     */
    overDraftInterestIncomeAccountNo?: string | null;
    /**
     * The account ID for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    depositInterestLiabilityAccountId?: UUID | null;
    /**
     * The account label for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    depositInterestLiabilityAccountLabel?: string | null;
    /**
     * The account # for processing interest due to clients (Liability). This is required if interest payment is enabled.
     */
    depositInterestLiabilityAccountNo?: string | null;
    /**
     * The account ID for processing interest expense from deposits (Expense). This is required if interest payment is enabled.
     */
    depositInterestExpenseAccountId?: UUID | null;
    /**
     * The account label for processing interest expense from deposits (Expense). This is required if interest payment is enabled.
     */
    depositInterestExpenseAccountLabel?: string | null;
    /**
     * The account # for processing interest expense from deposits (Expense). This is required if interest payment is enabled.
     */
    depositInterestExpenseAccountNo?: string | null;
    /**
     * The account ID for the control account (Liability)
     */
    depositLiabilityAccountId: UUID;
    /**
     * The account label for the control account (Liability)
     */
    depositLiabilityAccountLabel: string;
    /**
     * The account # for the control account (Liability)
     */
    depositLiabilityAccountNo: string;
    /**
     * A unique product code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
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
};

