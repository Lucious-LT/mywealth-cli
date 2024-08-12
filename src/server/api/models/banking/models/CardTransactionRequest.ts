/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardTransactionChannel } from './CardTransactionChannel';
import type { CardTransactionType } from './CardTransactionType';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

export type CardTransactionRequest = {
    /**
     * The card token ID
     */
    cardTokenId: UUID;
    /**
     * The transaction ID send by the gateway
     */
    transactionId: UUID;
    /**
     * The hold ID send by the gateway. This is used to release the hold during the capture process
     */
    accountHoldId?: UUID | null;
    /**
     * The card account ID
     */
    accountId: UUID;
    /**
     * The transaction type
     */
    type: CardTransactionType;
    /**
     * The transaction date
     */
    date: LocalDate;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction currency. This has to be the same as the account currency
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

