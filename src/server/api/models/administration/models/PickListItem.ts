/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PickListItemValue } from './PickListItemValue';

export type PickListItem = {
    /**
     * The label / description of the pick list item.
     */
    label: string;
    /**
     * The value for the pick list item.
     */
    value: string;
    /**
     * The pick list item values
     */
    pickListItemValues: Array<PickListItemValue>;
};

