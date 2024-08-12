/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressView } from './AddressView';
import type { UUID } from './UUID';

export type ClientView = {
    id: UUID;
    clientType: string;
    businessStructure?: string | null;
    businessIncCode?: string | null;
    status: string;
    code: string;
    label: string;
    notes?: string | null;
    mobileNo: string;
    officeNo?: string | null;
    address: Array<AddressView>;
    valuationCurrency: string;
    email: string;
    notificationEmail?: string | null;
    pictureUrl?: string | null;
    kycTier?: string | null;
};

