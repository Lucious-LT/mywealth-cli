/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldDetail } from './FieldDetail';
import type { LocalDateTime } from './LocalDateTime';

export type AppMessage = {
    /**
     * When the message was generated
     */
    timestamp: LocalDateTime;
    /**
     * A code for the error
     */
    code: string;
    /**
     * A summary of the message
     */
    summary: string;
    /**
     * Details of the error
     */
    details: string;
    /**
     * A list of all affected fields and description of the problem
     */
    fields: Array<FieldDetail>;
};

