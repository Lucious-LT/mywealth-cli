/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AdministrationService } from './services/AdministrationService';
import { AdvisorService } from './services/AdvisorService';
import { AdvisorGroupService } from './services/AdvisorGroupService';
import { ClientService } from './services/ClientService';
import { ClientGroupService } from './services/ClientGroupService';
import { KycDocumentService } from './services/KycDocumentService';
import { KycTierService } from './services/KycTierService';
import { LeadService } from './services/LeadService';
import { MediaService } from './services/MediaService';
import { TicketService } from './services/TicketService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class CrmApiModule {

    public readonly administration: AdministrationService;
    public readonly advisor: AdvisorService;
    public readonly advisorGroup: AdvisorGroupService;
    public readonly client: ClientService;
    public readonly clientGroup: ClientGroupService;
    public readonly kycDocument: KycDocumentService;
    public readonly kycTier: KycTierService;
    public readonly lead: LeadService;
    public readonly media: MediaService;
    public readonly ticket: TicketService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:8897/crm',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.administration = new AdministrationService(this.request);
        this.advisor = new AdvisorService(this.request);
        this.advisorGroup = new AdvisorGroupService(this.request);
        this.client = new ClientService(this.request);
        this.clientGroup = new ClientGroupService(this.request);
        this.kycDocument = new KycDocumentService(this.request);
        this.kycTier = new KycTierService(this.request);
        this.lead = new LeadService(this.request);
        this.media = new MediaService(this.request);
        this.ticket = new TicketService(this.request);
    }
}

