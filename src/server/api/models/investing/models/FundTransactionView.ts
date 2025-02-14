/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a fund transaction record. The fields marked with an * means that they are required.
 */
export type FundTransactionView = {
    /**
     * A unique identifier for the investment account that is generated by the investing service.
     */
    accountId: string;
    /**
     * Indicates the order side ie SUBSCRIPTION | REDEMPTION .
     */
    orderType: FundTransactionView.orderType;
    /**
     * The ID for the security to be traded.
     */
    secId: string;
    /**
     * The quantity requested. This is validated using the security master instrument definition. If this is not set then a valid transaction value must be provided. If this is set, it will be used to calculate the transaction value.
     */
    requestedQty?: number;
    /**
     * This is optional and if the requested quantity is not set, it will be used to calculate the transaction quantity
     */
    requestedVal?: number;
    /**
     * Optionally specify a price to be used for the transaction. If this is not provided, the bid / offer price for the transaction date will be used.
     */
    price?: number;
    /**
     * The request date
     */
    requestDate: string;
    /**
     * The specified value must match the currency configured in the instrument definition.
     */
    currency: string;
    /**
     * The current status of the order and this is updated based on execution reports from a trading venue.
     */
    orderStatus?: FundTransactionView.orderStatus;
    /**
     * A unique order number that is generated by the investing service.
     */
    orderNo: string;
};

export namespace FundTransactionView {

    /**
     * Indicates the order side ie SUBSCRIPTION | REDEMPTION .
     */
    export enum orderType {
        SUBSCRIPTION = 'SUBSCRIPTION',
        REDEMPTION = 'REDEMPTION',
    }

    /**
     * The current status of the order and this is updated based on execution reports from a trading venue.
     */
    export enum orderStatus {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        FILLED = 'FILLED',
        CANCELED = 'CANCELED',
        REVERSED = 'REVERSED',
    }


}

