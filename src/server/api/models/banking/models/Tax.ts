/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { TaxCalculationType } from './TaxCalculationType';
import type { TaxStatus } from './TaxStatus';
import type { TaxType } from './TaxType';
import type { UUID } from './UUID';

export type Tax = {
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
    /**
     * The GL account ID used to process the taxes
     */
    glAccountId: UUID;
    /**
     * The tax currency
     */
    currency: string;
    /**
     * The GL account label used to process the taxes
     */
    glAccountLabel: string;
    /**
     * The GL account code used to process the taxes
     */
    glAccountCode: string;
    /**
     * A unique tax code
     */
    code: string;
    /**
     * The tax description
     */
    label: string;
    /**
     * The status of the tax
     */
    status: TaxStatus;
    /**
     * The type of tax
     */
    taxType: TaxType;
    /**
     * Specifies if the taxable amount already includes the applicable taxes
     */
    calculationType: TaxCalculationType;
    /**
     * The flat rate. This is added to the calculated tax.
     */
    flatRate: number;
    /**
     * The percentage rate. This combined with the flat rate to determine total tax amount
     */
    percentageRate: number;
};

