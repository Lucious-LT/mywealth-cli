/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterCompanyGlAccountRequest } from './InterCompanyGlAccountRequest';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a company record.
 */
export type CompanyRequest = {
    /**
     * The company code
     */
    code: string;
    /**
     * The company label
     */
    label: string;
    /**
     * The reporting currency used for managing the company.
     */
    currency: string;
    /**
     * Notes related to the company
     */
    notes?: string | null;
    /**
     * GL accounts for inter company transactions
     */
    interCompanyGlAccounts: Array<InterCompanyGlAccountRequest>;
    /**
     * GL Account for processing revaluation profit or loss
     */
    revaluationProfitLossAccountId?: UUID | null;
};

