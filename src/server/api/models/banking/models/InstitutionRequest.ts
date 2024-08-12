/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstitutionStatus } from './InstitutionStatus';
import type { InstitutionType } from './InstitutionType';

/**
 * A JSON blob representing an institution record.
 */
export type InstitutionRequest = {
    /**
     * The institution code
     */
    code: string;
    /**
     * The institution label
     */
    label: string;
    /**
     * The status of the institution
     */
    status: InstitutionStatus;
    /**
     * The type of institution
     */
    type: InstitutionType;
    /**
     * The routing code of the institution
     */
    routingNo?: string | null;
    /**
     * The swift code of the institution
     */
    swiftCode?: string | null;
    /**
     * The institution country code
     */
    country: string;
};

