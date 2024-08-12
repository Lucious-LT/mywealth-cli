/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fixed asset record.
 */
export type FixedAssetRequest = {
    /**
     * The record label
     */
    label: string;
    /**
     * A reference used to post the journals
     */
    reference: string;
    /**
     * The transaction currency.
     */
    currency: string;
    /**
     * The amount to be amortized
     */
    amount: number;
    /**
     * Notes related to the asset
     */
    notes?: string | null;
    /**
     * The transaction date ie when the asset was created or purchased. Note that if the effective date is after the start date, the system assumes that this is a transferred schedule and will not post the initial transfer entry.
     */
    effectiveDate: LocalDate;
    /**
     * The amortization start date. This should be equal to or greater than the effective date.
     */
    startDate: LocalDate;
    /**
     * The asset group id
     */
    assetGroupId: UUID;
};

