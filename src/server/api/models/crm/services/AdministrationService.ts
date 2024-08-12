/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdministrationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Snapshot a record type
     * This is a maintenance transaction that will snapshot the requested record type, emitting the records to the data-message kafka topic.
     * @param recordType
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse OK
     * @throws ApiError
     */
    public snapshotRecords(
        recordType: 'COMPANY' | 'GL_ACCOUNT' | 'JOURNAL' | 'CLASSIFICATION' | 'MARKET' | 'EQUITY' | 'BOND' | 'POSITION_LEDGER' | 'TENANT' | 'USER' | 'GROUP' | 'CLIENT' | 'CONTACT' | 'CLIENT_GROUP' | 'ADVISOR' | 'LEAD' | 'ADVISOR_GROUP' | 'KYC_DOCUMENT' | 'TICKET' | 'KYC_TIER' | 'TEMPLATE' | 'COMMUNICATION' | 'BRANCH' | 'HOLIDAY' | 'ORDER' | 'FUND_TRANSACTION' | 'FIXED_DEPOSIT_TRANSACTION' | 'FIXED_DEPOSIT_ACCRUAL' | 'FIXED_DEPOSIT_PRODUCT' | 'MONEY_MARKET_PRODUCT' | 'MONEY_MARKET_TRANSACTION' | 'MONEY_MARKET_ACCRUAL' | 'CASH_TRANSACTION' | 'ORDER_CONTRACT_NOTE' | 'FUND_TRANSACTION_CONTRACT_NOTE' | 'INVESTMENT_ACCOUNT' | 'INVESTMENT_ACCOUNT_VALUATION' | 'INVESTMENT_ACCOUNT_MARGIN_CALL' | 'INVESTMENT_ACCOUNT_LIEN' | 'INVESTMENT_PRODUCT' | 'INVESTMENT_INTEREST' | 'INVESTMENT_FEE' | 'COMMISSION' | 'FEE' | 'INVESTMENT_AGENT' | 'INVESTMENT_CUSTODIAN' | 'INVESTMENT_BROKER' | 'INVESTMENT_REGISTRAR' | 'INVESTMENT_WITHHOLDING_TAX',
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/admin/snapshot/{recordType}',
            path: {
                'recordType': recordType,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Rebuild the search index for a record type
     * This is a maintenance transaction that should be used to update the search index for a given record type. This should only be used if the search index is out of sync with the database.
     * @param recordType
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse OK
     * @throws ApiError
     */
    public rebuildFullTextIndex(
        recordType: 'COMPANY' | 'GL_ACCOUNT' | 'JOURNAL' | 'CLASSIFICATION' | 'MARKET' | 'EQUITY' | 'BOND' | 'POSITION_LEDGER' | 'TENANT' | 'USER' | 'GROUP' | 'CLIENT' | 'CONTACT' | 'CLIENT_GROUP' | 'ADVISOR' | 'LEAD' | 'ADVISOR_GROUP' | 'KYC_DOCUMENT' | 'TICKET' | 'KYC_TIER' | 'TEMPLATE' | 'COMMUNICATION' | 'BRANCH' | 'HOLIDAY' | 'ORDER' | 'FUND_TRANSACTION' | 'FIXED_DEPOSIT_TRANSACTION' | 'FIXED_DEPOSIT_ACCRUAL' | 'FIXED_DEPOSIT_PRODUCT' | 'MONEY_MARKET_PRODUCT' | 'MONEY_MARKET_TRANSACTION' | 'MONEY_MARKET_ACCRUAL' | 'CASH_TRANSACTION' | 'ORDER_CONTRACT_NOTE' | 'FUND_TRANSACTION_CONTRACT_NOTE' | 'INVESTMENT_ACCOUNT' | 'INVESTMENT_ACCOUNT_VALUATION' | 'INVESTMENT_ACCOUNT_MARGIN_CALL' | 'INVESTMENT_ACCOUNT_LIEN' | 'INVESTMENT_PRODUCT' | 'INVESTMENT_INTEREST' | 'INVESTMENT_FEE' | 'COMMISSION' | 'FEE' | 'INVESTMENT_AGENT' | 'INVESTMENT_CUSTODIAN' | 'INVESTMENT_BROKER' | 'INVESTMENT_REGISTRAR' | 'INVESTMENT_WITHHOLDING_TAX',
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/admin/index/{recordType}',
            path: {
                'recordType': recordType,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
