/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AccountService } from './services/AccountService';
import { AccruedExpenseService } from './services/AccruedExpenseService';
import { AdministrationService } from './services/AdministrationService';
import { CompanyService } from './services/CompanyService';
import { CurrencyCodeService } from './services/CurrencyCodeService';
import { CurrencyRateService } from './services/CurrencyRateService';
import { FixedAssetService } from './services/FixedAssetService';
import { FixedAssetGroupService } from './services/FixedAssetGroupService';
import { JournalService } from './services/JournalService';
import { PeriodService } from './services/PeriodService';
import { PrePaymentService } from './services/PrePaymentService';
import { SubAccountTransactionService } from './services/SubAccountTransactionService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class AccountingApiModule {

    public readonly account: AccountService;
    public readonly accruedExpense: AccruedExpenseService;
    public readonly administration: AdministrationService;
    public readonly company: CompanyService;
    public readonly currencyCode: CurrencyCodeService;
    public readonly currencyRate: CurrencyRateService;
    public readonly fixedAsset: FixedAssetService;
    public readonly fixedAssetGroup: FixedAssetGroupService;
    public readonly journal: JournalService;
    public readonly period: PeriodService;
    public readonly prePayment: PrePaymentService;
    public readonly subAccountTransaction: SubAccountTransactionService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9001',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.account = new AccountService(this.request);
        this.accruedExpense = new AccruedExpenseService(this.request);
        this.administration = new AdministrationService(this.request);
        this.company = new CompanyService(this.request);
        this.currencyCode = new CurrencyCodeService(this.request);
        this.currencyRate = new CurrencyRateService(this.request);
        this.fixedAsset = new FixedAssetService(this.request);
        this.fixedAssetGroup = new FixedAssetGroupService(this.request);
        this.journal = new JournalService(this.request);
        this.period = new PeriodService(this.request);
        this.prePayment = new PrePaymentService(this.request);
        this.subAccountTransaction = new SubAccountTransactionService(this.request);
    }
}

