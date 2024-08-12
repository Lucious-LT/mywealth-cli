/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuditEventService } from './services/AuditEventService';
import { GroupService } from './services/GroupService';
import { PickListService } from './services/PickListService';
import { TenantService } from './services/TenantService';
import { UserService } from './services/UserService';
import { UserSignupService } from './services/UserSignupService';
import { WebhookService } from './services/WebhookService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class AdministrationApiModule {

    public readonly auditEvent: AuditEventService;
    public readonly group: GroupService;
    public readonly pickList: PickListService;
    public readonly tenant: TenantService;
    public readonly user: UserService;
    public readonly userSignup: UserSignupService;
    public readonly webhook: WebhookService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9002',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auditEvent = new AuditEventService(this.request);
        this.group = new GroupService(this.request);
        this.pickList = new PickListService(this.request);
        this.tenant = new TenantService(this.request);
        this.user = new UserService(this.request);
        this.userSignup = new UserSignupService(this.request);
        this.webhook = new WebhookService(this.request);
    }
}

