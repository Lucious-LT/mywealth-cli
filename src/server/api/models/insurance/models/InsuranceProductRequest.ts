/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InsuranceProductCategory } from './InsuranceProductCategory';
import type { InsuranceProductPolicyTerm } from './InsuranceProductPolicyTerm';
import type { InsuranceProductStatus } from './InsuranceProductStatus';
import type { InsuranceProductType } from './InsuranceProductType';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a product record.
 */
export type InsuranceProductRequest = {
    /**
     * The account ID for processing the premium value. (Asset || Liability)
     */
    premiumValueAccountId: UUID;
    /**
     * The account ID for the tax liability (Liability)
     */
    premiumTaxAccountId: UUID;
    /**
     * The account ID for processing premium commission (Expense || Revenue)
     */
    premiumCommissionAccountId: UUID;
    /**
     * The product code
     */
    code: string;
    /**
     * The product label
     */
    label: string;
    /**
     * Notes related to the record
     */
    notes?: string | null;
    /**
     * The product description
     */
    description: string;
    /**
     * The product currency
     */
    currency: string;
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
     * Indicates the policy terms
     */
    policyTerm: InsuranceProductPolicyTerm;
    /**
     * The configuration for calculating policy premiums
     */
    premiumConfigId: UUID | null;
};

