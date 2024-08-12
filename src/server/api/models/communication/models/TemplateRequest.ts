/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a template. The fields marked with an * means that they are required.
 */
export type TemplateRequest = {
    /**
     * The clientType of template and should be USER for custom templates.
     */
    type: TemplateRequest.type;
    /**
     * A unique template code.
     */
    code: string;
    /**
     * The subject of messages sent with this template
     */
    subject: string;
    /**
     * The body of messages sent with this template
     */
    body: string;
    /**
     * A valid from address. This address should be valid and registered with the mail delivery framework
     */
    fromAddress: string;
    /**
     * A cc address for email messages
     */
    ccAddress?: string;
    /**
     * A bcc address for email messages
     */
    bccAddress?: string;
    /**
     * A reply to address for email messages
     */
    replyTo?: string;
    /**
     * A valid mime clientType
     */
    mimeType: string;
};

export namespace TemplateRequest {

    /**
     * The clientType of template and should be USER for custom templates.
     */
    export enum type {
        USER = 'USER',
        SYSTEM = 'SYSTEM',
    }


}

