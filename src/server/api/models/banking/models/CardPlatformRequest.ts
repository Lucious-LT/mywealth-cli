/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardBrand } from './CardBrand';
import type { CardFunding } from './CardFunding';
import type { CardPlatformAccount } from './CardPlatformAccount';
import type { CardType } from './CardType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an card request.
 */
export type CardPlatformRequest = {
    cardOwner: string;
    cardBrand: CardBrand;
    institutionId: string;
    cardAddressLine1?: string | null;
    cardAddressLine2?: string | null;
    cardCity?: string | null;
    cardState?: string | null;
    cardPostCode: string;
    cardCountry: string;
    cardCurrency: string;
    cardFunding: CardFunding;
    cardType: CardType;
    clientId: UUID;
    accounts: Array<CardPlatformAccount>;
};

