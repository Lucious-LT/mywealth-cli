/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MediaService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieve a picture / avatar using the media service
     * Retrieve a picture / avatar using the media service. This service returns a 128 x 128 jpg image that is generated when an image is attached to an object.
     * @param url
     * @param xTenantId The tenant identifier
     * @returns string OK
     * @throws ApiError
     */
    public getMediaWithUrl(
        url: string,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/media/file',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'url': url,
            },
        });
    }

    /**
     * Retrieve a picture / avatar using the media service
     * Retrieve a picture / avatar using the media service. This service the image as a base 64 encoded string.
     * @param url
     * @param xTenantId The tenant identifier
     * @returns string OK
     * @throws ApiError
     */
    public getBase64EncodedMediaWithUrl(
        url: string,
        xTenantId: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/media/encoded',
            headers: {
                'x-tenant-id': xTenantId,
            },
            query: {
                'url': url,
            },
        });
    }

}
