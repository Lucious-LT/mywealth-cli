/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttachmentRequest } from './AttachmentRequest';

/**
 * A JSON blob representing a communication message. The fields marked with an * means that they are required.
 */
export type CommunicationRequest = {
    /**
     * A unique identifier for the record that this communication is related to.
     */
    relatedToId: string;
    /**
     * The record type that the communication is related to.
     */
    relatedTo: CommunicationRequest.relatedTo;
    /**
     * The label of the record that this is related to.
     */
    relatedToLabel: string;
    /**
     * The status of the request. If the recordId is {IN_PROGRESS} then the service will send out the message
     */
    status: CommunicationRequest.status;
    /**
     * Indicates the direction of the message
     */
    direction: CommunicationRequest.direction;
    /**
     * Indicates the type of the message
     */
    type: CommunicationRequest.type;
    /**
     * A unique identifier for a template to be used for the message. If this is provided, the service will use the template to build the message and dynamically substitute all variables in the subject and body of the template using the values retrieved from the relatedTo record.
     */
    templateId?: string;
    /**
     * The subject of the communication. This can be provided or dynamically created from a template
     */
    subject: string;
    /**
     * The body of the communication. This can be provided or dynamically created from a template
     */
    body?: string;
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
    mimeType?: string;
    /**
     * A list of attachments to be sent with the message
     */
    attachments?: Array<AttachmentRequest>;
    /**
     * The tenant that this record belongs to.
     */
    tenant?: string;
    /**
     * A flag indicating if the record should be saved to the database. If this is false the body and attachments will be masked.
     */
    saveRecord: boolean;
};

export namespace CommunicationRequest {

    /**
     * The record type that the communication is related to.
     */
    export enum relatedTo {
        NA = 'NA',
        CLIENT = 'CLIENT',
        INVESTMENT_ACCOUNT = 'INVESTMENT_ACCOUNT',
        DEPOSIT_ACCOUNT = 'DEPOSIT_ACCOUNT',
        LOAN_ACCOUNT = 'LOAN_ACCOUNT',
        INSURANCE_ACCOUNT = 'INSURANCE_ACCOUNT',
        LOAN_PAYMENT = 'LOAN_PAYMENT',
        CARD_TRANSACTION = 'CARD_TRANSACTION',
        CASH_TRANSACTION = 'CASH_TRANSACTION',
        INSURANCE_PAYMENT = 'INSURANCE_PAYMENT',
        BILL_PAYMENT = 'BILL_PAYMENT',
        ORDER = 'ORDER',
        ORDER_CONTRACT_NOTE = 'ORDER_CONTRACT_NOTE',
        FUND_TRANSACTION = 'FUND_TRANSACTION',
        FUND_TRANSACTION_CONTRACT_NOTE = 'FUND_TRANSACTION_CONTRACT_NOTE',
    }

    /**
     * The status of the request. If the recordId is {IN_PROGRESS} then the service will send out the message
     */
    export enum status {
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETE = 'COMPLETE',
        DRAFT = 'DRAFT',
        PLANNED = 'PLANNED',
        ARCHIVED = 'ARCHIVED',
        SENT = 'SENT',
        NOT_DELIVERED = 'NOT_DELIVERED',
        CANCELED = 'CANCELED',
    }

    /**
     * Indicates the direction of the message
     */
    export enum direction {
        OUTBOUND = 'OUTBOUND',
        INBOUND = 'INBOUND',
    }

    /**
     * Indicates the type of the message
     */
    export enum type {
        EMAIL = 'EMAIL',
        CALL = 'CALL',
        SMS = 'SMS',
        WHATSAPP = 'WHATSAPP',
    }


}

