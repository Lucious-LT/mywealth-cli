/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an account lien. The fields marked with an * means that they are required.
 */
export type InvestmentAccountLienRequest = {
    /**
     * A unique identifier for the investment account
     */
    accountId: string;
    /**
     * A text that describes the lien
     */
    lienLabel: string;
    /**
     * Any notes that apply to this account
     */
    notes?: string;
    /**
     * Specify the applicable lien amount
     */
    amount?: number;
    /**
     * The date that the lien should expire.
     */
    expirationDate: string;
};

