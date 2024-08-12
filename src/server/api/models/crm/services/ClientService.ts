/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Client } from '../models/Client';
import type { ClientRequest } from '../models/ClientRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { PageTemplateClient } from '../models/PageTemplateClient';
import type { PasswordChangeAdminRequest } from '../models/PasswordChangeAdminRequest';
import type { PasswordChangeTokenRequest } from '../models/PasswordChangeTokenRequest';
import type { PasswordTokenRequest } from '../models/PasswordTokenRequest';
import type { RecordFilterRequestStringClientListSort } from '../models/RecordFilterRequestStringClientListSort';
import type { RecordFilterRequestStringContactListSort } from '../models/RecordFilterRequestStringContactListSort';
import type { RecordTemplateClientRecordDTO } from '../models/RecordTemplateClientRecordDTO';
import type { RecordTemplateContactRecordDTO } from '../models/RecordTemplateContactRecordDTO';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClientService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new client
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Client Success
     * @throws ApiError
     */
    public addClient(
        xTenantId: string,
        requestBody: ClientRequest,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/clients',
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
     * Validate a contact's credentials
     * Validate a contact's credentials and return the client record if valid.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Client Success
     * @throws ApiError
     */
    public validateContactCredentials(
        xTenantId: string,
        requestBody: LoginRequest,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/clients/contact/login',
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
     * Generate a token for a contact's password reset
     * Validate the contact's username and generate a token for password reset.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public generateContactPasswordResetToken(
        xTenantId: string,
        requestBody: PasswordTokenRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/clients/contact/generate-password-token',
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
     * Validate a contact's credentials and change the password
     * Validate a contact's credentials and change the password.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public changeContactPassword(
        xTenantId: string,
        requestBody: PasswordChangeAdminRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/clients/contact/change-password',
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
     * Validate a contact's password reset token and change the password
     * Validate a contact's password reset token and change the password.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public resetContactPasswordWithToken(
        xTenantId: string,
        requestBody: PasswordChangeTokenRequest,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/clients/contact/change-password/token',
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
     * Retrieve a client
     * Retrieve a client using the client ID.
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns Client Success
     * @throws ApiError
     */
    public findByClientId(
        clientId: string,
        xTenantId: string,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/clients/{clientId}',
            path: {
                'clientId': clientId,
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
     * Delete a client
     * Delete a client record in the system
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteClient(
        clientId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/clients/{clientId}',
            path: {
                'clientId': clientId,
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
     * Update a client
     * Update a client record in the system
     * @param clientId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Client Success
     * @throws ApiError
     */
    public updateClient(
        clientId: string,
        xTenantId: string,
        requestBody: ClientRequest,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/clients/{clientId}',
            path: {
                'clientId': clientId,
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
     * Suspend a client
     * Suspend a client using the client ID. This will prevent any further transactions.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Client OK
     * @throws ApiError
     */
    public suspendClientById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/clients/suspend/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Reactivate a client
     * Reactivate a client using the client ID. The client must be in a suspended or dormant state.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Client OK
     * @throws ApiError
     */
    public reactivateClientById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/clients/reactivate/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Close a clients account
     * Close a clients account using the client ID. All product accounts will be closed.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Client OK
     * @throws ApiError
     */
    public closeClientById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/clients/close/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Approve a client
     * Approve a client using the client ID. This will set the status to active.
     * @param recordId
     * @param xTenantId The tenant identifier
     * @returns Client OK
     * @throws ApiError
     */
    public approveClientById(
        recordId: string,
        xTenantId: string,
    ): CancelablePromise<Client> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/clients/approve/{recordId}',
            path: {
                'recordId': recordId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a client ID
     * Validate a client ID
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidClientId(
        clientId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/clients/validate/{clientId}',
            path: {
                'clientId': clientId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for clients
     * Search for clients in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateClient OK
     * @throws ApiError
     */
    public searchClient(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'code_sort' | 'referralCode_sort' | 'refCode_sort' | 'label_sort' = 'code_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateClient> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/clients/search',
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
     * List contacts using the provided filter values
     * A summarized list of contact records using the specified filter values.
     * All the filter values are combined using an 'AND' primitive.
     * The sort field is used to sort the response and the order field is used to specify the sort order.
     * The filters are used to filter the response and should be in the format of key value pairs where the key is the field to filter and the value is the value to filter by.
     *
     * The supported filter fields are:
     *
     * - role: The role of the contact. Acceptable values are CORP_DIRECTOR, INDV_OWNER, BENEFICIAL_OWNER, JOINT_PRIMARY, JOINT_SECONDARY, TRUST_ADMINISTRATOR, OTHER, NEXT_OF_KIN
     * - gender: The gender of the contact. Acceptable values are MALE, FEMALE
     * - maritalStatus: The marital status of the contact. Acceptable values are SINGLE, MARRIED
     * - title: The title of the contact. See the enumeration for acceptable values.
     * - idType: The type of ID used by the contact. See the enumeration for acceptable values.
     * - idExpirationDays: The number of days before the ID expires.
     * - birthMonth: The month of birth of the contact. This has to be a number between 1 and 12.
     * - birthDay: The day of birth of the contact. This has to be a number between 1 and 31.
     *
     * The sort fields are:
     * - id: The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     * - updatedAt: Indicates when the record was last modified.
     * - mobileNo: The mobile number of the contact.
     * - email: The email address of the contact.
     * - label: A label for the contact record.
     * - role: The role of the contact.
     *
     * The order fields are:
     * - asc: Ascending order
     * - desc: Descending order
     *
     * A sample request with the following filters and sort values is shown below and the response is a list of contact records. Remember to url encode the request.
     *
     * {
         * "filters": {
             * "role": "CORP_DIRECTOR",
             * "gender": "MALE"
             * },
             * "sort": "id",
             * "order": "asc"
             * }
             *
             * curl -X GET  -H 'accept: application/json' -H 'x-tenant-id: mywealth' -H 'Authorization: Bearer _your_jwt_token_' https://api.dev.mywealthcare.io/crm/api/v1/clients/report/contact?filters[role]=CORP_DIRECTOR&filters[gender]=MALE&sort=id&order=asc
             *
             * @param request
             * @param xTenantId The tenant identifier
             * @returns RecordTemplateContactRecordDTO OK
             * @throws ApiError
             */
            public contactReport(
                request: RecordFilterRequestStringContactListSort,
                xTenantId: string,
            ): CancelablePromise<RecordTemplateContactRecordDTO> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/clients/report/contact',
                    headers: {
                        'x-tenant-id': xTenantId,
                    },
                    query: {
                        'request': request,
                    },
                });
            }

            /**
             * List clients using the provided filter values
             * A summarized list of client records using the specified filter values.
             * All the filter values are combined using an 'AND' primitive.
             * The sort field is used to sort the response and the order field is used to specify the sort order.
             * The filters are used to filter the response and should be in the format of key value pairs where the key is the field to filter and the value is the value to filter by.
             *
             * The supported filter fields are:
             *
             * - status: The status of the client. Acceptable values are PENDING, ACTIVE, SUSPENDED, DORMANT, CLOSED
             * - clientType: The type of client. Acceptable values are CORPORATE, JOINT, TRUST, INDIVIDUAL
             * - relationshipStartDate: The date the relationship with the client started. The format is yyyy-MM-dd
             * - advisorCode: The code of the advisor assigned to the client.
             * - advisorGroupCode: The code of the advisor group assigned to the client.
             * - kycTierCode: The code of the KYC tier assigned to the client.
             * - groupCode: The code of the group the client belongs to.
             * - businessStructure: The business structure of the client. Acceptable values are MULTI_MEMBER_LLC, SINGLE_MEMBER_LLC, NON_PROFIT, GOVERNMENT_AGENCY, PRIVATE_CORPORATION, PUBLIC_CORPORATION, PARTNERSHIP, SOLE_PROPRIETORSHIP, TRUST, OTHER
             * - valuationCurrency: The currency used for valuation of the client's assets and the values have to be in ISO 4217 format eg USD, EUR, GBP
             *
             * The sort fields are:
             * - id: The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
             * - updatedAt: Indicates when the record was last modified.
             * - code: The unique client code that is generated by the crm service and is populated by the investing service.
             * - refCode: A reference code for the client record in an upstream system.
             * - label: A label for the client record.
             * - email: The email address of the client.
             * - mobileNo: The mobile number of the client.
             * - status: The status of the client.
             * - clientType: The type of client.
             *
             * The order fields are:
             * - asc: Ascending order
             * - desc: Descending order
             *
             * A sample request with the following filters and sort values is shown below and the response is a list of client records. Remember to url encode the request.
             *
             * {
                 * "filters": {
                     * "status": "ACTIVE",
                     * "clientType": "INDIVIDUAL"
                     * },
                     * "sort": "id",
                     * "order": "asc"
                     * }
                     *
                     * curl -X GET  -H 'accept: application/json' -H 'x-tenant-id: mywealth' -H 'Authorization: Bearer _your_jwt_token_' https://api.dev.mywealthcare.io/crm/api/v1/clients/report/client?filters[status]=ACTIVE&filters[clientType]=INDIVIDUAL&sort=id&order=asc'
                     *
                     * @param request
                     * @param xTenantId The tenant identifier
                     * @returns RecordTemplateClientRecordDTO OK
                     * @throws ApiError
                     */
                    public clientReport(
                        request: RecordFilterRequestStringClientListSort,
                        xTenantId: string,
                    ): CancelablePromise<RecordTemplateClientRecordDTO> {
                        return this.httpRequest.request({
                            method: 'GET',
                            url: '/api/v1/clients/report/client',
                            headers: {
                                'x-tenant-id': xTenantId,
                            },
                            query: {
                                'request': request,
                            },
                        });
                    }

                    /**
                     * List clients
                     * List clients in the system using the supported query parameters.
                     * @param xTenantId The tenant identifier
                     * @param page
                     * @param size
                     * @param sort
                     * @param order
                     * @returns PageTemplateClient OK
                     * @throws ApiError
                     */
                    public listClient(
                        xTenantId: string,
                        page: number,
                        size: number = 20,
                        sort: 'id' | 'updatedAt' | 'code' | 'refCode' | 'label' | 'email' | 'mobileNo' | 'status' | 'clientType' = 'code',
                        order: 'asc' | 'desc' = 'asc',
                    ): CancelablePromise<PageTemplateClient> {
                        return this.httpRequest.request({
                            method: 'GET',
                            url: '/api/v1/clients/list',
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
                     * Retrieve a client using the code
                     * Retrieve a client record using the code.
                     * @param clientCode
                     * @param xTenantId The tenant identifier
                     * @returns Client OK
                     * @throws ApiError
                     */
                    public findByClientCode(
                        clientCode: string,
                        xTenantId: string,
                    ): CancelablePromise<Client> {
                        return this.httpRequest.request({
                            method: 'GET',
                            url: '/api/v1/clients/code/{clientCode}',
                            path: {
                                'clientCode': clientCode,
                            },
                            headers: {
                                'x-tenant-id': xTenantId,
                            },
                        });
                    }

                }
