/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanResponse } from '../models/BooleanResponse';
import type { KycDocument } from '../models/KycDocument';
import type { KycDocumentRequest } from '../models/KycDocumentRequest';
import type { KycReportDTO } from '../models/KycReportDTO';
import type { PageTemplateKycDocument } from '../models/PageTemplateKycDocument';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class KycDocumentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new document
     * Creates a new record in the system. See the schema of the object for more information.
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns KycDocument OK
     * @throws ApiError
     */
    public createKycDocument(
        xTenantId: string,
        requestBody: KycDocumentRequest,
    ): CancelablePromise<KycDocument> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/kyc_documents',
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve a document
     * Retrieve a document using the document ID.
     * @param documentId
     * @param xTenantId The tenant identifier
     * @returns KycDocument OK
     * @throws ApiError
     */
    public findKycDocumentById(
        documentId: string,
        xTenantId: string,
    ): CancelablePromise<KycDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/{documentId}',
            path: {
                'documentId': documentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Delete a document
     * Delete a document in the system.
     * @param documentId
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Success
     * @throws ApiError
     */
    public deleteKycDocument(
        documentId: string,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/kyc_documents/{documentId}',
            path: {
                'documentId': documentId,
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
     * Update a document
     * Update a document in the system.
     * @param documentId
     * @param xTenantId The tenant identifier
     * @param requestBody
     * @returns KycDocument OK
     * @throws ApiError
     */
    public updateKycDocument(
        documentId: string,
        xTenantId: string,
        requestBody: KycDocumentRequest,
    ): CancelablePromise<KycDocument> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/kyc_documents/{documentId}',
            path: {
                'documentId': documentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve a kyc report by document ID
     * Retrieve a kyc report by document ID.
     * @param documentId
     * @param xTenantId The tenant identifier
     * @returns KycReportDTO OK
     * @throws ApiError
     */
    public findKycDocumentReportById(
        documentId: string,
        xTenantId: string,
    ): CancelablePromise<KycReportDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/{documentId}/report',
            path: {
                'documentId': documentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Validate a document ID
     * Validate a document using the document ID.
     * @param documentId
     * @param xTenantId The tenant identifier
     * @returns BooleanResponse OK
     * @throws ApiError
     */
    public isValidKycDocumentId(
        documentId: string,
        xTenantId: string,
    ): CancelablePromise<BooleanResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/validate/{documentId}',
            path: {
                'documentId': documentId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

    /**
     * Search for kyc documents
     * Search for kyc documents in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param pattern
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateKycDocument OK
     * @throws ApiError
     */
    public searchKycDocument(
        xTenantId: string,
        pattern: string = '',
        page: number,
        size: number = 20,
        sort: 'recordType_sort' | 'validUntil_sort' | 'fileName_sort' = 'fileName_sort',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateKycDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/search',
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
     * List kyc documents
     * Retrieve kyc documents in the system using the supported query parameters.
     * @param xTenantId The tenant identifier
     * @param page
     * @param size
     * @param sort
     * @param order
     * @returns PageTemplateKycDocument OK
     * @throws ApiError
     */
    public listKycDocument(
        xTenantId: string,
        page: number,
        size: number = 20,
        sort: 'id' | 'updatedAt' | 'fileName' | 'recordType' | 'validUntil' = 'fileName',
        order: 'asc' | 'desc' = 'asc',
    ): CancelablePromise<PageTemplateKycDocument> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/list',
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
     * List kyc documents for a client
     * Retrieve kyc documents for a client
     * @param clientId
     * @param xTenantId The tenant identifier
     * @returns KycDocument OK
     * @throws ApiError
     */
    public getKycDocumentsForClient(
        clientId: string,
        xTenantId: string,
    ): CancelablePromise<Array<KycDocument>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/kyc_documents/list/{clientId}',
            path: {
                'clientId': clientId,
            },
            headers: {
                'x-tenant-id': xTenantId,
            },
        });
    }

}
