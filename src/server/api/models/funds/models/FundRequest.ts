/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DynamicAssetValueGlAccountRequest } from './DynamicAssetValueGlAccountRequest';
import type { FeeDayCount } from './FeeDayCount';
import type { FixedIncomeGlAccountRequest } from './FixedIncomeGlAccountRequest';
import type { FundStatus } from './FundStatus';
import type { FundType } from './FundType';
import type { LocalDate } from './LocalDate';
import type { MoneyMarketGlAccountRequest } from './MoneyMarketGlAccountRequest';
import type { PlacementGlAccountRequest } from './PlacementGlAccountRequest';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an fund record.
 */
export type FundRequest = {
    /**
     * The fund code
     */
    code: string;
    /**
     * The international security identification number for the instrument.
     */
    isin?: string | null;
    /**
     * The market ID. Note that this must resolve to an existing market  in the position service
     */
    marketId: UUID;
    /**
     * The description of the fund
     */
    label: string;
    /**
     * Notes related to the fund
     */
    notes?: string | null;
    /**
     * The status of the fund
     */
    status: FundStatus;
    /**
     * The type of fund
     */
    type: FundType;
    /**
     * A currency used for valuing the fund
     */
    currency: string;
    /**
     * GL accounts for processing dynamic asset value positions
     */
    dynAssetValueAccounts: Array<DynamicAssetValueGlAccountRequest>;
    /**
     * GL accounts for processing fixed income positions
     */
    fixedIncomeAccounts: Array<FixedIncomeGlAccountRequest>;
    /**
     * GL accounts for processing money market positions
     */
    moneyMarketAccounts: Array<MoneyMarketGlAccountRequest>;
    /**
     * GL accounts for processing placement positions
     */
    placementAccounts: Array<PlacementGlAccountRequest>;
    /**
     * The day count convention used for accruing the fund fees and calculating the yield.
     */
    feeDayCount: FeeDayCount;
    /**
     *
     * The early withdrawal penalty rate. This is a penalty rate applied to the return if a
     * redemption is done within the lock in period
     *
     */
    earlyRedemptionPenaltyRate: number;
    /**
     *
     * The early withdrawal fixed charge. This is added to the penalty calculated using the penalty rate.
     *
     */
    earlyRedemptionFixedCharge: number;
    /**
     * The lock in period. Use 0 if you do not want to enforce a lock in period.
     */
    lockInPeriod: number;
    /**
     * The minimum nuber of units that can be subscribed for.
     */
    minSubUnits: number;
    /**
     * The maximum nuber of units that can be subscribed for.
     */
    maxSubUnits: number;
    /**
     * The order size multiple.
     */
    orderSizeStep: number;
    /**
     * The par value of each fund unit. This is typically the IPO or latest settlement price. When the valuation of the fund is completed this value will be updated except the fund is a money market fund.
     */
    parValue: number;
    /**
     * The current bid price from the latest valuation report.
     */
    bidPrice: number;
    /**
     * The current offer price from the latest valuation report.
     */
    offerPrice: number;
    /**
     * The number of units issued during the IPO
     */
    issuedQty: number;
    /**
     * Indicates if redemptions will be allowed within the lock in period
     */
    allowEarlyRedemption: boolean;
    /**
     * Fees attached to the fund
     */
    fees: Array<string>;
    /**
     * The subscription start date. This is the date from which the fund can be subscribed for.
     */
    subStartDate: LocalDate;
    /**
     * The GL account ID used to manage the cash liability of the fund
     */
    cashLiabilityGlAccountId: UUID;
    /**
     * The GL account ID used to manage interest expense for the fund
     */
    interestExpenseGlAccountId: UUID;
    /**
     * The GL account ID used to manage interest liability for money market funds
     */
    interestLiabilityGlAccountId?: UUID | null;
    /**
     *
     * Indicates if this fund will distribute dividends.
     * If this is set to true, the fund will be treated as a dividend fund and will be subject to dividend processing rules.
     * The bid and offer prices will be constant and the yield will be updated after every valuation.
     * The yield will be used to calculate the dividend rate, and typically the dividend will be distributed at the end of every quarter.
     * If this is set to false, the fund will be treated as a regular fund and the bid and offer prices will be
     * calculated based on the GAV and NAV after every valuation.
     *
     */
    distributeDividends: boolean;
    /**
     * The company ID that all the GL accounts used by the fund is associated with
     */
    companyId: UUID;
    /**
     *
     * Indicates if this fund will distribute dividends using a static yield.
     * If this is set to true, then a static yield will be used to calculate the dividend rate.
     * The static yield value must be provided when this flag is set to true.
     * This flag should not be modified if dividend has been distributed using the static yield.
     *
     */
    useStaticYield: boolean;
    /**
     *
     * The static yield rate is the rate used to calculate
     * the dividend rate if the fund is set to distribute dividends using a static yield.
     *
     */
    staticYield: number;
    /**
     * The GL account ID used to process miscellaneous income for the fund
     */
    miscIncomeGlAccountId?: UUID | null;
    /**
     * The GL account ID used to process miscellaneous expenses for the fund
     */
    miscExpenseGlAccountId?: UUID | null;
    /**
     * The GL account ID used to process miscellaneous asset balances for the fund
     */
    miscAssetGlAccountId?: UUID | null;
    /**
     * The GL account ID used to process miscellaneous liability balances for the fund
     */
    miscLiabilityGlAccountId?: UUID | null;
};

