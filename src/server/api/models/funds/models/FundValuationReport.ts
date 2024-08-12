/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FundAsset } from './FundAsset';
import type { FundFeeAccrual } from './FundFeeAccrual';
import type { FundValuation } from './FundValuation';
import type { LocalDate } from './LocalDate';
import type { UUID } from './UUID';
import type { ValuationReportSummary } from './ValuationReportSummary';

/**
 * A fund valuation report for a given date
 */
export type FundValuationReport = {
    /**
     * The fund id
     */
    fundId: UUID;
    /**
     * The fund code
     */
    code: string;
    /**
     * The fund label
     */
    label: string;
    /**
     * The fund currency
     */
    currency: string;
    tenant: string;
    /**
     * The valuation date
     */
    valuationDate: LocalDate;
    /**
     * The list of products and their details from the report
     */
    fundAssets: Array<FundAsset>;
    /**
     * The valuation record
     */
    fundValuation: FundValuation;
    /**
     * The list of fee records from the fund
     */
    fundFees: Array<FundFeeAccrual>;
    assetSummary: Array<ValuationReportSummary>;
};

