/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BillerCommissionType } from './BillerCommissionType';
import type { BillerDeliveryCode } from './BillerDeliveryCode';
import type { BillerStatus } from './BillerStatus';
import type { BillerType } from './BillerType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Biller = {
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
     * The GL account ID used to process collections for this biller
     */
    glAccountId: UUID;
    /**
     * The GL account label used to process collections for this biller
     */
    glAccountLabel: string;
    /**
     * The GL account code used to process collections for this biller
     */
    glAccountCode: string;
    /**
     * A unique biller code
     */
    code: string;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The commission charged for bill pay transactions
     */
    commission: number;
    /**
     * The commission type
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
     * The billers country code
     */
    country: string;
    /**
     * The billers description
     */
    label: string;
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
};

