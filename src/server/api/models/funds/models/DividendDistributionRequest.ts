/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { RedemptionType } from './RedemptionType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a dividend distribution request record.
 */
export type DividendDistributionRequest = {
    accountId: UUID;
    accountLabel: string;
    orderId: UUID;
    branchId: UUID;
    orderNo: string;
    glAccountId: UUID;
    fundCode: string;
    distributionDate: LocalDate;
    /**
     * The redemption type. A full redemption will post all pending accruals and also post the cash journal. A partial redemption will post all the pending accruals and schedule the dividend to be paid during the next distribution date.
     */
    redemptionType: RedemptionType;
};

