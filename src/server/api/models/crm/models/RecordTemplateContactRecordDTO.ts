/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContactRecordDTO } from './ContactRecordDTO';

export type RecordTemplateContactRecordDTO = {
    /**
     * The total number of records available
     */
    totalCount?: number;
    /**
     * The records returned
     */
    content?: Array<ContactRecordDTO>;
};

