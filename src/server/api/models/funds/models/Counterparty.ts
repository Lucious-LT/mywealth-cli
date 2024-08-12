/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CounterpartyLimitRule } from './CounterpartyLimitRule';
import type { CounterpartyStatus } from './CounterpartyStatus';
import type { CounterpartyType } from './CounterpartyType';
import type { LocalDateTime } from './LocalDateTime';
import type { UUID } from './UUID';

export type Counterparty = {
    /**
     * The unique ID for the record. This is the ID that is used in all services and related records when referencing the record.
     */
    id: UUID;
    /**
     * The ID of the user that created the record.
     */
    createdBy: string;
    /**
     * When the record was created.
     */
    createdAt: LocalDateTime;
    /**
     * The ID of the user that last modified the record.
     */
    updatedBy: string;
    /**
     * When the record was last modified.
     */
    updatedAt: LocalDateTime;
    /**
     * Indicates if this is a deleted record
     */
    deleted: boolean;
    /**
     * A unique counterparty code
     */
    code: string;
    /**
     * A routing number for the counter party
     */
    routingNo?: string | null;
    /**
     * A swift code for the counter party
     */
    swiftCode?: string | null;
    /**
     * The counter party country code
     */
    country: string;
    /**
     * The counter party description
     */
    label: string;
    /**
     * The status of the counter party
     */
    status: CounterpartyStatus;
    /**
     * The type of counter party
     */
    type: CounterpartyType;
    /**
     * The limit currency code
     */
    limitCurrency: string;
    /**
     * The limit amount
     */
    limitAmount: number;
    /**
     * The limit rule
     */
    limitRule: CounterpartyLimitRule;
};

