/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';
import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';
import type { RecordType } from './RecordType';
import type { Service } from './Service';
import type { WebhookEventDeliveryStatus } from './WebhookEventDeliveryStatus';
import type { WebhookEventType } from './WebhookEventType';

export type WebhookEvent = {
    id?: ObjectId | null;
    /**
     * The tenant that this event belongs to.
     */
    tenant: string;
    /**
     * The id of the event record
     */
    recordId: string;
    /**
     * The unique message ID used to manage the idempotent semantics
     */
    messageId: string;
    /**
     * The id of the webhook
     */
    webhookId: ObjectId | null;
    /**
     * Indicates when the event was generated.
     */
    createdAt: LocalDateTime;
    /**
     * Indicates when the event was last updated.
     */
    updatedAt: LocalDateTime;
    /**
     * The URL for delivering the webhook
     */
    notificationUrl: string;
    /**
     * The delivery status of the message
     */
    deliveryStatus: WebhookEventDeliveryStatus;
    /**
     * The # of delivery attempts
     */
    deliveryAttempts: number;
    /**
     * The last time a delivery was attempted
     */
    lastDeliveryAttemptTime?: LocalDateTime | null;
    /**
     * The next time a delivery is scheduled
     */
    nextDeliveryAttemptTime?: LocalDateTime | null;
    /**
     * The module where the event was generated
     */
    service: Service;
    /**
     * The type of event
     */
    eventType: EventType;
    /**
     * The type of hook that generated this event for
     */
    hookType: WebhookEventType;
    /**
     * The record type that generated the event
     */
    recordType: RecordType;
    /**
     * The payload of the event
     */
    jsonPayload?: string | null;
};

