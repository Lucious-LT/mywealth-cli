/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountType } from './AccountType';
import type { UUID } from './UUID';

export type CardPlatformAccount = {
    accountId: UUID;
    accountNo: string;
    accountLabel: string;
    accountType: AccountType;
};

