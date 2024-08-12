/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { PolicyPaymentTerms } from './PolicyPaymentTerms';
import type { PolicyRiskType } from './PolicyRiskType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an quote record.
 */
export type QuoteRequest = {
    /**
     * The quote label
     */
    quoteLabel: string;
    /**
     * The reference quote number
     */
    refQuoteNo: string;
    /**
     * The quote currency
     */
    currency: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The type of risk insured
     */
    riskType: PolicyRiskType;
    /**
     * Indicates the payment terms for the premium
     */
    paymentTerms: PolicyPaymentTerms;
    /**
     * The value insured
     */
    sumInsured: number;
    /**
     * Indicates the start date for the quote
     */
    startDate: LocalDate;
    /**
     * The client ID from CRM of the quote owner
     */
    clientId: UUID;
    /**
     * The product ID for the quote
     */
    productId: UUID;
    /**
     * The branch ID for the quote
     */
    branchId: UUID;
    /**
     * The partner ID for the quote. This is required if the risk is transferred to a third party
     */
    partnerId?: UUID | null;
};

