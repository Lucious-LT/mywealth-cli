/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecordType } from '../models/RecordType';
import type { TransactionResponse } from '../models/TransactionResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdministrationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Rebuild the search index for a record type
     * This is a maintenance transaction that should be used to update the search index for a given record type. This should only be used if the search index is out of sync with the database.
     * @param recordType
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request has been submitted.
     * @throws ApiError
     */
    public rebuildFullTextIndex(
        recordType: RecordType,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/admin/index/{recordType}',
            path: {
                'recordType': recordType,
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
     * Snapshot a record type
     * This is a maintenance transaction that will snapshot the requested record type, emitting the records to the data-message kafka topic.
     * @param recordType
     * @param xTenantId The tenant identifier
     * @returns TransactionResponse Indicates that the request has been submitted.
     * @throws ApiError
     */
    public snapshotRecords(
        recordType: RecordType,
        xTenantId: string,
    ): CancelablePromise<TransactionResponse> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/funds/api/v1/admin/snapshot/{recordType}',
            path: {
                'recordType': recordType,
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

}
