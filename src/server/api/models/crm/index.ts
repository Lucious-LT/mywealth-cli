/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { CrmApiModule } from './CrmApiModule';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export { Address } from './models/Address';
export { Advisor } from './models/Advisor';
export { AdvisorGroup } from './models/AdvisorGroup';
export { AdvisorGroupRequest } from './models/AdvisorGroupRequest';
export { AdvisorRequest } from './models/AdvisorRequest';
export type { AppMessage } from './models/AppMessage';
export type { AppRecord } from './models/AppRecord';
export type { BooleanResponse } from './models/BooleanResponse';
export { Client } from './models/Client';
export { ClientGroup } from './models/ClientGroup';
export { ClientGroupRequest } from './models/ClientGroupRequest';
export { ClientRecordDTO } from './models/ClientRecordDTO';
export { ClientRequest } from './models/ClientRequest';
export { Contact } from './models/Contact';
export { ContactKycDTO } from './models/ContactKycDTO';
export { ContactRecordDTO } from './models/ContactRecordDTO';
export { ContactRequest } from './models/ContactRequest';
export type { FieldDetail } from './models/FieldDetail';
export { KycDocument } from './models/KycDocument';
export { KycDocumentRequest } from './models/KycDocumentRequest';
export { KycReport } from './models/KycReport';
export { KycReportDTO } from './models/KycReportDTO';
export type { KycTier } from './models/KycTier';
export type { KycTierRequest } from './models/KycTierRequest';
export { Lead } from './models/Lead';
export { LeadRequest } from './models/LeadRequest';
export type { LoginRequest } from './models/LoginRequest';
export { PageTemplateAdvisor } from './models/PageTemplateAdvisor';
export { PageTemplateAdvisorGroup } from './models/PageTemplateAdvisorGroup';
export { PageTemplateClient } from './models/PageTemplateClient';
export { PageTemplateClientGroup } from './models/PageTemplateClientGroup';
export { PageTemplateKycDocument } from './models/PageTemplateKycDocument';
export { PageTemplateKycTier } from './models/PageTemplateKycTier';
export { PageTemplateLead } from './models/PageTemplateLead';
export { PageTemplateTicket } from './models/PageTemplateTicket';
export type { PasswordChangeAdminRequest } from './models/PasswordChangeAdminRequest';
export type { PasswordChangeTokenRequest } from './models/PasswordChangeTokenRequest';
export type { PasswordTokenRequest } from './models/PasswordTokenRequest';
export { RecordFilterRequestStringClientListSort } from './models/RecordFilterRequestStringClientListSort';
export { RecordFilterRequestStringContactListSort } from './models/RecordFilterRequestStringContactListSort';
export type { RecordTemplateClientRecordDTO } from './models/RecordTemplateClientRecordDTO';
export type { RecordTemplateContactRecordDTO } from './models/RecordTemplateContactRecordDTO';
export { Ticket } from './models/Ticket';
export { TicketRequest } from './models/TicketRequest';
export type { TicketResolution } from './models/TicketResolution';
export type { TransactionResponse } from './models/TransactionResponse';

export { AdministrationService } from './services/AdministrationService';
export { AdvisorService } from './services/AdvisorService';
export { AdvisorGroupService } from './services/AdvisorGroupService';
export { ClientService } from './services/ClientService';
export { ClientGroupService } from './services/ClientGroupService';
export { KycDocumentService } from './services/KycDocumentService';
export { KycTierService } from './services/KycTierService';
export { LeadService } from './services/LeadService';
export { MediaService } from './services/MediaService';
export { TicketService } from './services/TicketService';
