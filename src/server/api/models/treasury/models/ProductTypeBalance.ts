/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { ProductType } from './ProductType';

export type ProductTypeBalance = {
    positionDate: LocalDate;
    productType: ProductType;
    totalValue?: number;
    totalIncome?: number;
    accruedIncome?: number;
};

