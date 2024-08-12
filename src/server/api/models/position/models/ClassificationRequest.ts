/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a classification record.
 */
export type ClassificationRequest = {
    /**
     * The industry code
     */
    industryCode: string;
    /**
     * The industry
     */
    industry: string;
    /**
     * The super sector code
     */
    superSectorCode: string;
    /**
     * The super sector
     */
    superSector: string;
    /**
     * The sector code
     */
    sectorCode: string;
    /**
     * The sector
     */
    sector: string;
    /**
     * The sub sector code. This has to be a unique value for every classification record.
     */
    subSectorCode: string;
    /**
     * The sub sector
     */
    subSector: string;
    /**
     * The classification description
     */
    definition: string;
};

