/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalDateTime } from './LocalDateTime';
import type { ObjectId } from './ObjectId';
import type { PickListItem } from './PickListItem';
import type { PickListType } from './PickListType';

export type PickList = {
    id?: ObjectId | null;
    /**
     * The tenant that this record belongs to.
     */
    tenant: string;
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
     * The label / description of the pick list
     */
    label: string;
    /**
     * The type of pick list
     */
    pickListType: PickListType;
    /**
     * The pick list values
     */
    pickListItems: Array<PickListItem>;
};

