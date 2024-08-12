/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AdministrationService } from './services/AdministrationService';
import { BondService } from './services/BondService';
import { ClassificationService } from './services/ClassificationService';
import { EquityService } from './services/EquityService';
import { FundService } from './services/FundService';
import { JournalService } from './services/JournalService';
import { LedgerService } from './services/LedgerService';
import { MarketService } from './services/MarketService';
import { SecurityPriceService } from './services/SecurityPriceService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class PositionApiModule {

    public readonly administration: AdministrationService;
    public readonly bond: BondService;
    public readonly classification: ClassificationService;
    public readonly equity: EquityService;
    public readonly fund: FundService;
    public readonly journal: JournalService;
    public readonly ledger: LedgerService;
    public readonly market: MarketService;
    public readonly securityPrice: SecurityPriceService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9000',
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
        this.bond = new BondService(this.request);
        this.classification = new ClassificationService(this.request);
        this.equity = new EquityService(this.request);
        this.fund = new FundService(this.request);
        this.journal = new JournalService(this.request);
        this.ledger = new LedgerService(this.request);
        this.market = new MarketService(this.request);
        this.securityPrice = new SecurityPriceService(this.request);
    }
}

