/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillerCommissionType } from './BillerCommissionType';
import type { BillerDeliveryCode } from './BillerDeliveryCode';
import type { BillerStatus } from './BillerStatus';
import type { BillerType } from './BillerType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an biller record.
 */
export type BillerRequest = {
    /**
     * The biller code
     */
    code: string;
    /**
     * The biller label
     */
    label: string;
    /**
     * The GL account used for processing collections for the biller
     */
    glAccountId: UUID;
    /**
     * The status of the biller
     */
    status: BillerStatus;
    /**
     * The type of biller
     */
    type: BillerType;
    /**
     * The delivery code for the biller. This is required for bill types where the value delivery is automated. If not configured the platform will not automatically dispense value after completing the transaction.
     */
    deliveryCode?: BillerDeliveryCode | null;
    /**
     * The biller transaction currency
     */
    currency: string;
    /**
     * The commission charged for bill pay transactions
     */
    commission: number;
    /**
     * The commission calculation type
     */
    commissionType: BillerCommissionType;
    /**
     * The minimum amount that can be scheduled with the biller in each transaction
     */
    minTransAmount: number;
    /**
     * The max amount that can be scheduled with this biller in each transaction
     */
    maxTransAmount: number;
    /**
     * The max amount that can be scheduled with this biller on any given transaction date
     */
    maxDailyAmount: number;
    /**
     * The biller country code
     */
    country: string;
};

