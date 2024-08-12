/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountBalance } from '../models/AccountBalance';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { InvestmentAccount } from '../models/InvestmentAccount';
import type { InvestmentAccountRequest } from '../models/InvestmentAccountRequest';
import type { InvestmentProduct } from '../models/InvestmentProduct';
import type { MarginCall } from '../models/MarginCall';
import type { PageTemplateInvestmentAccount } from '../models/PageTemplateInvestmentAccount';
import type { PageTemplateMarginCall } from '../models/PageTemplateMarginCall';
import type { RecordFilterRequestStringInvestmentAccountListSort } from '../models/RecordFilterRequestStringInvestmentAccountListSort';
import type { RecordTemplateInvestmentAccountRecordDTO } from '../models/RecordTemplateInvestmentAccountRecordDTO';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InvestmentAccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new account
     * Creates a new record in the system. See the schema of the object for more information. **Requires a valid token**. Roles Allowed: {investment_account_create, sysadmin}
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAccount Success
     * @throws ApiError
     */
    public addInvestmentAccount(
        xTenantId: string,
        requestBody: InvestmentAccountRequest,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/accounts',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update the cash balance after a transaction
     * Updates the cash balance after a transaction **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public updateCashBalance(
        recordId: string,
        xTenantId: string,
        requestBody: AccountBalance,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investment/accounts/balance/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieve an investment account
     * Retrieve an investment using the account ID. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public findInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/accounts/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a account
     * Delete a account using the account ID. **Requires a valid token**. Roles Allowed: {investment_account_delete, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteInvestmentAccount(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/investment/accounts/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update a account
     * Update a account in the system. **Requires a valid token**. Roles Allowed: {investment_account_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns InvestmentAccount Success
     * @throws ApiError
     */
    public updateInvestmentAccount(
        recordId: string,
        xTenantId: string,
        requestBody: InvestmentAccountRequest,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Remove suspension or pnd on account
     * Remove suspension or pnd on account using the account ID. The account must be in a suspended state. **Requires a valid token**. Roles Allowed: {investment_account_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public unblockInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/unblock/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Block cash debit transactions
     * Block cash debit on an account using the account ID. This will prevent any withdrawal transactions. **Requires a valid token**. Roles Allowed: {investment_account_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public pndInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/pnd/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Cancel a margin call
     * Cancel a margin call using the record ID. This will cancel the call but if the cash or securities is not deposited, the system will regenerate it after 15 mins. **Requires a valid token**. Roles Allowed: {investment_account_update, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns MarginCall OK
     * @throws ApiError
     */
    public cancelMarginCallById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<MarginCall> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/margin_call/cancel/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Liquidate an account
     * Liquidate an account using the account ID. This will prevent any further buy transactions on the account. **Requires a valid token**. Roles Allowed: {investment_account_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public liquidateInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/liquidate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Close an account
     * Close an account using the account ID. **Requires a valid token**. Roles Allowed: {investment_account_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public closeInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/close/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Suspend an account
     * Suspend an account using the account ID. This will prevent any further transactions. **Requires a valid token**. Roles Allowed: {investment_account_post, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public blockInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/block/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve an account
     * Approve an account using the account ID. This will set the status to active. **Requires a valid token**. Roles Allowed: {investment_account_approve, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns InvestmentAccount OK
     * @throws ApiError
     */
    public approveInvestmentAccountById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<InvestmentAccount> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/investment/accounts/approve/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate an account ID
     * Validate that an account ID exists and is active. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public validateInvestmentAccountId(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/accounts/validate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for accounts
     * Search for accounts in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_list, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateInvestmentAccount OK
     * @throws ApiError
     */
    public searchInvestmentAccount(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'tradingAccountNo_sort' | 'tradingSubAccountNo_sort' | 'accountLabel_sort' | 'accountNo_sort' | 'clientCode_sort' | 'clientLabel_sort' = 'accountNo_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateInvestmentAccount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/accounts/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'pattern': pattern,
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * Search for margin calls
     * Search for margin calls in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateMarginCall OK
     * @throws ApiError
     */
    public searchInvestmentAccountMarginCalls(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'callNo_sort' | 'description_sort' = 'description_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateMarginCall> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/investment/accounts/search/margin_call',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'pattern': pattern,
                'page': page,
                'size': size,
                'sort': sort,
                'order': order,
            },
        });
    }

    /**
     * List accounts using the provided filter values
     * A summarized list of investment account records using the specified filter values.
     * All the filter values are combined using an 'AND' primitive.
     * The sort field is used to sort the response and the order field is used to specify the sort order.
     * The filters are used to filter the response and should be in the format of key value pairs where the key is the field to filter and the value is the value to filter by.
     *
     * The supported filter fields are:
     *
     * - status: The status of the account and the values have to be one of the following: PENDING, ACTIVE, OPEN_CLOSING_ONLY, SUSPENDED, CLOSED, NO_DEBITS
     * - accountUsage: The usage of the account and the values have to be one of the following: LIVE, PRACTICE
     * - accountOpenDate: The date the account was opened and the values have to be in the format of yyyy-MM-dd
     * - mgmtType: The management type of the account and the values have to be one of the following: SELF, ADVISORY, MANAGED, CUSTODIAN, RESERVED, PROP
     * - branchCode: The branch code of the account
     * - productCode: The product code of the account
     * - currency: The currency of the account and the values have to be in ISO 4217 format eg USD, EUR, GBP
     *
     * The sort fields are:
     * - id: The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     * - updatedAt: Indicates when the record was last modified.
     * - clientId: A unique identifier for the client that is generated by the crm service and is required when creating a new account.
     * - commissionId: The ID of the commission structure that is used for the account.
     * - feeId: The ID of the fee structure that is used for the account.
     * - tradingAccountNo: Specify a investing account code if applicable and where it has already been setup at the registry.
     * - tradingSubAccountNo: Specify a investing sub account code if applicable and the main investing account code has already been setup at the registry.
     * - accountLabel: A label for the account record
     * - accountNo: The unique system generated account code
     * - clientCode: A unique client code that is generated by the crm service and is populated by the investing service.
     * - clientLabel: A label that describes the client and is populated by the investing service.
     * - status: The account type. See the enumeration for acceptable values.
     *
     * The order fields are:
     * - asc: Ascending order
     * - desc: Descending order
     *
     * A sample request with the following filters and sort values is shown below and the response is a list of investment account records. Remember to url encode the request.
     *
     * {
         * "filters": {
             * "status": "ACTIVE",
             * "accountUsage": "LIVE",
             * "accountOpenDate": "2022-08-10",
             * "mgmtType": "SELF",
             * "branchCode": "0001",
             * "productCode": "0001",
             * "currency": "USD"
             * },
             * "sort": "id",
             * "order": "asc"
             * }
             *
             * curl -X GET  -H 'accept: application/json' -H 'x-tenant-id: mywealth' -H 'Authorization: Bearer _your_jwt_token_' https://api.dev.mywealthcare.io/investing/api/v1/investment/accounts/report?filters[status]=ACTIVE&filters[accountUsage]=LIVE&filters[accountOpenDate]=2022-08-10&filters[mgmtType]=SELF&filters[branchCode]=0001&filters[productCode]=0001&filters[currency]=USD&sort=id&order=asc
             * **Requires a valid token**. Roles Allowed: {investment_account_list, sysadmin}
             * @param request
             * @param xTenantId The tenant identifier
             * @returns RecordTemplateInvestmentAccountRecordDTO OK
             * @throws ApiError
             */
            public investmentAccountReport(
                request: RecordFilterRequestStringInvestmentAccountListSort,
                xTenantId: string,
            ): CancelablePromise<RecordTemplateInvestmentAccountRecordDTO> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/report',
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                    query: {
                        'request': request,
                    },
                });
            }

            /**
             * Retrieve an investment product using the account ID
             * Retrieve an investment product using the account ID **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
             * @param recordId
             * @param xTenantId The tenant identifier
             * @returns InvestmentProduct OK
             * @throws ApiError
             */
            public findInvestmentAccountProductById(
                recordId: string,
                xTenantId: string,
            ): CancelablePromise<InvestmentProduct> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/product/{recordId}',
                    path: {
                        'recordId': recordId,
                    },
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                });
            }

            /**
             * Retrieve a margin call record
             * Retrieve a margin call using the record ID. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
             * @param recordId
             * @param xTenantId The tenant identifier
             * @returns MarginCall OK
             * @throws ApiError
             */
            public findMarginCallById(
                recordId: string,
                xTenantId: string,
            ): CancelablePromise<MarginCall> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/margin_call/{recordId}',
                    path: {
                        'recordId': recordId,
                    },
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                });
            }

            /**
             * List accounts
             * List accounts in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_list, sysadmin}
             * @param xTenantId The tenant identifier
             * @param page
             * @param size
             * @param sort
             * @param order
             * @returns PageTemplateInvestmentAccount OK
             * @throws ApiError
             */
            public listInvestmentAccount(
                xTenantId: string,
                page: number,
                size: number = 20,
                sort: 'id' | 'updatedAt' | 'clientId' | 'commissionId' | 'feeId' | 'tradingAccountNo' | 'tradingSubAccountNo' | 'accountLabel' | 'accountNo' | 'clientCode' | 'clientLabel' | 'status' = 'accountNo',
                order: 'asc' | 'desc' = 'asc',
            ): CancelablePromise<PageTemplateInvestmentAccount> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/list',
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                    query: {
                        'page': page,
                        'size': size,
                        'sort': sort,
                        'order': order,
                    },
                });
            }

            /**
             * List accounts for a client
             * List accounts in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_list, sysadmin}
             * @param clientId
             * @param xTenantId The tenant identifier
             * @returns InvestmentAccount OK
             * @throws ApiError
             */
            public listInvestmentAccountsForClient(
                clientId: string,
                xTenantId: string,
            ): CancelablePromise<Array<InvestmentAccount>> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/list/{clientId}',
                    path: {
                        'clientId': clientId,
                    },
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                });
            }

            /**
             * List margin calls
             * List margin calls in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
             * @param xTenantId The tenant identifier
             * @param page
             * @param size
             * @param sort
             * @param order
             * @returns PageTemplateMarginCall OK
             * @throws ApiError
             */
            public listMarginCalls(
                xTenantId: string,
                page: number,
                size: number = 20,
                sort: 'id' | 'updatedAt' | 'accountId' | 'callDate' | 'callValue' | 'callNo' | 'status' = 'callDate',
                order: 'asc' | 'desc' = 'desc',
            ): CancelablePromise<PageTemplateMarginCall> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/list/margin_call',
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                    query: {
                        'page': page,
                        'size': size,
                        'sort': sort,
                        'order': order,
                    },
                });
            }

            /**
             * List margin calls
             * List margin calls in the system using the supported query parameters. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
             * @param accountId
             * @param xTenantId The tenant identifier
             * @param page
             * @param size
             * @param sort
             * @param order
             * @returns PageTemplateMarginCall OK
             * @throws ApiError
             */
            public listInvestmentAccountMarginCalls(
                accountId: string,
                xTenantId: string,
                page: number,
                size: number = 20,
                sort: 'id' | 'updatedAt' | 'accountId' | 'callDate' | 'callValue' | 'callNo' | 'status' = 'callDate',
                order: 'asc' | 'desc' = 'desc',
            ): CancelablePromise<PageTemplateMarginCall> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/list/margin_call/account/{accountId}',
                    path: {
                        'accountId': accountId,
                    },
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                    query: {
                        'page': page,
                        'size': size,
                        'sort': sort,
                        'order': order,
                    },
                });
            }

            /**
             * Retrieve an investment account using the code
             * Retrieve an investment account using the code. **Requires a valid token**. Roles Allowed: {investment_account_view, sysadmin}
             * @param accountCode
             * @param xTenantId The tenant identifier
             * @returns InvestmentAccount OK
             * @throws ApiError
             */
            public findByInvestmentAccountByCode(
                accountCode: string,
                xTenantId: string,
            ): CancelablePromise<InvestmentAccount> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/investment/accounts/code/{accountCode}',
                    path: {
                        'accountCode': accountCode,
                    },
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                });
            }

        }
