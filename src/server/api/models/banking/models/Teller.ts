/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { TellerGlAccount } from './TellerGlAccount';
import type { TellerStatus } from './TellerStatus';
import type { UUID } from './UUID';

export type Teller = {
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
    tellerGLAccount: Array<TellerGlAccount>;
    /**
     * A unique teller code
     */
    code: string;
    /**
     * The teller's description
     */
    label: string;
    /**
     * The status of the teller
     */
    status: TellerStatus;
    branchId: UUID;
};

