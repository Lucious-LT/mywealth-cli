/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardTransactionChannel } from './CardTransactionChannel';
import type { CardTransactionStatus } from './CardTransactionStatus';
import type { CardTransactionType } from './CardTransactionType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type CardTransaction = {
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
     * The card ID
     */
    cardId: UUID;
    /**
     * The account ID
     */
    accountId: UUID;
    /**
     * The transaction type
     */
    type: CardTransactionType;
    /**
     * The transaction Id from the payment gateway
     */
    transactionId: UUID;
    /**
     * The transaction date
     */
    date: LocalDate;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction description
     */
    description: string;
    /**
     * The transaction reference
     */
    reference: string;
    /**
     * The transaction status
     */
    status: CardTransactionStatus;
    /**
     * The transaction response code
     */
    responseCode?: string | null;
    /**
     * The transaction response message
     */
    responseMessage?: string | null;
    /**
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    /**
     * The journal ID used to process the transaction
     */
    journalId?: UUID | null;
    /**
     * The transaction channel
     */
    channel: CardTransactionChannel;
    /**
     * The transaction merchant
     */
    merchantName?: string | null;
    /**
     * The transaction merchant category
     */
    merchantCategory?: string | null;
    /**
     * The transaction merchant country
     */
    merchantCountry?: string | null;
    /**
     * The transaction merchant city
     */
    merchantCity?: string | null;
    /**
     * The transaction merchant address
     */
    merchantAddress?: string | null;
    /**
     * The transaction merchant postal code
     */
    merchantPostalCode?: string | null;
    /**
     * The transaction merchant state
     */
    merchantState?: string | null;
    /**
     * The transaction merchant phone number
     */
    merchantPhoneNumber?: string | null;
    /**
     * The transaction merchant email
     */
    merchantEmail?: string | null;
    /**
     * The transaction merchant website
     */
    merchantWebsite?: string | null;
    /**
     * The transaction merchant latitude
     */
    merchantLatitude?: string | null;
    /**
     * The transaction merchant longitude
     */
    merchantLongitude?: string | null;
    /**
     * The transaction merchant timezone
     */
    merchantTimeZone?: string | null;
};

