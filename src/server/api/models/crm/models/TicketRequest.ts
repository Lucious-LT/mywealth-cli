/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a ticket request. The fields marked with an * means that they are required.
 */
export type TicketRequest = {
    /**
     * A subject of the ticket
     */
    subject: string;
    /**
     * A category for the ticket. This is validated using the configured 'TICKET_CATEGORY' pick lis.t
     */
    category?: string;
    /**
     * A sub category fot the ticket.  This is validated using the configured 'TICKET_CATEGORY' pick list.
     */
    subCategory?: string;
    /**
     * Notes on the ticket record
     */
    description?: string;
    /**
     * Details related to the resolution of the ticket
     */
    resolution?: string;
    /**
     * The ID of the client
     */
    clientId: string;
    /**
     * The ID of the contact. Note that this contact must be associated with the client record
     */
    contactId: string;
    /**
     * The ID of the advisor group. The advisor group associated with the client record is used if this is not provided
     */
    advisorGroupId?: string;
    /**
     * The date that the ticket is due
     */
    dueDate?: string;
    /**
     * The priority of the ticket
     */
    priority: TicketRequest.priority;
    /**
     * The channel through which the cas was submitted
     */
    channel: TicketRequest.channel;
    /**
     * The ID of the advisor. The advisor within the team that the case is assigned to
     */
    advisorId?: string;
};

export namespace TicketRequest {

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

