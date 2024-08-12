/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes the recordId of a money object in the system
 */
export type AccountBalance = {
    /**
     * A valid currency code
     */
    currency?: string;
    /**
     * A valid amount
     */
    amount?: number;
    /**
     * Time when the balance was generated
     */
    updatedAt?: string;
};

