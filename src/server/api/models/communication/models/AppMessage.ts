/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldDetail } from './FieldDetail';

export type AppMessage = {
    /**
     * When the message was generated
     */
    timestamp: string;
    /**
     * A summary of the message
     */
    summary: string;
    /**
     * An error code
     */
    code?: string;
    /**
     * Details of the error
     */
    details?: string;
    /**
     * A list of all affected fields and description of the problem
     */
    fields: Array<FieldDetail>;
};

