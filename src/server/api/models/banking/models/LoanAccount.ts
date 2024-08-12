/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountStatus } from './AccountStatus';
import type { LoanAccountDisbursement } from './LoanAccountDisbursement';
import type { LoanAccountPerfStatus } from './LoanAccountPerfStatus';
import type { LoanAccountSchedule } from './LoanAccountSchedule';
import type { LoanAccountTranche } from './LoanAccountTranche';
import type { LoanProductPaymentFrequency } from './LoanProductPaymentFrequency';
import type { LoanProductType } from './LoanProductType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { SubAccountType } from './SubAccountType';
import type { UUID } from './UUID';

export type LoanAccount = {
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
     * A reference code for the account record in an upstream system
     */
    refCode: string;
    /**
     * The date that the account was opened. Defaults to the current date if not provided.
     */
    accountOpenDate: LocalDate;
    /**
     * The status of the account
     */
    status: AccountStatus;
    /**
     * The client ID from the crm service
     */
    clientId: UUID;
    /**
     * The client description
     */
    clientLabel: string;
    /**
     * The client code from CRM
     */
    clientCode: string;
    /**
     * A unique account number
     */
    accountNo: string;
    /**
     * The account description
     */
    accountLabel: string;
    /**
     * The account currency
     */
    currency: string;
    /**
     * The account balance
     */
    balance: number;
    /**
     * Indicates when the balance was updated.
     */
    balanceTime?: LocalDateTime | null;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The account branch ID
     */
    branchId: UUID;
    /**
     * The account branch code
     */
    branchCode: string;
    /**
     * The account branch label
     */
    branchLabel: string;
    /**
     * The account group ID
     */
    accountGroupId?: UUID | null;
    /**
     * The account group code
     */
    accountGroupCode?: string | null;
    /**
     * The account group label
     */
    accountGroupLabel?: string | null;
    active?: boolean;
    /**
     * The interest rate
     */
    interestRate: number;
    /**
     * The requested principal amount
     */
    principalAmount: number;
    /**
     * A lump (balloon) payment that is made at the end of the loan.
     */
    balloonAmount: number;
    /**
     * A period during which the client does not repay the interest. This cannot exceed what is configured in the product.
     */
    interestGracePeriod: number;
    /**
     * A period during which the client does not repay the principal. This cannot exceed what is configured in the product.
     */
    principalGracePeriod: number;
    /**
     * Date that the payment should start
     */
    disbursementDate: LocalDate;
    /**
     * The  repayment frequency
     */
    paymentFrequency: LoanProductPaymentFrequency;
    /**
     * Day of the month when the payment should be due. The dates will be adjusted to a valid day in any given month where the requested day is invalid
     */
    paymentDay: number;
    /**
     * The tenor of the loan in days. This is required for term loans
     */
    tenor?: number | null;
    loanPaymentSchedule: Array<LoanAccountSchedule>;
    tranches: Array<LoanAccountTranche>;
    disbursements: Array<LoanAccountDisbursement>;
    /**
     * The total fees
     */
    totalFees: number;
    /**
     * The upfront fees
     */
    upfrontFees: number;
    /**
     * The amortized fees
     */
    amortizedFees: number;
    /**
     * The capitalized fees
     */
    capitalizedFees: number;
    /**
     * The total taxes
     */
    totalTaxes: number;
    /**
     * The upfront taxes
     */
    upfrontTaxes: number;
    /**
     * The capitalized taxes
     */
    amortizedTaxes: number;
    /**
     * The total interest
     */
    totalInterest: number;
    /**
     * The expected maturity of the loan. This will be populated for term loans based on the tenor
     */
    expectedMaturity?: LocalDate | null;
    /**
     * The performance status of the loan
     */
    loanStatus: LoanAccountPerfStatus;
    /**
     * Date that the application was submitted
     */
    applicationDate: LocalDate;
    /**
     * Date that the application was approved
     */
    approvalDate?: LocalDate | null;
    /**
     * Due date of the next payment
     */
    nextPaymentDueDate?: LocalDate | null;
    /**
     * The due payment amount
     */
    nextPaymentAmount?: number | null;
    /**
     * The date the last payment was made
     */
    lastPaymentDate?: LocalDate | null;
    /**
     * The last payment amount
     */
    lastPaymentAmount?: number | null;
    /**
     * The principal balance computed after every payment or end of day process
     */
    principalBalance?: number | null;
    /**
     * The interest balance computed after every payment or end of day process
     */
    interestBalance?: number | null;
    /**
     * The penalty balance computed after every payment or end of day process
     */
    penaltyBalance?: number | null;
    /**
     * The fee balance computed after every payment or end of day process
     */
    feesBalance?: number | null;
    /**
     * The tax balance computed after every payment or end of day process
     */
    taxBalance?: number | null;
    /**
     * The principal due computed after the end of day process
     */
    principalDue?: number | null;
    /**
     * The interest due computed after the end of day process
     */
    interestDue?: number | null;
    /**
     * The penalty due computed after the end of day process
     */
    penaltyDue?: number | null;
    /**
     * The fees due computed after the end of day process
     */
    feesDue?: number | null;
    /**
     * The tax due computed after the end of day process
     */
    taxDue?: number | null;
    /**
     * The principal paid computed after the end of day process
     */
    principalPaid?: number | null;
    /**
     * The interest paid computed after the end of day process
     */
    interestPaid?: number | null;
    /**
     * The penalty paid computed after the end of day process
     */
    penaltyPaid?: number | null;
    /**
     * The fees paid computed after the end of day process
     */
    feesPaid?: number | null;
    /**
     * The tax paid computed after the end of day process
     */
    taxPaid?: number | null;
    /**
     * The accrued interest
     */
    accruedInterest?: number | null;
    /**
     * The accrued penalty
     */
    accruedPenalty?: number | null;
    /**
     * The number of days in arrears. This is calculated using the last payment date and adjusted for the allowed tolerance and business calendar
     */
    daysInArrears?: number | null;
    /**
     * The number of days late. This is calculated using the last payment date.
     */
    daysLate?: number | null;
    /**
     * The date the loan was terminated
     */
    terminationDate?: LocalDate | null;
    /**
     * The product type
     */
    productType: string;
    /**
     * The account type
     */
    accountType: SubAccountType;
    /**
     * The product label
     */
    productLabel: string;
    /**
     * The product code
     */
    productCode: string;
    /**
     * The load asset account ID
     */
    glAccountId: UUID;
    /**
     * The transaction source account ID
     */
    transactionSourceId: UUID;
    /**
     * Indicates if bill pay is enabled for this product
     */
    billPayEnabled?: boolean;
    /**
     * Indicates if transfers are enabled for this product
     */
    transfersEnabled?: boolean;
    /**
     * Indicates if cards are enabled for this product
     */
    cardsEnabled?: boolean;
    /**
     * The product ID
     */
    productId: UUID;
    /**
     * The loan type
     */
    loanType: LoanProductType;
    disbursementPrincipal?: number;
    disbursementFeesAndTaxes?: number;
};

