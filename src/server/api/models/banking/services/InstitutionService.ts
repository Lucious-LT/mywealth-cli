/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { Institution } from '../models/Institution';
import type { InstitutionListSort } from '../models/InstitutionListSort';
import type { InstitutionRequest } from '../models/InstitutionRequest';
import type { InstitutionSearchSort } from '../models/InstitutionSearchSort';
import type { PageTemplateInstitution } from '../models/PageTemplateInstitution';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class InstitutionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new institution
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Institution Indicates that the request was successful.
     * @throws ApiError
     */
    public addInstitution(
        xTenantId: string,
        requestBody: InstitutionRequest,
    ): CancelablePromise<Institution> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/banking/api/v1/institutions',
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
     * Retrieve a institution
     * Retrieve an institution using the institution code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Institution Indicates that the request was successful.
     * @throws ApiError
     */
    public findInstitutionByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Institution> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/institutions/code/{code}',
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
     * Validate an institution code
     * Validate an institution using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param institutionId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isInstitutionCodeAvailable(
        code: string,
        xTenantId: string,
        institutionId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/institutions/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'institutionId': institutionId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List institutions
     * Retrieve institutions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateInstitution OK
     * @throws ApiError
     */
    public listInstitution(
        order: Direction,
        sort: InstitutionListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateInstitution> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/institutions/list',
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
     * Search for institutions using a full text search engine
     * Search for institutions in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateInstitution OK
     * @throws ApiError
     */
    public searchInstitution(
        order: Direction,
        sort: InstitutionSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateInstitution> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/institutions/search',
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
     * Retrieve an institution
     * Retrieve an institution using the institution ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Institution Indicates that the request was successful.
     * @throws ApiError
     */
    public findInstitutionById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Institution> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/banking/api/v1/institutions/{id}',
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
     * Update an institution record
     * Update an record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Institution Indicates that the request was successful.
     * @throws ApiError
     */
    public updateInstitution(
        id: UUID,
        xTenantId: string,
        requestBody: InstitutionRequest,
    ): CancelablePromise<Institution> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/banking/api/v1/institutions/{id}',
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
     * Delete a institution
     * Delete a institution using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteInstitution(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/banking/api/v1/institutions/{id}',
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
