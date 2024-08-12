/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Classification } from '../models/Classification';
import type { ClassificationListSort } from '../models/ClassificationListSort';
import type { ClassificationRequest } from '../models/ClassificationRequest';
import type { ClassificationSearchSort } from '../models/ClassificationSearchSort';
import type { Direction } from '../models/Direction';
import type { PageTemplateClassification } from '../models/PageTemplateClassification';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClassificationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new classification entry
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Classification Indicates that the request was successful.
     * @throws ApiError
     */
    public addClassification(
        xTenantId: string,
        requestBody: ClassificationRequest,
    ): CancelablePromise<Classification> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/classifications',
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
     * List classification record
     * Retrieve classification records in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateClassification OK
     * @throws ApiError
     */
    public listClassification(
        order: Direction,
        sort: ClassificationListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateClassification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/classifications/list',
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
     * Search for accounts using a full text search engine
     * Search for accounts in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateClassification OK
     * @throws ApiError
     */
    public searchClassification(
        order: Direction,
        sort: ClassificationSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateClassification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/classifications/search',
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
     * Retrieve a classification using the ID
     * Retrieve a classification using the classification ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Classification Indicates that the request was successful.
     * @throws ApiError
     */
    public findClassificationById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Classification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/classifications/{id}',
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
     * Update a classification record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Classification Indicates that the request was successful.
     * @throws ApiError
     */
    public updateClassification(
        id: UUID,
        xTenantId: string,
        requestBody: ClassificationRequest,
    ): CancelablePromise<Classification> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/classifications/{id}',
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
     * Delete a classification
     * Delete an classification using the classification ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteClassification(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/classifications/{id}',
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
