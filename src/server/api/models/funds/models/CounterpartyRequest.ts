/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CounterpartyLimitRule } from './CounterpartyLimitRule';
import type { CounterpartyStatus } from './CounterpartyStatus';
import type { CounterpartyType } from './CounterpartyType';

/**
 * A JSON blob representing a counterparty record.
 */
export type CounterpartyRequest = {
    /**
     * The counterparty code
     */
    code: string;
    /**
     * The counterparty label
     */
    label: string;
    /**
     * The status of the counterparty
     */
    status: CounterpartyStatus;
    /**
     * The type of counterparty
     */
    type: CounterpartyType;
    /**
     * The routing code of the counterparty
     */
    routingNo?: string | null;
    /**
     * The swift code of the counterparty
     */
    swiftCode?: string | null;
    /**
     * The counterparty country code
     */
    country: string;
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

