/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WebhookDeliveryType } from './WebhookDeliveryType';
import type { WebhookEventType } from './WebhookEventType';
import type { WebhookStatus } from './WebhookStatus';

/**
 * A JSON blob representing a webhook record.
 */
export type WebhookRequest = {
    /**
     * The status of the webhook.
     */
    status: WebhookStatus;
    /**
     * How delivery should be attempted. 'AT_LEAST_ONCE' will retry 10 times with an exponential backoff based on a 5 second seed and a random factor until it receives a 200 code. For example if the initial delivery fails, the redelivery attempts will happen after 5, 11, 23, 47, 142, ... seconds until succeeds or 10 attempts have been made. 'AT_MOST_ONCE' will attempt only once. If all attempts to an end point fail for 24 hours, the webhook will be automatically disabled.
     */
    deliveryType: WebhookDeliveryType;
    /**
     * Event for which this webhook should be executed.
     */
    event: Array<WebhookEventType>;
    /**
     * The url for the message.
     */
    url: string;
    /**
     * The secret key that will be used to sign all messages that we will deliver to your webhook. The signature for the payload will be sent in the 'signature' field of the message. This signature is generated using AES 128 and this key to sign the 'payload' in the reportYou should use this signature to validate that the message was sent by the platform and that the payload was not altered.If the hook is configured to use the 'AT_MOST_ONCE' delivery type, only 1 delivery attempt will be made. With 'AT_LEAST_ONCE' delivery type, we will attempt up to 10 times with an exponential back off. If you have experienced an extended down time, you can use the '/api/v1/webhooks/events' API to retrieve your events for a specified time window and reprocess the failed ones. All delivered messages will also contain an 'x-message-id' header that is unique for every message. The design of your webhooks should be idempotent and when using the 'AT_LEAST_ONCE' delivery type, the 'x-message-id' can be used to ensure that you do not process duplicate events when message delivery is attempted multiple times due to network or processing errors. While developing your application you can get an instant URL from webhook.site, and inspect your payloads without having to setup any infrastructure. Your end point must return a successful response (2xx) HTTP status code to acknowledge receipt and any other status code not in this range will be treated as a failure. For webhooks that deliver value to your clients we also recommend that you re-query the platform in addition to verifying the signature.
     */
    secretKey: string | null;
    /**
     * The subject for the webhook.
     */
    subject: string;
};

