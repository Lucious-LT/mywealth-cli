/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Company } from '../models/Company';
import type { CompanyListSort } from '../models/CompanyListSort';
import type { CompanyRequest } from '../models/CompanyRequest';
import type { CompanySearchSort } from '../models/CompanySearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateCompany } from '../models/PageTemplateCompany';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CompanyService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new company
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Company Indicates that the request was successful.
     * @throws ApiError
     */
    public addCompany(
        xTenantId: string,
        requestBody: CompanyRequest,
    ): CancelablePromise<Company> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/accounting/api/v1/companies',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a company
     * Retrieve a company using the company code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Company Indicates that the request was successful.
     * @throws ApiError
     */
    public findCompanyByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Company> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/companies/code/{code}',
            path: {
                'code': code,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Validate a company code
     * Validate a company using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param companyId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isCompanyCodeAvailable(
        code: string,
        xTenantId: string,
        companyId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/companies/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'companyId': companyId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List companies
     * Retrieve companies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateCompany OK
     * @throws ApiError
     */
    public listCompany(
        order: Direction,
        sort: CompanyListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateCompany> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/companies/list',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Search for companies using a full text search engine
     * Search for companies in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateCompany OK
     * @throws ApiError
     */
    public searchCompany(
        order: Direction,
        sort: CompanySearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateCompany> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/companies/search',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'order': order,
                'page': page,
                'pattern': pattern,
                'size': size,
                'sort': sort,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a company
     * Retrieve a company using the company ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Company Indicates that the request was successful.
     * @throws ApiError
     */
    public findCompanyById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Company> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/accounting/api/v1/companies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Update a company record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Company Indicates that the request was successful.
     * @throws ApiError
     */
    public updateCompany(
        id: UUID,
        xTenantId: string,
        requestBody: CompanyRequest,
    ): CancelablePromise<Company> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/accounting/api/v1/companies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Delete a company
     * Delete a company using the company ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteCompany(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/accounting/api/v1/companies/{id}',
            path: {
                'id': id,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

}
