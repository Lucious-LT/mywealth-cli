/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookListSort } from '../models/BookListSort';
import type { BookSearchSort } from '../models/BookSearchSort';
import type { BooleanResponse } from '../models/BooleanResponse';
import type { Direction } from '../models/Direction';
import type { PageTemplateTreasuryBook } from '../models/PageTemplateTreasuryBook';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { TransactionStatusCount } from '../models/TransactionStatusCount';
import type { TreasuryBook } from '../models/TreasuryBook';
import type { TreasuryBookReport } from '../models/TreasuryBookReport';
import type { TreasuryBookRequest } from '../models/TreasuryBookRequest';
import type { UUID } from '../models/UUID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TreasuryBookService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new treasury book
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TreasuryBook Indicates that the request was successful.
     * @throws ApiError
     */
    public addTreasuryBook(
        xTenantId: string,
        requestBody: TreasuryBookRequest,
    ): CancelablePromise<TreasuryBook> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/treasury/api/v1/treasury_books',
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
     * Retrieve a treasury book
     * Retrieve a treasury book using the treasury book code.
     * @param code
     * @param xTenantId The tenant identifier
     * @returns TreasuryBook Indicates that the request was successful.
     * @throws ApiError
     */
    public findTreasuryBookByCode(
        code: string,
        xTenantId: string,
    ): CancelablePromise<TreasuryBook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/code/{code}',
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
     * Validate a treasury book code
     * Validate a treasury book using the code and an optional record ID. Will return true if the code is already assigned to an existing record with the ID specified. If the ID is not provided it will check to see if the code is used by any other record.
     * @param code
     * @param xTenantId The tenant identifier
     * @param treasuryBookId
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isTreasuryBookCodeAvailable(
        code: string,
        xTenantId: string,
        treasuryBookId?: UUID,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/is-available/code',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'code': code,
                'treasuryBookId': treasuryBookId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * List treasury_books
     * Retrieve treasury books in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @returns PageTemplateTreasuryBook OK
     * @throws ApiError
     */
    public listTreasuryBook(
        order: Direction,
        sort: BookListSort,
        xTenantId: string,
        page: number,
        size: number = 20,
    ): CancelablePromise<PageTemplateTreasuryBook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/list',
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
     * Return a count of terminated transactions
     * Return a count of terminated transactions across all asset classes
     * @param bookId
     * @param xTenantId The tenant identifier
     * @returns TransactionStatusCount OK
     * @throws ApiError
     */
    public getTerminatedTransactionCount(
        bookId: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionStatusCount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/report/treasury-center/count/terminated/{bookId}',
            path: {
                'bookId': bookId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Return a count of all transactions
     * Return a count of all transactions across all asset classes
     * @param bookId
     * @param xTenantId The tenant identifier
     * @returns TransactionStatusCount OK
     * @throws ApiError
     */
    public getTotalTransactionCount(
        bookId: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionStatusCount> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/report/treasury-center/count/total/{bookId}',
            path: {
                'bookId': bookId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Generate treasury center valuation report
     * Generate treasury center valuation report
     * @param bookId
     * @param xTenantId The tenant identifier
     * @returns TreasuryBookReport OK
     * @throws ApiError
     */
    public getTreasuryBookValuationReport(
        bookId: UUID,
        xTenantId: string,
    ): CancelablePromise<TreasuryBookReport> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/report/treasury-center/valuation/{bookId}',
            path: {
                'bookId': bookId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            errors: {
                401: `Not Authorized`,
                403: `Not Allowed`,
            },
        });
    }

    /**
     * Search for treasury books using a full text search engine
     * Search for treasury books in the system using the supported query parameters.
     * @param order
     * @param sort
     * @param xTenantId The tenant identifier
     * @param page
     * @param pattern
     * @param size
     * @returns PageTemplateTreasuryBook OK
     * @throws ApiError
     */
    public searchTreasuryBook(
        order: Direction,
        sort: BookSearchSort,
        xTenantId: string,
        page: number,
        pattern: string = '',
        size: number = 20,
    ): CancelablePromise<PageTemplateTreasuryBook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/search',
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
     * Retrieve a treasury book
     * Retrieve a treasury book using the treasury_book ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TreasuryBook Indicates that the request was successful.
     * @throws ApiError
     */
    public findTreasuryBookById(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TreasuryBook> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/treasury/api/v1/treasury_books/{id}',
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
     * Update a treasury book record
     * Update a record in the system. See the schema of the object for more information.
     * @param id
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns TreasuryBook Indicates that the request was successful.
     * @throws ApiError
     */
    public updateTreasuryBook(
        id: UUID,
        xTenantId: string,
        requestBody: TreasuryBookRequest,
    ): CancelablePromise<TreasuryBook> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/treasury/api/v1/treasury_books/{id}',
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
     * Delete a treasury book
     * Delete a treasury_book using the ID.
     * @param id
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request was successful.
     * @throws ApiError
     */
    public deleteTreasuryBook(
        id: UUID,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/treasury/api/v1/treasury_books/{id}',
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
