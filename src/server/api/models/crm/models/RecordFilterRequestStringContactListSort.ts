/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecordFilterRequestStringContactListSort = {
    /**
     * The records returned
     */
    filters: Record<string, string>;
    /**
     * The field used to sort the response
     */
    sort: RecordFilterRequestStringContactListSort.sort;
    /**
     * The sort direction
     */
    order: RecordFilterRequestStringContactListSort.order;
};

export namespace RecordFilterRequestStringContactListSort {

    /**
     * The field used to sort the response
     */
    export enum sort {
        ID = 'id',
        UPDATED_AT = 'updatedAt',
        MOBILE_NO = 'mobileNo',
        EMAIL = 'email',
        LABEL = 'label',
        ROLE = 'role',
    }

    /**
     * The sort direction
     */
    export enum order {
        ASC = 'asc',
        DESC = 'desc',
    }


}

