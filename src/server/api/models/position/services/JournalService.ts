/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchResponse } from '../models/BatchResponse';
import type { Direction } from '../models/Direction';
import type { Journal } from '../models/Journal';
import type { JournalListSort } from '../models/JournalListSort';
import type { JournalRequest } from '../models/JournalRequest';
import type { JournalSearchSort } from '../models/JournalSearchSort';
import type { JournalUploadRequest } from '../models/JournalUploadRequest';
import type { LocalDate } from '../models/LocalDate';
import type { PageTemplateJournal } from '../models/PageTemplateJournal';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class JournalService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new journal
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public addJournal(
        xTenantId: string,
        requestBody: JournalRequest,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/journals',
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
     * Approve a journal
     * Approve a journal using the journal ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public approveJournalById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/position/api/v1/journals/approve/{id}',
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
     * Retrieve a journal using the code
     * Retrieve a journal using the journal code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public findJournalByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/journals/code/{code}',
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
     * List journals
     * Retrieve journals in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateJournal OK
     * @throws ApiError
     */
    public listJournal(
        order: Direction,
        sort: JournalListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateJournal> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/journals/list',
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
     * Post a journal that has been approved
     * Post a journal using the journal ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public postJournalById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/position/api/v1/journals/post/{id}',
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
     * Reverse a posted journal
     * Reverse a posted journal using the journal ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public reverseJournalById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/position/api/v1/journals/reverse/{id}',
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
     * Search for journals using a full text search engine
     * Search for journals in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateJournal OK
     * @throws ApiError
     */
    public searchJournal(
        order: Direction,
        sort: JournalSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateJournal> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/journals/search',
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
     * Create or update journals using the uploaded excel file
     * Creates or update position journals in the system using an excel file. If any of the records in the file is invalid the whole transaction will be rolled back.See the documentation for the expected file format for more information.
     * @param xTenantId The tenant identifier
     * @param formData
     * @param journalDate
     * @returns BatchResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public uploadJournals(
        xTenantId: string,
        formData: JournalUploadRequest,
        journalDate?: LocalDate,
    ): CancelablePromise<BatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/position/api/v1/journals/upload',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'journalDate': journalDate,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Indicates that the request failed.`,
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Retrieve a journal using the ID
     * Retrieve a journal using the journal ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public findJournalById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/position/api/v1/journals/{id}',
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
     * Update a journal record that is pending.
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns Journal Indicates that the request was successful.
     * @throws ApiError
     */
    public updateJournal(
        id: UUID,
        xTenantId: string,
        requestBody: JournalRequest,
    ): CancelablePromise<Journal> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/position/api/v1/journals/{id}',
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
     * Delete a journal that is pending or reversed.
     * Delete an journal using the journal ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteJournal(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/position/api/v1/journals/{id}',
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
