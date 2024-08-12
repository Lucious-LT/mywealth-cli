/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardBrand } from './CardBrand';
import type { CardFunding } from './CardFunding';
import type { CardStatus } from './CardStatus';
import type { CardType } from './CardType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Card = {
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
     * A masked card PAN
     */
    maskedCardNumber: string;
    /**
     * The card currency
     */
    currency: string;
    /**
     * The expiration year of the card
     */
    expiryYear: string;
    /**
     * The expiration month of the card
     */
    expiryMonth: string;
    /**
     * The card description
     */
    label: string;
    /**
     * The status of the card
     */
    status: CardStatus;
    /**
     * The card brand
     */
    cardBrand: CardBrand;
    /**
     * The type of card
     */
    cardType: CardType;
    /**
     * The funding type for card
     */
    cardFunding: CardFunding;
    /**
     * The card token ID from the card service
     */
    cardTokenId: UUID;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    accountIds: Array<string>;
};

