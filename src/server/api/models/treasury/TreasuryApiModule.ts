/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AdministrationService } from './services/AdministrationService';
import { CounterpartyService } from './services/CounterpartyService';
import { DynamicAssetValueDividendService } from './services/DynamicAssetValueDividendService';
import { DynamicAssetValueTransactionService } from './services/DynamicAssetValueTransactionService';
import { EndOfDayService } from './services/EndOfDayService';
import { FixedIncomeTransactionService } from './services/FixedIncomeTransactionService';
import { MoneyMarketTransactionService } from './services/MoneyMarketTransactionService';
import { PlacementTransactionService } from './services/PlacementTransactionService';
import { PlacementTransactionTrancheService } from './services/PlacementTransactionTrancheService';
import { TreasuryAccountService } from './services/TreasuryAccountService';
import { TreasuryBookService } from './services/TreasuryBookService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class TreasuryApiModule {

    public readonly administration: AdministrationService;
    public readonly counterparty: CounterpartyService;
    public readonly dynamicAssetValueDividend: DynamicAssetValueDividendService;
    public readonly dynamicAssetValueTransaction: DynamicAssetValueTransactionService;
    public readonly endOfDay: EndOfDayService;
    public readonly fixedIncomeTransaction: FixedIncomeTransactionService;
    public readonly moneyMarketTransaction: MoneyMarketTransactionService;
    public readonly placementTransaction: PlacementTransactionService;
    public readonly placementTransactionTranche: PlacementTransactionTrancheService;
    public readonly treasuryAccount: TreasuryAccountService;
    public readonly treasuryBook: TreasuryBookService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9008',
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
        this.counterparty = new CounterpartyService(this.request);
        this.dynamicAssetValueDividend = new DynamicAssetValueDividendService(this.request);
        this.dynamicAssetValueTransaction = new DynamicAssetValueTransactionService(this.request);
        this.endOfDay = new EndOfDayService(this.request);
        this.fixedIncomeTransaction = new FixedIncomeTransactionService(this.request);
        this.moneyMarketTransaction = new MoneyMarketTransactionService(this.request);
        this.placementTransaction = new PlacementTransactionService(this.request);
        this.placementTransactionTranche = new PlacementTransactionTrancheService(this.request);
        this.treasuryAccount = new TreasuryAccountService(this.request);
        this.treasuryBook = new TreasuryBookService(this.request);
    }
}

