/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardBrand } from './CardBrand';
import type { CardFunding } from './CardFunding';
import type { CardType } from './CardType';

/**
 * A JSON blob representing an card request.
 */
export type CardRequest = {
    /**
     * The card label
     */
    label: string;
    /**
     * The card currency. This has to be the same as the account currency
     */
    currency: string;
    /**
     * The account ID for the card
     */
    accounts: Array<string>;
    /**
     * The type of card
     */
    cardType: CardType;
    /**
     * The funding type for card
     */
    cardFunding: CardFunding;
    /**
     * The card brand
     */
    cardBrand: CardBrand;
    /**
     * Notes related to the record
     */
    notes?: string | null;
};

