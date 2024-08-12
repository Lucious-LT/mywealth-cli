/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecordFilterRequestStringInvestmentAccountListSort = {
    /**
     * The records returned
     */
    filters: Record<string, string>;
    /**
     * The field used to sort the response
     */
    sort: RecordFilterRequestStringInvestmentAccountListSort.sort;
    /**
     * The sort direction
     */
    order: RecordFilterRequestStringInvestmentAccountListSort.order;
};

export namespace RecordFilterRequestStringInvestmentAccountListSort {

    /**
     * The field used to sort the response
     */
    export enum sort {
        ID = 'id',
        UPDATED_AT = 'updatedAt',
        CLIENT_ID = 'clientId',
        COMMISSION_ID = 'commissionId',
        FEE_ID = 'feeId',
        TRADING_ACCOUNT_NO = 'tradingAccountNo',
        TRADING_SUB_ACCOUNT_NO = 'tradingSubAccountNo',
        ACCOUNT_LABEL = 'accountLabel',
        ACCOUNT_NO = 'accountNo',
        CLIENT_CODE = 'clientCode',
        CLIENT_LABEL = 'clientLabel',
        STATUS = 'status',
    }

    /**
     * The sort direction
     */
    export enum order {
        ASC = 'asc',
        DESC = 'desc',
    }


}

