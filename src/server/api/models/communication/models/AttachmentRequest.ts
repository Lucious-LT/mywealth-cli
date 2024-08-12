/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a communication attachment. The fields marked with an * means that they are required.
 */
export type AttachmentRequest = {
    /**
     * A unique identifier for the attachment.
     */
    uuId?: string;
    /**
     * The file name for the attachment.
     */
    fileName: string;
    /**
     * The file mimeType for the attachment.
     */
    fileMimeType: string;
    /**
     * The size of the attachment in bytes.
     */
    fileSize?: number;
    /**
     * The category for the attachment. This can be used to group attachments together.
     */
    category?: string;
    /**
     * The sub category for the attachment. This can be used to group attachments together.
     */
    subCategory?: string;
    /**
     * Any notes on the attachment
     */
    notes?: string;
    /**
     * Base64 encoded content
     */
    base64Content?: string;
};

