/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsuranceProductCategory } from './InsuranceProductCategory';
import type { InsuranceProductPolicyTerm } from './InsuranceProductPolicyTerm';
import type { InsuranceProductStatus } from './InsuranceProductStatus';
import type { InsuranceProductType } from './InsuranceProductType';
import type { LocalDateTime } from './LocalDateTime';
import type { PremiumConfig } from './PremiumConfig';
import type { UUID } from './UUID';

export type InsuranceProduct = {
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
     * The account ID for processing the premium value. (Asset || Liability)
     */
    premiumValueAccountId: UUID;
    /**
     * The account ID for processing the premium value. (Asset || Liability)
     */
    premiumValueAccountLabel: string;
    /**
     * The account ID for processing the premium value. (Asset || Liability)
     */
    premiumValueAccountNo: string;
    /**
     * The account ID for the tax liability (Liability)
     */
    premiumTaxAccountId: UUID;
    /**
     * The account ID for the tax liability (Liability)
     */
    premiumTaxAccountLabel: string;
    /**
     * The account ID for the tax liability (Liability)
     */
    premiumTaxAccountNo: string;
    /**
     * The account ID for processing premium commission (Expense || Revenue)
     */
    premiumCommissionAccountId: UUID;
    /**
     * The account ID for processing premium commission (Expense || Revenue)
     */
    premiumCommissionAccountLabel: string;
    /**
     * The account ID for processing premium commission (Expense || Revenue)
     */
    premiumCommissionAccountNo: string;
    /**
     * A unique product code
     */
    code: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The product currency
     */
    currency: string;
    /**
     * The product short label
     */
    label: string;
    /**
     * The product description
     */
    description: string;
    /**
     * The status of the product
     */
    status: InsuranceProductStatus;
    /**
     * The product category
     */
    category: InsuranceProductCategory;
    /**
     * The type of the product
     */
    productType: InsuranceProductType;
    /**
     * The policy term of the product
     */
    policyTerm: InsuranceProductPolicyTerm;
    /**
     * The product premium calculation configuration
     */
    premiumConfig?: PremiumConfig | null;
    premiumConfigId?: UUID | null;
};

