/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a cash transaction request. The fields marked with an * means that they are required.
 */
export type CashTransactionRequest = {
    /**
     * A unique identifier for the investment account.
     */
    accountId: string;
    /**
     * A unique identifier for the branch.
     */
    branchId: string;
    /**
     * A unique identifier for the destination investment account. This must be provided if the transaction is a transfer between accounts. Also the destination account must be owned by the same client as the source account.
     */
    destAccountId?: string;
    /**
     * The destination account type for a transfer ie INVEST | BANK | INSURANCE | LOAN. This must be provided if the cash transaction is a transfer between the client's accounts accounts
     */
    destAccountType?: CashTransactionRequest.destAccountType;
    /**
     * Indicates the transaction channel  ie CASH | CHEQUE | ELECTRONIC.
     */
    channel: CashTransactionRequest.channel;
    /**
     * Indicates the type of transaction ie DEPOSIT | PAYMENT | TRANSFER.
     */
    type: CashTransactionRequest.type;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * A reference that uniquely describes the transaction
     */
    reference: string;
    /**
     * Notes on the transaction
     */
    notes?: string;
    /**
     * The value date
     */
    valueDate: string;
    /**
     * Indicates if the cash transaction should be auto approved
     */
    autoApprove: boolean;
};

export namespace CashTransactionRequest {

    /**
     * The destination account type for a transfer ie INVEST | BANK | INSURANCE | LOAN. This must be provided if the cash transaction is a transfer between the client's accounts accounts
     */
    export enum destAccountType {
        INVEST = 'INVEST',
        DEPOSIT = 'DEPOSIT',
        INSURANCE = 'INSURANCE',
        LOAN = 'LOAN',
        NA = 'NA',
        AGENT = 'AGENT',
        CUSTODIAN = 'CUSTODIAN',
    }

    /**
     * Indicates the transaction channel  ie CASH | CHEQUE | ELECTRONIC.
     */
    export enum channel {
        CASH = 'CASH',
        CHEQUE = 'CHEQUE',
        ELECTRONIC = 'ELECTRONIC',
    }

    /**
     * Indicates the type of transaction ie DEPOSIT | PAYMENT | TRANSFER.
     */
    export enum type {
        DEPOSIT = 'DEPOSIT',
        PAYMENT = 'PAYMENT',
        TRANSFER = 'TRANSFER',
    }


}

