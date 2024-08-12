/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DynamicAssetValueGlAccount } from './DynamicAssetValueGlAccount';
import type { FeeDayCount } from './FeeDayCount';
import type { FixedIncomeGlAccount } from './FixedIncomeGlAccount';
import type { FundStatus } from './FundStatus';
import type { FundType } from './FundType';
import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { MoneyMarketGlAccount } from './MoneyMarketGlAccount';
import type { PlacementGlAccount } from './PlacementGlAccount';
import type { UUID } from './UUID';

export type Fund = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * A currency in which the fund is valued and traded
     */
    currency: string;
    /**
     * The par value of each fund unit.
     */
    parValue: number;
    /**
     * The current yield for money market funds. This is updated after fund valuation.
     */
    yield: number;
    /**
     * The current bid price. This is updated after fund valuation.
     */
    bidPrice: number;
    /**
     * The current offer price. This is updated after fund valuation.
     */
    offerPrice: number;
    /**
     * The minimum nuber of units that can be subscribed for.
     */
    minSubUnits: number;
    /**
     * The current number of issued units
     */
    issuedQty: number;
    /**
     * Indicates if redemption within the lock in period will be allowed
     */
    allowEarlyRedemption: boolean;
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
     * The maximum nuber of units that can be subscribed for.
     */
    maxSubUnits: number;
    /**
     * The subscription start date. This is the date from which the fund can be subscribed for.
     */
    subStartDate: LocalDate;
    /**
     * The order size multiple.
     */
    orderSizeStep: number;
    /**
     * The lock in period. Use 0 if you do not want to enforce a lock in period.
     */
    lockInPeriod: number;
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
     * The client ID from the CRM system
     */
    clientId: UUID;
    /**
     * The client number from the CRM system
     */
    clientCode: string;
    /**
     * The client label from the CRM system
     */
    clientLabel: string;
    /**
     * A unique fund code
     */
    code: string;
    /**
     * A market code from the position service
     */
    marketCode: string;
    /**
     * A market ID from the position service. This is generated after the fund is created and cannot be changed
     */
    marketId: UUID;
    /**
     * A instrument ID from the position service that maps to this fund. This is generated after the fund is created and cannot be changed
     */
    instrumentId: UUID;
    /**
     * The international security identification number for the instrument.
     */
    isin?: string | null;
    /**
     * The fund description
     */
    label: string;
    /**
     * The status of the fund
     */
    status: FundStatus;
    /**
     * The day count convention used for accruing the fund fees and calculating the yield.
     */
    feeDayCount: FeeDayCount;
    /**
     * Notes related to the fund
     */
    notes?: string | null;
    /**
     * The type of fund
     */
    type: FundType;
    /**
     * GL accounts for processing dynamic asset value positions
     */
    dynAssetValueAccounts: Array<DynamicAssetValueGlAccount>;
    /**
     * GL accounts for processing fixed income positions
     */
    fixedIncomeAccounts: Array<FixedIncomeGlAccount>;
    /**
     * GL accounts for processing money market positions
     */
    moneyMarketAccounts: Array<MoneyMarketGlAccount>;
    /**
     * GL accounts for processing placement positions
     */
    placementAccounts: Array<PlacementGlAccount>;
    /**
     * The company ID that all the GL accounts used by the fund is associated with
     */
    companyId: UUID;
    /**
     * The GL account ID used to manage the cash liability of the fund
     */
    cashLiabilityGlAccountId: UUID;
    /**
     * The GL account label used to manage the cash liability of the fund
     */
    cashLiabilityGlAccountLabel: string;
    /**
     * The GL account code used to manage the cash liability of the fund
     */
    cashLiabilityGlAccountCode: string;
    /**
     * The GL account ID used to manage the interest liability for money market funds
     */
    interestLiabilityGlAccountId?: UUID | null;
    /**
     * The GL account label used to manage the interest liability for money market funds
     */
    interestLiabilityGlAccountLabel?: string | null;
    /**
     * The GL account code used to manage the interest liability for money market funds
     */
    interestLiabilityGlAccountCode?: string | null;
    /**
     * The GL account ID used to process interest expense for the fund
     */
    interestExpenseGlAccountId: UUID;
    /**
     * The GL account code used to process interest expense for the fund
     */
    interestExpenseGlAccountCode: string;
    /**
     * The GL account label used to process interest expense for the fund
     */
    interestExpenseGlAccountLabel: string;
    /**
     * The GL account ID used to process miscellaneous income for the fund
     */
    miscIncomeGlAccountId?: UUID | null;
    /**
     * The GL account label used to process miscellaneous income for the fund
     */
    miscIncomeGlAccountLabel?: string | null;
    /**
     *
     * The GL account code used to process miscellaneous income for the fund.
     * Note that all the sub accounts that make up this balance must match the sub account prefix length configured in this account.
     * For example if the account is configured with code 380000000 and a sub prefix length of 3,
     * then posting accounts like 380000001, 380000002, 380300000, 380500000 will be included.
     *
     */
    miscIncomeGlAccountCode?: string | null;
    /**
     * The GL account ID used to process miscellaneous expenses for the fund
     */
    miscExpenseGlAccountId?: UUID | null;
    /**
     * The GL account label used to process miscellaneous expenses for the fund
     */
    miscExpenseGlAccountLabel?: string | null;
    /**
     *
     * The GL account code used to process miscellaneous expenses for the fund.
     * Note that all the sub accounts that make up this balance must match the sub account prefix length configured in this account.
     * For example if the account is configured with code 480000000 and a sub prefix length of 3,
     * then posting accounts like 480000001, 480000002, 480100000, 480200000 will be included.
     *
     */
    miscExpenseGlAccountCode?: string | null;
    /**
     * The GL account ID used to process miscellaneous asset balances for the fund
     */
    miscAssetGlAccountId?: UUID | null;
    /**
     * The GL account label used to process miscellaneous asset balances for the fund
     */
    miscAssetGlAccountLabel?: string | null;
    /**
     *
     * The GL account code used to process miscellaneous asset balances for the fund.
     * Note that all the sub accounts that make up this balance must match the sub account prefix length configured in this account.
     * For example if the account is configured with code 180000000 and a sub prefix length of 3,
     * then posting accounts like 180000001, 180000002, 180100000, 180200000 will be included.
     *
     */
    miscAssetGlAccountCode?: string | null;
    /**
     * The GL account ID used to process miscellaneous liability balances for the fund
     */
    miscLiabilityGlAccountId?: UUID | null;
    /**
     * The GL account label used to process miscellaneous asset liability for the fund
     */
    miscLiabilityGlAccountLabel?: string | null;
    /**
     *
     * The GL account code used to process miscellaneous liability balances for the fund.
     * Note that all the sub accounts that make up this balance must match the sub account prefix length configured in this account.
     * For example if the account is configured with code 180000000 and a sub prefix length of 3,
     * then posting accounts like 280000001, 280000002, 280100000, 280200000 will be included.
     *
     */
    miscLiabilityGlAccountCode?: string | null;
    /**
     * The address that appears on statements
     */
    stmtAddress?: string | null;
    /**
     * The city that appears on statements
     */
    stmtCity?: string | null;
    /**
     * The state that appears on statements
     */
    stmtState?: string | null;
    /**
     * The post code that appears on statements
     */
    stmtPostCode?: string | null;
    /**
     * The country that appears on statements
     */
    stmtCountry?: string | null;
    /**
     * The contact email that appears on statements
     */
    stmtEmail?: string | null;
    /**
     * The phone number that appears on statements
     */
    stmtPhone?: string | null;
    /**
     * The footer that appears on statements
     */
    stmtFooter?: string | null;
    fundFees: Array<string>;
};

