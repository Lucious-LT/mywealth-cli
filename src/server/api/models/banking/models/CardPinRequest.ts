/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing an card pin request.
 */
export type CardPinRequest = {
    /**
     * The old PIN. Use 0000 for the first time.
     */
    oldPin: string;
    /**
     * The new PIN
     */
    newPin: string;
};

