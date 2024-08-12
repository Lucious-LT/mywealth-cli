/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an order fill request. The fields marked with an * means that they are required.
 */
export type OrderFillRequest = {
    /**
     * A unique identifier for the order
     */
    orderId: string;
    /**
     * The quantity filled.
     */
    quantity: number;
    /**
     * The execution price
     */
    lastPx: number;
    /**
     * The yield for fixed income securities
     */
    yield?: number;
    /**
     * The trade date
     */
    tradeDate: string;
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
};

