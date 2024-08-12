/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardBrand } from './CardBrand';
import type { CardPlatformAccount } from './CardPlatformAccount';
import type { CardStatus } from './CardStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an card request.
 */
export type CardPlatformResponse = {
    cardOwner: string;
    cardTokenId: UUID;
    cardNumberMasked: string;
    cardStatus: CardStatus;
    expiryYear: string;
    expiryMonth: string;
    cardBrand: CardBrand;
    institutionId: string;
    cardCountry: string;
    cardCurrency: string;
    cardFunding: string;
    cardType: string;
    clientId: UUID;
    clientLabel: string;
    accounts: Array<CardPlatformAccount>;
};

