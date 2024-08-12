/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';
import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';
import type { RecordType } from './RecordType';
import type { Service } from './Service';

export type AuditEvent = {
    id?: ObjectId | null;
    /**
     * The tenant that this event belongs to.
     */
    tenant: string;
    /**
     * The ID of the user that generated the event.
     */
    createdBy: string;
    /**
     * Indicates when the event was generated.
     */
    createdAt: LocalDateTime;
    /**
     * The id of the event record
     */
    recordId: string;
    /**
     * The label of the event record
     */
    recordLabel: string;
    /**
     * The module where the event was generated
     */
    service: Service;
    /**
     * The type of event
     */
    eventType: EventType;
    /**
     * The record type that generated the event
     */
    recordType: RecordType;
    /**
     * The user's IP address
     */
    ipAddress: string;
    /**
     * The summary of what was changed
     */
    eventSummary: string;
    /**
     * The json change log
     */
    changeLog?: string | null;
};

