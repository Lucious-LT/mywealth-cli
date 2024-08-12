/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ClientService } from './services/ClientService';
import { DashboardService } from './services/DashboardService';
import { GlAccountsService } from './services/GlAccountsService';
import { LedgerService } from './services/LedgerService';
import { ProductAccountsService } from './services/ProductAccountsService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ReportsApiModule {

    public readonly client: ClientService;
    public readonly dashboard: DashboardService;
    public readonly glAccounts: GlAccountsService;
    public readonly ledger: LedgerService;
    public readonly productAccounts: ProductAccountsService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9007',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.client = new ClientService(this.request);
        this.dashboard = new DashboardService(this.request);
        this.glAccounts = new GlAccountsService(this.request);
        this.ledger = new LedgerService(this.request);
        this.productAccounts = new ProductAccountsService(this.request);
    }
}

