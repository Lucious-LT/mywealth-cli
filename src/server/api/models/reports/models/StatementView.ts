/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlAccountType } from './GlAccountType';
import type { LocalDate } from './LocalDate';
import type { StatementLineView } from './StatementLineView';
import type { UUID } from './UUID';

/**
 * A JSON blob representing an account statement record.
 */
export type StatementView = {
    /**
     * The total # of pages contained in the statement
     */
    pageCount?: number;
    /**
     * The page size for the statement run
     */
    pageSize?: number;
    /**
     * The current page
     */
    pageNumber?: number;
    /**
     * The client ID
     */
    clientId?: UUID | null;
    /**
     * The client label
     */
    clientLabel?: string | null;
    /**
     * The client code
     */
    clientCode?: string | null;
    /**
     * The account ID
     */
    accountId: UUID;
    /**
     * A unique account #
     */
    accountNo: string;
    /**
     * A text value that describes the account
     */
    accountLabel: string;
    /**
     * The statement currency
     */
    currency: string;
    /**
     * Notes on the account
     */
    notes?: string | null;
    /**
     * The opening balance
     */
    openingBalance: number;
    /**
     * The closing balance
     */
    closingBalance: number;
    /**
     * The type of sub account
     */
    subAccountType?: string | null;
    /**
     * The GL Account type
     */
    glAccountType: GlAccountType | null;
    /**
     * The start date of the report
     */
    startDate: LocalDate;
    /**
     * The end date of the report
     */
    endDate: LocalDate;
    /**
     * The statement lines
     */
    statementLines: Array<StatementLineView>;
};

