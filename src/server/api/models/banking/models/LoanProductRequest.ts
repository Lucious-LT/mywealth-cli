/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditLineRule } from './CreditLineRule';
import type { LoanProductArrearsCalculatedFrom } from './LoanProductArrearsCalculatedFrom';
import type { LoanProductArrearsCalendar } from './LoanProductArrearsCalendar';
import type { LoanProductAvailability } from './LoanProductAvailability';
import type { LoanProductCategory } from './LoanProductCategory';
import type { LoanProductPaymentFrequency } from './LoanProductPaymentFrequency';
import type { LoanProductType } from './LoanProductType';
import type { ProductStatus } from './ProductStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a product record.
 */
export type LoanProductRequest = {
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
    maxTranches?: number | null;
    /**
     * The product interest configuration
     */
    loanInterestConfigId: UUID;
    /**
     * The product tax configuration
     */
    taxConfigId?: UUID | null;
    /**
     * The account ID for processing provisions for bad debt (Liability)
     */
    loanProvisionLiabilityAccountId: UUID;
    /**
     * The account ID for processing interest income from loans (Income)
     */
    loanInterestIncomeAccountId: UUID;
    /**
     * The account ID for processing interest due from loans (Asset)
     */
    loanInterestReceivableAccountId: UUID;
    /**
     * The account ID for the control account used to process principal disbursement (Asset).
     */
    loanAssetAccountId: UUID;
    /**
     * The default account ID for the transaction source (Asset) account. This is used when processing transactions and a teller account is not provided.
     */
    transSrcAccountId: UUID;
    /**
     * The product code
     */
    code: string;
    /**
     * The product label
     */
    label: string;
    /**
     * The product description
     */
    description: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The product currency
     */
    currency: string;
    /**
     * The status of the product
     */
    status: ProductStatus;
    /**
     * Indicates if this product can be attached to a client, client group or both
     */
    availability: Array<LoanProductAvailability>;
    /**
     * The product category
     */
    category: LoanProductCategory;
    /**
     * This defines the rules for processing credit when overdrafts are enabled for an account
     */
    creditLineRule: CreditLineRule;
    /**
     * The type of the product
     */
    loanType: LoanProductType;
    /**
     * Fees attached to the loan product
     */
    fees: Array<string>;
    /**
     * Branches attached to the loan product
     */
    branches: Array<string>;
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
     * The institution identifier. This is used by the card service when generating new cards and is the same as the institution ID in the card service.
     */
    institutionId?: string | null;
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
     * A lump (balloon) payment that is made at the end of the loan.
     */
    balloonAmount?: number | null;
    /**
     * The default value for a period during which the client does not repay the interest. The values selected in the account cannot exceed what is configured for the product.
     */
    defaultInterestGracePeriod: number;
    /**
     * The default value for a period during which the client does not repay the principal. The values selected in the account cannot exceed what is configured in the product.
     */
    defaultPrincipalGracePeriod: number;
    /**
     * The minimum tenor for term loans.
     */
    minTenor?: number;
    /**
     * The maximum tenor for term loans.
     */
    maxTenor?: number;
    /**
     * The default tenor for term loans.
     */
    defaultTenor?: number;
    /**
     * The repayment frequency
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
};

