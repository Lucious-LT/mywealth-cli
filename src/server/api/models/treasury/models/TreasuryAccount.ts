/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookType } from './BookType';
import type { LocalDateTime } from './LocalDateTime';
import type { TreasuryAccountStatus } from './TreasuryAccountStatus';
import type { UUID } from './UUID';

export type TreasuryAccount = {
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
     * The status of the investment account
     */
    status: TreasuryAccountStatus;
    /**
     * A currency of the investment account. All transactions must in the same currency
     */
    currency: string;
    /**
     * The account description
     */
    label: string;
    /**
     * Notes related to the account
     */
    notes?: string | null;
    /**
     * A unique investment account code
     */
    code: string;
    /**
     * An investment account ID from the investment service
     */
    tradingAccountId?: UUID | null;
    /**
     * An investment account label from the investment service
     */
    tradingAccountLabel?: string | null;
    /**
     * An investment account code from the investment service
     */
    tradingAccountCode?: string | null;
    /**
     * The treasury book ID
     */
    treasuryBookId: UUID;
    /**
     * The treasury book type
     */
    treasuryBookType: BookType;
    /**
     * The treasury book code
     */
    treasuryBookCode: string;
    /**
     * The treasury book label
     */
    treasuryBookLabel: string;
};

