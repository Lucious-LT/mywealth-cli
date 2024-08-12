/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AdministrationService } from './services/AdministrationService';
import { BranchService } from './services/BranchService';
import { ClaimService } from './services/ClaimService';
import { InsuranceAccountService } from './services/InsuranceAccountService';
import { InsuranceProductService } from './services/InsuranceProductService';
import { PartnerService } from './services/PartnerService';
import { PaymentService } from './services/PaymentService';
import { PolicyService } from './services/PolicyService';
import { PremiumService } from './services/PremiumService';
import { QuoteService } from './services/QuoteService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class InsuranceApiModule {

    public readonly administration: AdministrationService;
    public readonly branch: BranchService;
    public readonly claim: ClaimService;
    public readonly insuranceAccount: InsuranceAccountService;
    public readonly insuranceProduct: InsuranceProductService;
    public readonly partner: PartnerService;
    public readonly payment: PaymentService;
    public readonly policy: PolicyService;
    public readonly premium: PremiumService;
    public readonly quote: QuoteService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9004',
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
        this.branch = new BranchService(this.request);
        this.claim = new ClaimService(this.request);
        this.insuranceAccount = new InsuranceAccountService(this.request);
        this.insuranceProduct = new InsuranceProductService(this.request);
        this.partner = new PartnerService(this.request);
        this.payment = new PaymentService(this.request);
        this.policy = new PolicyService(this.request);
        this.premium = new PremiumService(this.request);
        this.quote = new QuoteService(this.request);
    }
}

