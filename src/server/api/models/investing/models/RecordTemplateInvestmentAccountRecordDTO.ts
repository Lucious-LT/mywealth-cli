/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvestmentAccountRecordDTO } from './InvestmentAccountRecordDTO';

export type RecordTemplateInvestmentAccountRecordDTO = {
    /**
     * The total number of records available
     */
    totalCount?: number;
    /**
     * The records returned
     */
    content?: Array<InvestmentAccountRecordDTO>;
};

