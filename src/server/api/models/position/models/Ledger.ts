/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstrumentType } from './InstrumentType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Ledger = {
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
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    /**
     * The type of the instrument
     */
    instrumentType: InstrumentType;
    /**
     * The id of the instrument
     */
    instrumentId: UUID;
    /**
     * The security ID of the instrument
     */
    secId: string;
    /**
     * The market ID of the instrument
     */
    marketId: string;
    /**
     * The id of the investment account
     */
    accountId: UUID;
    /**
     * The investment account code
     */
    accountNo: string;
    /**
     * The investment account label
     */
    accountLabel: string;
    /**
     * The date that the position was created
     */
    journalDate: LocalDate;
    /**
     * The transaction quantity
     */
    quantity: number;
    /**
     * The transaction price
     */
    price: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction source
     */
    source: string;
    /**
     * The transaction notes
     */
    notes?: string | null;
};

