/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PickListItem } from './PickListItem';
import type { PickListType } from './PickListType';

/**
 * A JSON blob representing a pick list record.
 */
export type PickListRequest = {
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

