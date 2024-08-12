/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A JSON blob representing a branch. The fields marked with an * means that they are required.
 */
export type HolidayRequest = {
    /**
     * The status of the holiday record. See the enumeration for acceptable values.
     */
    status: HolidayRequest.status;
    /**
     * The type of holiday. See the enumeration for acceptable values.
     */
    type: HolidayRequest.type;
    /**
     * A valid country code
     */
    country: string;
    /**
     * The start date for the holiday.
     */
    startDate: string;
    /**
     * The end date for the holiday.
     */
    endDate: string;
    /**
     * A text recordId that describes the branch
     */
    label: string;
    /**
     * Any notes that apply to this branch
     */
    notes?: string;
};

export namespace HolidayRequest {

    /**
     * The status of the holiday record. See the enumeration for acceptable values.
     */
    export enum status {
        INACTIVE = 'INACTIVE',
        ACTIVE = 'ACTIVE',
    }

    /**
     * The type of holiday. See the enumeration for acceptable values.
     */
    export enum type {
        SCHEDULED = 'SCHEDULED',
        ADHOC = 'ADHOC',
    }


}

