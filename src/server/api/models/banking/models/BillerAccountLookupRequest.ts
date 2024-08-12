/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a biller account lookup request.
 */
export type BillerAccountLookupRequest = {
    /**
     * The biller account number
     */
    billerAccountNo: string;
    /**
     * The code of the counter party institution
     */
    billerCode: string;
};

