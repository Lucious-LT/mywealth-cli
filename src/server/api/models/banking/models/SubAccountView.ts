/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductType } from './ProductType';
import type { SubAccountStatus } from './SubAccountStatus';
import type { SubAccountType1 } from './SubAccountType1';
import type { UUID } from './UUID';

export type SubAccountView = {
    id: UUID;
    productType: ProductType;
    accountType: SubAccountType1;
    status: SubAccountStatus;
    accountNo: string;
    accountLabel: string;
};

