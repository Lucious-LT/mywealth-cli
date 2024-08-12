/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InvestmentAgent } from './InvestmentAgent';

export type PageTemplateInvestmentAgent = {
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
    order?: PageTemplateInvestmentAgent.order;
    /**
     * The records returned
     */
    content?: Array<InvestmentAgent>;
};

export namespace PageTemplateInvestmentAgent {

    /**
     * The sort direction
     */
    export enum order {
        ASC = 'asc',
        DESC = 'desc',
    }


}

