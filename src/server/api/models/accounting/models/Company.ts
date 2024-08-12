/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InterCompanyGlAccount } from './InterCompanyGlAccount';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Company = {
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
     * A unique company code
     */
    code: string;
    /**
     * Notes related to the company
     */
    notes?: string | null;
    /**
     * The reporting currency used for managing the company.
     */
    currency: string;
    interCompanyGlAccounts: Array<InterCompanyGlAccount>;
    /**
     * The company description
     */
    label: string;
    revaluationProfitLossAccountId?: UUID | null;
};

