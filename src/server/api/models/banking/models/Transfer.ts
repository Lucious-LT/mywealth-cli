/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDate } from './LocalDate';
import type { LocalDateTime } from './LocalDateTime';
import type { SubAccountType } from './SubAccountType';
import type { TransferDirection } from './TransferDirection';
import type { TransferStatus } from './TransferStatus';
import type { TransferType } from './TransferType';
import type { UUID } from './UUID';

export type Transfer = {
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
     * The  ID of the counterparty institution involved in the transaction
     */
    institutionId: UUID;
    /**
     * The  journal ID of the transaction
     */
    journalId?: UUID | null;
    /**
     * The counterparty institution code
     */
    institutionCode: string;
    /**
     * The counterparty institution  label
     */
    institutionLabel: string;
    /**
     * The client ID from the crm service
     */
    clientId: UUID;
    /**
     * The transaction label
     */
    label: string;
    /**
     * The client description
     */
    clientLabel: string;
    /**
     * The client code from CRM
     */
    clientCode: string;
    /**
     * A reference number provided by the client
     */
    reference?: string | null;
    /**
     * The reference code generated for the transfer
     */
    code: string;
    /**
     * The source account ID
     */
    srcAccountId?: UUID | null;
    /**
     * The source account number
     */
    srcAccountNo?: string | null;
    /**
     * The source account label
     */
    srcAccountLabel?: string | null;
    /**
     * The source account sub account type
     */
    srcSubAccountType?: SubAccountType | null;
    /**
     * The destination account ID
     */
    destAccountId?: UUID | null;
    /**
     * The destination account number
     */
    destAccountNo?: string | null;
    /**
     * The destination account label
     */
    destAccountLabel?: string | null;
    /**
     * The destination account sub account type
     */
    destSubAccountType?: SubAccountType | null;
    /**
     * The transaction currency
     */
    currency: string;
    /**
     * The transaction amount
     */
    amount: number;
    /**
     * The transaction fees
     */
    fees: number;
    /**
     * The transfer description
     */
    description: string;
    /**
     * The transaction response code
     */
    responseCode?: string | null;
    /**
     * The transaction response message
     */
    responseMessage?: string | null;
    /**
     * The status of the request
     */
    status: TransferStatus;
    /**
     * The type of transfer
     */
    type: TransferType;
    /**
     * The direction of the transaction
     */
    direction: TransferDirection;
    /**
     * The effective date
     */
    date: LocalDate;
    /**
     * The idempotency key
     */
    idemPotencyId?: UUID | null;
    accountLabel: string;
    accountNo: string;
    accountId?: UUID | null;
    subAccountType?: SubAccountType | null;
};

