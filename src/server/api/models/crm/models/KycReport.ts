/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing kyc report from the compliance service. The fields marked with an * means that they are required.
 */
export type KycReport = {
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
     * The unique ID for the report in the compliance engine.
     */
    reportId?: string;
    /**
     * Indicates when the record was created.
     */
    processedAt?: string;
    /**
     * The status of the verification.
     */
    status: KycReport.status;
    /**
     * The confidence score.
     */
    confidence: number;
    /**
     * The summary of the report.
     */
    summary: string;
    /**
     * The details of the report.
     */
    details?: string;
};

export namespace KycReport {

    /**
     * The status of the verification.
     */
    export enum status {
        SUCCESSFUL = 'SUCCESSFUL',
        FAILED = 'FAILED',
    }


}

