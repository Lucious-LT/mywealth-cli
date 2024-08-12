/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { PremiumConfigRateType } from './PremiumConfigRateType';
import type { PremiumConfigSlab } from './PremiumConfigSlab';
import type { PremiumConfigStatus } from './PremiumConfigStatus';
import type { UUID } from './UUID';

export type PremiumConfig = {
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
     * A unique model code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The premium model description
     */
    label: string;
    /**
     * The status of the premium model
     */
    status: PremiumConfigStatus;
    /**
     * The source of the premium rate
     */
    rateType: PremiumConfigRateType;
    /**
     * The default rate for premium calculations
     */
    defaultRate: number;
    /**
     * The commission rate for premium calculations
     */
    commissionRate: number;
    /**
     * The tax rate for premium calculations
     */
    taxRate: number;
    /**
     * The fixed or flat fee applied to premium calculations
     */
    fixedRate: number;
    /**
     * The minimum rate for premium calculations
     */
    minRate: number;
    /**
     * The maximum rate for premium calculations
     */
    maxRate: number;
    premiumSlabs: Array<PremiumConfigSlab>;
};

