/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an order fill.
 */
export type OrderFill = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * Indicates when the record was created.
     */
    createdAt: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * Indicates when the record was last modified.
     */
    updatedAt: string;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The contract note ID
     */
    contractNoteId?: string;
    /**
     * The order ID
     */
    orderId: string;
    /**
     * The order #. This is also the ClOrderId when executing orders using the FIX protocol
     */
    orderNo: string;
    /**
     * A label that describes the order
     */
    orderDesc: string;
    /**
     * The market order ID from the execution venue
     */
    marketOrderId?: string;
    /**
     * The security identifier
     */
    secId: string;
    /**
     * A trader ID from the execution venue
     */
    traderId?: string;
    /**
     * Any text generated during the execution
     */
    text?: string;
    /**
     * A unique trade match ID. This is typically guaranteed to be unique for every trading session.
     */
    trdMatchId?: string;
    /**
     * The execution ID
     */
    execId?: string;
    /**
     * The execution type
     */
    execType?: string;
    /**
     * The order side
     */
    side: OrderFill.side;
    /**
     * The order status
     */
    ordStatus: OrderFill.ordStatus;
    /**
     * The order time in force
     */
    tif: OrderFill.tif;
    /**
     * The order expiry date
     */
    expires: string;
    /**
     * The trade date
     */
    tradeDate: string;
    /**
     * The user ID
     */
    userId: string;
    /**
     * Investing account # that the order is placed against
     */
    investingAccountNo: string;
    lastPx?: number;
    avgPx?: number;
    orderQty?: number;
    leavesQty?: number;
    lastQty?: number;
    cumQty?: number;
    price?: number;
    yield?: number;
    /**
     * The status of the fill
     */
    fillStatus: OrderFill.fillStatus;
};

export namespace OrderFill {

    /**
     * The order side
     */
    export enum side {
        BUY = 'BUY',
        SELL = 'SELL',
    }

    /**
     * The order status
     */
    export enum ordStatus {
        PENDING = 'PENDING',
        REJECTED = 'REJECTED',
        APPROVED = 'APPROVED',
        NEW = 'NEW',
        REPLACED = 'REPLACED',
        FILLED = 'FILLED',
        CANCELED = 'CANCELED',
        EXPIRED = 'EXPIRED',
        PENDING_CANCEL = 'PENDING_CANCEL',
        PARTIALLY_FILLED = 'PARTIALLY_FILLED',
    }

    /**
     * The order time in force
     */
    export enum tif {
        DAY = 'DAY',
        GOOD_TILL_DATE = 'GOOD_TILL_DATE',
        GOOD_TILL_CANCELLED = 'GOOD_TILL_CANCELLED',
    }

    /**
     * The status of the fill
     */
    export enum fillStatus {
        PENDING = 'PENDING',
        POSTED = 'POSTED',
        REVERSED = 'REVERSED',
    }


}

