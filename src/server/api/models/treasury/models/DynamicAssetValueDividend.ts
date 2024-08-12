/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DynAssetValueCategory } from './DynAssetValueCategory';
import type { DynAssetValueDividendStatus } from './DynAssetValueDividendStatus';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type DynamicAssetValueDividend = {
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
     * The reference code in an upstream system
     */
    refCode: string;
    /**
     * The asset category
     */
    category: DynAssetValueCategory;
    /**
     * The dividend amount
     */
    amount: number;
    /**
     * A unique transaction code
     */
    code: string;
    /**
     * The transaction's description
     */
    label: string;
    /**
     * The dividend #
     */
    dividendNo?: string | null;
    /**
     * The market code
     */
    marketCode: string;
    /**
     * The security description
     */
    secDesc: string;
    /**
     * The security ID
     */
    secId: string;
    /**
     * The security ISIN
     */
    isin?: string | null;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The status of the transaction
     */
    status: DynAssetValueDividendStatus;
    /**
     * The dividend date
     */
    exDivDate: LocalDate;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    /**
     * The journal ID used to process the transaction
     */
    journalId?: UUID | null;
    /**
     * The treasury account ID
     */
    treasuryAccountId: UUID;
    /**
     * The treasury account code
     */
    treasuryAccountCode: string;
    /**
     * The treasury account label
     */
    treasuryAccountLabel: string;
    /**
     * The treasury book ID
     */
    treasuryBookId: UUID;
    /**
     * The treasury book code
     */
    treasuryBookCode: string;
    /**
     * The treasury book label
     */
    treasuryBookLabel: string;
    /**
     * The counter party ID
     */
    counterPartyId: UUID;
    /**
     * The counter party code
     */
    counterPartyCode: string;
    /**
     * The counter party label
     */
    counterPartyLabel: string;
};

