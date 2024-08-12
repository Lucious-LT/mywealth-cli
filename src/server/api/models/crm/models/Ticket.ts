/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes a ticket in the system. The fields marked with an * means that they are required.
 */
export type Ticket = {
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
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * The status of the ticket
     */
    status: Ticket.status;
    /**
     * The priority of the ticket
     */
    priority: Ticket.priority;
    /**
     * The channel through which the cas was submitted
     */
    channel: Ticket.channel;
    /**
     * A system generated code for the ticket
     */
    code: string;
    /**
     * A subject of the ticket
     */
    subject: string;
    /**
     * Notes on the ticket
     */
    description?: string;
    /**
     * The date the ticket was opened
     */
    openDate: string;
    /**
     * The date the ticket is due
     */
    dueDate?: string;
    /**
     * The date the ticket was closed
     */
    closeDate?: string;
    /**
     * The date the ticket was resolved
     */
    resolutionDate?: string;
    /**
     * Notes on the ticket
     */
    resolution?: string;
    /**
     * A category for the ticket. This is validated using the configured 'TICKET_CATEGORY' pick lis.t
     */
    category?: string;
    /**
     * A sub category fot the ticket.  This is validated using the configured 'TICKET_CATEGORY' pick list.
     */
    subCategory?: string;
    /**
     * The contact label
     */
    contactLabel?: string;
    /**
     * The advisor group id
     */
    advisorGroupId?: string;
    /**
     * The advisor group code
     */
    advisorGroupCode?: string;
    /**
     * The advisor group label
     */
    advisorGroupLabel?: string;
    advisorLabel?: string;
    advisorEmail?: string;
    /**
     * The client code
     */
    clientCode?: string;
    /**
     * The client label
     */
    clientLabel?: string;
    advisorId?: string;
    advisorCode?: string;
    /**
     * The contact id
     */
    contactId?: string;
    /**
     * The client id
     */
    clientId?: string;
};

export namespace Ticket {

    /**
     * The status of the ticket
     */
    export enum status {
        NEW = 'NEW',
        ASSIGNED = 'ASSIGNED',
        RESOLVED = 'RESOLVED',
        CLOSED = 'CLOSED',
        PENDING_INPUT = 'PENDING_INPUT',
        REJECTED = 'REJECTED',
    }

    /**
     * The priority of the ticket
     */
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        CRITICAL = 'CRITICAL',
    }

    /**
     * The channel through which the cas was submitted
     */
    export enum channel {
        EMAIL = 'EMAIL',
        WEB = 'WEB',
        CALL = 'CALL',
        SMS = 'SMS',
        MOBILE_APP = 'MOBILE_APP',
        SOCIAL_MEDIA = 'SOCIAL_MEDIA',
        OTHERS = 'OTHERS',
    }


}

