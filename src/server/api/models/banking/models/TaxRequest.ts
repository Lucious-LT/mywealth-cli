/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaxCalculationType } from './TaxCalculationType';
import type { TaxStatus } from './TaxStatus';
import type { TaxType } from './TaxType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an tax configuration record.
 */
export type TaxRequest = {
    /**
     * The tax code
     */
    code: string;
    /**
     * The tax label
     */
    label: string;
    /**
     * The GL account used to process the tax
     */
    glAccountId: UUID;
    /**
     * The status of the tax
     */
    status: TaxStatus;
    /**
     * The type of  tax
     */
    taxType: TaxType;
    /**
     * Specifies if the taxable amount already includes the applicable taxes
     */
    calculationType: TaxCalculationType;
    /**
     * The flat rate
     */
    flatRate: number;
    /**
     * The fee currency
     */
    currency: string;
    /**
     * The percentage rate. This combined with the flat rate to determine total tax amount
     */
    percentageRate: number;
    /**
     * Indicates if this should be applied to interest
     */
    applyToInterest: boolean;
    /**
     * Indicates if this should be applied to fees
     */
    applyToFees: boolean;
    /**
     * Indicates if this should be applied to charges
     */
    applyToCharges: boolean;
};

