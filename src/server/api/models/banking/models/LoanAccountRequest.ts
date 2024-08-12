/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LoanAccountTrancheRequest } from './LoanAccountTrancheRequest';
import type { LoanProductPaymentFrequency } from './LoanProductPaymentFrequency';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account record.
 */
export type LoanAccountRequest = {
    /**
     * The account label
     */
    accountLabel: string;
    /**
     * The client ID from CRM of the account owner
     */
    clientId: UUID;
    /**
     * The product ID for the account
     */
    productId: UUID;
    /**
     * The branch ID for the account
     */
    branchId: UUID;
    /**
     * The account group ID
     */
    accountGroupId?: UUID | null;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The interest rate. If not specified, this will default to what is configured in the product. The value has to be within the range configured in the product.
     */
    interestRate?: number | null;
    /**
     * The requested principal amount
     */
    principalAmount: number;
    /**
     * Indicates if the account should be automatically approved
     */
    autoApprove?: boolean;
    /**
     * The reference code in an upstream system
     */
    refCode?: string | null;
    /**
     * A lump (balloon) payment that is made at the end of the loan. This sum will not accrue any interest
     */
    balloonAmount?: number | null;
    /**
     * A period during which the client does not repay the interest. This cannot exceed what is configured in the product.
     */
    interestGracePeriod?: number | null;
    /**
     * A period during which the client does not repay the principal. This cannot exceed what is configured in the product.
     */
    principalGracePeriod?: number | null;
    /**
     * Specifies the date that the application was captured. This value cannot be in the past. If you want to backdate the loan, use the disbursement date
     */
    applicationDate: LocalDate;
    /**
     * Requested disbursement date. This value can be change when the loan is disbursed but defaults to the application date if not specified
     */
    disbursementDate?: LocalDate | null;
    /**
     * The tenor of the loan in days. This is required for term loans
     */
    tenor?: number | null;
    /**
     * Day of the month when the payment should be due. The dates will be adjusted to a valid day in any given month where the requested day is invalid and defaults to the last day of the month if not specified
     */
    paymentDay?: number | null;
    /**
     * The repayment frequency. Defaults to the product value if not specified
     */
    paymentFrequency?: LoanProductPaymentFrequency | null;
    /**
     * The tranche entries. This is required if the loan product supports tranches. If not specified, the loan will be created without any tranche
     */
    tranches: Array<LoanAccountTrancheRequest>;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate?: LocalDate | null;
};

