/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EndOfDayReport } from './EndOfDayReport';

export type EndOfDayReportResponse = {
    /**
     * Holds the tenant configuration
     */
    tenant?: string;
    /**
     * A list of end of day reports
     */
    endOfDayReports?: Array<EndOfDayReport>;
};

