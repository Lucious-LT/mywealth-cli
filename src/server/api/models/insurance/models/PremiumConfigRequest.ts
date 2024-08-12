/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PremiumConfigRateType } from './PremiumConfigRateType';
import type { PremiumConfigSlabRequest } from './PremiumConfigSlabRequest';
import type { PremiumConfigStatus } from './PremiumConfigStatus';

/**
 * A JSON blob representing an premium model record.
 */
export type PremiumConfigRequest = {
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The premium model label
     */
    label: string;
    /**
     * The status of the model
     */
    status: PremiumConfigStatus;
    /**
     * The type of model
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
     * The minimum rate for premium calculations
     */
    minRate: number;
    /**
     * The maximum rate for premium calculations
     */
    maxRate: number;
    /**
     * The fixed or flat fee applied to premium calculations
     */
    fixedRate: number;
    /**
     * The slab entries
     */
    premiumSlabs: Array<PremiumConfigSlabRequest>;
};

