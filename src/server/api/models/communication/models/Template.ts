/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a template. The fields marked with an * means that they are required.
 */
export type Template = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: string;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * Indicates when the record was created.
     */
    createdAt: string;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * Indicates when the record was last modified.
     */
    updatedAt: string;
    /**
     * The clientType of template and should be USER for custom templates.
     */
    type: Template.type;
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

export namespace Template {

    /**
     * The clientType of template and should be USER for custom templates.
     */
    export enum type {
        USER = 'USER',
        SYSTEM = 'SYSTEM',
    }


}

