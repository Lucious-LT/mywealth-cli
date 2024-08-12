/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a dividend distribution request record.
 */
export type ScheduledDividendDistributionRequest = {
    /**
     * A fund identifier for the dividend distribution request.
     */
    fundId: UUID;
    /**
     * The requested distribution date for the dividend.
     */
    distributionDate: LocalDate;
    /**
     * Holds the tenant configuration.
     */
    tenant?: string | null;
    /**
     * Holds start time.
     */
    startTime?: LocalDateTime | null;
    /**
     * Holds the end time.
     */
    endTime?: LocalDateTime | null;
};

