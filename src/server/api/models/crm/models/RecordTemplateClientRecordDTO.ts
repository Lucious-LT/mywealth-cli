/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientRecordDTO } from './ClientRecordDTO';

export type RecordTemplateClientRecordDTO = {
    /**
     * The total number of records available
     */
    totalCount?: number;
    /**
     * The records returned
     */
    content?: Array<ClientRecordDTO>;
};

