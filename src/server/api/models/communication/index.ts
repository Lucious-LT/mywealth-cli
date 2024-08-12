/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { CommunicationApiModule } from './CommunicationApiModule';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { AppMessage } from './models/AppMessage';
export type { AttachmentRequest } from './models/AttachmentRequest';
export type { BooleanResponse } from './models/BooleanResponse';
export { Communication } from './models/Communication';
export { CommunicationRequest } from './models/CommunicationRequest';
export type { EmailRequest } from './models/EmailRequest';
export type { FieldDetail } from './models/FieldDetail';
export { PageTemplateCommunication } from './models/PageTemplateCommunication';
export { PageTemplateTemplate } from './models/PageTemplateTemplate';
export { Template } from './models/Template';
export { TemplateRequest } from './models/TemplateRequest';
export type { TransactionResponse } from './models/TransactionResponse';

export { CommunicationService } from './services/CommunicationService';
export { TemplateService } from './services/TemplateService';
