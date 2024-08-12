/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineRule } from './CreditLineRule';
import type { LoanProductArrearsCalculatedFrom } from './LoanProductArrearsCalculatedFrom';
import type { LoanProductArrearsCalendar } from './LoanProductArrearsCalendar';
import type { LoanProductAvailability } from './LoanProductAvailability';
import type { LoanProductCategory } from './LoanProductCategory';
import type { LoanProductInterest } from './LoanProductInterest';
import type { LoanProductPaymentFrequency } from './LoanProductPaymentFrequency';
import type { LoanProductType } from './LoanProductType';
import type { LocalDateTime } from './LocalDateTime';
import type { ProductStatus } from './ProductStatus';
import type { Tax } from './Tax';
import type { UUID } from './UUID';

export type LoanProduct = {
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
     * A period during which the client does not repay the interest
     */
    defaultInterestGracePeriod: number;
    /**
     * A period during which the client does not repay the principal
     */
    defaultPrincipalGracePeriod: number;
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
     * How the arrears penalty and classification should treat non working days
     */
    arrearsCalendar: LoanProductArrearsCalendar;
    /**
     * How the number of days in arrears is determined
     */
    arrearsCalculatedFrom: LoanProductArrearsCalculatedFrom;
    /**
     * The default tolerance (days) before the account is classified as in 'ARREARS'
     */
    defaultTolerance: number;
    /**
     * The minimum tolerance (days) before the account is classified as in 'ARREARS'
     */
    minTolerance: number;
    /**
     * The maximum tolerance (days) before the account is classified as in 'ARREARS'
     */
    maxTolerance: number;
    /**
     * This defines the rules for processing credit lines when booking a loan
     */
    creditLineRule: CreditLineRule | null;
    /**
     * Indicates if this product can be attached to a client, client group or both
     */
    availability: Array<LoanProductAvailability>;
    /**
     * The default loan amount. This is the default amount populated when booking a new loan. Leave this blank to disable this feature.
     */
    defaultAmount?: number | null;
    /**
     * The minimum amount that can be lent with this product. Leave this blank to disable this feature.
     */
    minAmount: number;
    /**
     * The maximum amount that can be lent with this product. Leave this blank to disable this feature.
     */
    maxAmount: number;
    /**
     * The maximum number of tranches allowed for tranched loans.
     */
    maxTranches: number;
    /**
     * The minimum tenor for term loans.
     */
    defaultTenor?: number;
    /**
     * The minimum tenor for term loans.
     */
    minTenor?: number;
    /**
     * The maximum tenor for term loans.
     */
    maxTenor?: number;
    /**
     * The product interest configuration for calculating interest
     */
    interestConfig: LoanProductInterest;
    /**
     * The product tax configuration for calculating taxes
     */
    taxConfig?: Tax | null;
    /**
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a treasury / cash reserve account is not provided.
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
     * The account ID for the control account used to process principal disbursement (Asset).
     */
    loanAssetAccountId: UUID;
    /**
     * The account label for the control account used to process principal disbursement (Asset)
     */
    loanAssetAccountLabel: string;
    /**
     * The account # for the control account used to process principal disbursement (Asset)
     */
    loanAssetAccountNo: string;
    /**
     * The account ID for processing interest due from loans (Asset)
     */
    loanInterestReceivableAccountId: UUID;
    /**
     * The account ID for processing interest due from loans (Asset)
     */
    loanInterestReceivableAccountLabel: string;
    /**
     * The account ID for processing interest due from loans (Asset)
     */
    loanInterestReceivableAccountNo: string;
    /**
     * The account ID for processing interest income from loans (Income)
     */
    loanInterestIncomeAccountId: UUID;
    /**
     * The account label for processing interest income from loans (Income)
     */
    loanInterestIncomeAccountLabel: string;
    /**
     * TThe account # for processing interest income from loans (Income)
     */
    loanInterestIncomeAccountNo: string;
    /**
     * The account ID for processing provisions for bad debt (Liability)
     */
    loanProvisionLiabilityAccountId: UUID;
    /**
     * The account ID for processing provisions for bad debt (Liability)
     */
    loanProvisionLiabilityAccountLabel: string;
    /**
     * The account ID for processing provisions for bad debt (Liability)
     */
    loanProvisionLiabilityAccountNo: string;
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
    category: LoanProductCategory;
    /**
     * The type of the product
     */
    loanType: LoanProductType;
    /**
     * The  repayment frequency
     */
    paymentFrequency: LoanProductPaymentFrequency;
    /**
     * The number of days in a billing cycle for revolving credit lines
     */
    billingCycleDays?: number | null;
    /**
     * The minimum percentage of the outstanding balance due in each billing cycle
     */
    minDuePercentage?: number | null;
    /**
     * The institution identifier. This is used by the card service when generating new cards and is the same as the institution ID in the card service.
     */
    institutionId?: string | null;
    loanFees: Array<string>;
    loanBranches: Array<string>;
};

