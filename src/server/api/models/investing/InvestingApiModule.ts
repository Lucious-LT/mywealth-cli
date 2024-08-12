/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AdministrationService } from './services/AdministrationService';
import { BranchService } from './services/BranchService';
import { CashTransactionService } from './services/CashTransactionService';
import { CommissionService } from './services/CommissionService';
import { EndOfDayService } from './services/EndOfDayService';
import { FixedDepositProductService } from './services/FixedDepositProductService';
import { FixedDepositTrancheService } from './services/FixedDepositTrancheService';
import { FixedDepositTransactionService } from './services/FixedDepositTransactionService';
import { FundTransactionService } from './services/FundTransactionService';
import { HolidayService } from './services/HolidayService';
import { InvestmentAccountService } from './services/InvestmentAccountService';
import { InvestmentAccountLienService } from './services/InvestmentAccountLienService';
import { InvestmentAgentService } from './services/InvestmentAgentService';
import { InvestmentBrokerService } from './services/InvestmentBrokerService';
import { InvestmentCustodianService } from './services/InvestmentCustodianService';
import { InvestmentFeeService } from './services/InvestmentFeeService';
import { InvestmentInterestService } from './services/InvestmentInterestService';
import { InvestmentProductService } from './services/InvestmentProductService';
import { InvestmentRegistrarService } from './services/InvestmentRegistrarService';
import { MoneyMarketProductService } from './services/MoneyMarketProductService';
import { MoneyMarketTransactionService } from './services/MoneyMarketTransactionService';
import { OrderService } from './services/OrderService';
import { WithHoldingTaxService } from './services/WithHoldingTaxService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class InvestingApiModule {

    public readonly administration: AdministrationService;
    public readonly branch: BranchService;
    public readonly cashTransaction: CashTransactionService;
    public readonly commission: CommissionService;
    public readonly endOfDay: EndOfDayService;
    public readonly fixedDepositProduct: FixedDepositProductService;
    public readonly fixedDepositTranche: FixedDepositTrancheService;
    public readonly fixedDepositTransaction: FixedDepositTransactionService;
    public readonly fundTransaction: FundTransactionService;
    public readonly holiday: HolidayService;
    public readonly investmentAccount: InvestmentAccountService;
    public readonly investmentAccountLien: InvestmentAccountLienService;
    public readonly investmentAgent: InvestmentAgentService;
    public readonly investmentBroker: InvestmentBrokerService;
    public readonly investmentCustodian: InvestmentCustodianService;
    public readonly investmentFee: InvestmentFeeService;
    public readonly investmentInterest: InvestmentInterestService;
    public readonly investmentProduct: InvestmentProductService;
    public readonly investmentRegistrar: InvestmentRegistrarService;
    public readonly moneyMarketProduct: MoneyMarketProductService;
    public readonly moneyMarketTransaction: MoneyMarketTransactionService;
    public readonly order: OrderService;
    public readonly withHoldingTax: WithHoldingTaxService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:8898/investing',
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
        this.cashTransaction = new CashTransactionService(this.request);
        this.commission = new CommissionService(this.request);
        this.endOfDay = new EndOfDayService(this.request);
        this.fixedDepositProduct = new FixedDepositProductService(this.request);
        this.fixedDepositTranche = new FixedDepositTrancheService(this.request);
        this.fixedDepositTransaction = new FixedDepositTransactionService(this.request);
        this.fundTransaction = new FundTransactionService(this.request);
        this.holiday = new HolidayService(this.request);
        this.investmentAccount = new InvestmentAccountService(this.request);
        this.investmentAccountLien = new InvestmentAccountLienService(this.request);
        this.investmentAgent = new InvestmentAgentService(this.request);
        this.investmentBroker = new InvestmentBrokerService(this.request);
        this.investmentCustodian = new InvestmentCustodianService(this.request);
        this.investmentFee = new InvestmentFeeService(this.request);
        this.investmentInterest = new InvestmentInterestService(this.request);
        this.investmentProduct = new InvestmentProductService(this.request);
        this.investmentRegistrar = new InvestmentRegistrarService(this.request);
        this.moneyMarketProduct = new MoneyMarketProductService(this.request);
        this.moneyMarketTransaction = new MoneyMarketTransactionService(this.request);
        this.order = new OrderService(this.request);
        this.withHoldingTax = new WithHoldingTaxService(this.request);
    }
}

