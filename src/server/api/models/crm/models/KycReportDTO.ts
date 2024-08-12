/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { ContactKycDTO } from './ContactKycDTO';
import type { KycReport } from './KycReport';

export type KycReportDTO = {
    clientId?: string;
    clientLabel?: string;
    clientType?: KycReportDTO.clientType;
    clientStatus?: KycReportDTO.clientStatus;
    clientCode?: string;
    clientMobileNo?: string;
    clientOfficeNo?: string;
    clientEmail?: string;
    clientReferralCode?: string;
    clientNotes?: string;
    clientAddresses?: Array<Address>;
    advisorGroupCode?: string;
    advisorGroupName?: string;
    advisorGroupType?: KycReportDTO.advisorGroupType;
    advisorGroupEmail?: string;
    contacts?: Array<ContactKycDTO>;
    kycReport?: KycReport;
};

export namespace KycReportDTO {

    export enum clientType {
        CORPORATE = 'CORPORATE',
        JOINT = 'JOINT',
        TRUST = 'TRUST',
        INDIVIDUAL = 'INDIVIDUAL',
    }

    export enum clientStatus {
        PENDING = 'PENDING',
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
        DORMANT = 'DORMANT',
        CLOSED = 'CLOSED',
    }

    export enum advisorGroupType {
        BANK = 'BANK',
        TRADE = 'TRADE',
        WEALTH = 'WEALTH',
    }


}

