/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a fixed deposit transaction tranche request.
 */
export type FixedDepositTransactionTrancheRequest = {
    /**
     * The fixed deposit transaction ID
     */
    transactionId: string;
    /**
     * The face value amount
     */
    principal: number;
    /**
     * The rate used to book the tranche.
     */
    interestRate: number;
    /**
     * The start date
     */
    startDate: string;
    /**
     * The transaction type
     */
    transactionType: FixedDepositTransactionTrancheRequest.transactionType;
};

export namespace FixedDepositTransactionTrancheRequest {

    /**
     * The transaction type
     */
    export enum transactionType {
        ADDITION = 'ADDITION',
        WITHDRAWAL = 'WITHDRAWAL',
    }


}

