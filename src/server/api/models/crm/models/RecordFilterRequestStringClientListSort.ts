/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecordFilterRequestStringClientListSort = {
    /**
     * The records returned
     */
    filters: Record<string, string>;
    /**
     * The field used to sort the response
     */
    sort: RecordFilterRequestStringClientListSort.sort;
    /**
     * The sort direction
     */
    order: RecordFilterRequestStringClientListSort.order;
};

export namespace RecordFilterRequestStringClientListSort {

    /**
     * The field used to sort the response
     */
    export enum sort {
        ID = 'id',
        UPDATED_AT = 'updatedAt',
        CODE = 'code',
        REF_CODE = 'refCode',
        LABEL = 'label',
        EMAIL = 'email',
        MOBILE_NO = 'mobileNo',
        STATUS = 'status',
        CLIENT_TYPE = 'clientType',
    }

    /**
     * The sort direction
     */
    export enum order {
        ASC = 'asc',
        DESC = 'desc',
    }


}

