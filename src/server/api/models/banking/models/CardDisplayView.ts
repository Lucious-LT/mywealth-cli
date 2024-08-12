/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardBrand } from './CardBrand';
import type { CardFunding } from './CardFunding';
import type { CardStatus } from './CardStatus';
import type { CardType } from './CardType';

export type CardDisplayView = {
    cardStatus: CardStatus;
    cardOwner: string;
    cardNumber: string;
    cardCvv: string;
    cardExpiryYear: string;
    cardExpiryMonth: string;
    cardType: CardType;
    cardBrand: CardBrand;
    cardCurrency: string;
    cardFunding: CardFunding;
};

