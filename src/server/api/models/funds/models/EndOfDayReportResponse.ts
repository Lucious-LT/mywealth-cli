/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReport } from './EndOfDayReport';

export type EndOfDayReportResponse = {
    /**
     * The tenant
     */
    tenant: string;
    /**
     * The set of reports contained in the response
     */
    endOfDayReports: Array<EndOfDayReport>;
};

