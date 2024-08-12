/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type InsuranceAccountView = {
    accountType: string;
    productType: string;
    productCode: string;
    productLabel: string;
    accountNo: string;
    accountLabel: string;
    status: string;
    currency: string;
    cashBalance?: number;
    beginningValue?: number;
    endingValue?: number;
    notes?: string | null;
    refCode: string;
    branch: string;
};

