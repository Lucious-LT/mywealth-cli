/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { KycTier } from './KycTier';

export type PageTemplateKycTier = {
    /**
     * The page number requested. A zero-based page index (0..N)
     */
    page?: number;
    /**
     * The size of the page to be returned
     */
    size?: number;
    /**
     * The total number of pages available
     */
    totalPages?: number;
    /**
     * The total number of records available
     */
    totalCount?: number;
    /**
     * The field used to sort the response
     */
    sort?: string;
    /**
     * The sort direction
     */
    order?: PageTemplateKycTier.order;
    /**
     * The records returned
     */
    content?: Array<KycTier>;
};

export namespace PageTemplateKycTier {

    /**
     * The sort direction
     */
    export enum order {
        ASC = 'asc',
        DESC = 'desc',
    }


}

