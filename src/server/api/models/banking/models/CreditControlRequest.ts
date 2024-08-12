/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreditControlStatus } from './CreditControlStatus';
import type { UUID } from './UUID';

/**
 * A JSON blob representing a credit control record.
 */
export type CreditControlRequest = {
    /**
     * The biller label
     */
    label: string;
    /**
     * The status of the record
     */
    status: CreditControlStatus;
    /**
     * The branch ID that the credit control rule is attached to
     */
    branchId: UUID;
    /**
     * The limit currency
     */
    currency: string;
    /**
     * The maximum exposure amount for any client
     */
    maxClientExposure: number;
    /**
     * The minimum days in arrears before a write off can be approved
     */
    minDaysInArrearsBeforeWriteOff: number;
    /**
     * TThe maximum number of accounts that can be attached to an account group
     */
    maxAccountGroupSize: number;
};

