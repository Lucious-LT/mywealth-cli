/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetAllocationByCategory } from './AssetAllocationByCategory';
import type { AssetAllocationHistory } from './AssetAllocationHistory';
import type { LocalDate } from './LocalDate';
import type { ProductTypeBalance } from './ProductTypeBalance';
import type { RecentTransaction } from './RecentTransaction';
import type { TransactionCount } from './TransactionCount';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a fund report.
 */
export type FundReport = {
    accountId: UUID;
    accountLabel: string;
    accountCode: string;
    reportCurrency: string;
    positionDate: LocalDate;
    dayLabels: Array<string>;
    balanceByProductType: Array<ProductTypeBalance>;
    transactionCount: Record<string, TransactionCount>;
    allocationHistory: Record<string, Array<AssetAllocationHistory>>;
    recentTransactions: Record<string, Array<RecentTransaction>>;
    assetAllocationByCategory: Record<string, AssetAllocationByCategory>;
};

