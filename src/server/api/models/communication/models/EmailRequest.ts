/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttachmentRequest } from './AttachmentRequest';

/**
 * A JSON blob representing an email message. The fields marked with an * means that they are required.
 */
export type EmailRequest = {
    /**
     * The subject of the communication. This can be provided or dynamically created from a template
     */
    subject: string;
    /**
     * The body of the communication. This can be provided or dynamically created from a template
     */
    body: string;
    /**
     * The destination address for the message and will be based on the type of message
     */
    to: string;
    /**
     * The from address for the message and will be based on the type of message
     */
    from: string;
    /**
     * The cc address for the message and will be based on the type of message
     */
    cc?: string;
    /**
     * The bcc address for the message and will be based on the type of message
     */
    bcc?: string;
    /**
     * The replyTo address for the message and will be based on the type of message
     */
    replyTo?: string;
    /**
     * The mimeType for the message and will be based on the type of message
     */
    mimeType: string;
    /**
     * A list of attachments to be sent with the message
     */
    attachments?: Array<AttachmentRequest>;
};

