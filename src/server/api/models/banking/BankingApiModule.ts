/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AccountGroupService } from './services/AccountGroupService';
import { AccountHoldService } from './services/AccountHoldService';
import { AdministrationService } from './services/AdministrationService';
import { BillerService } from './services/BillerService';
import { BillScheduleService } from './services/BillScheduleService';
import { BranchService } from './services/BranchService';
import { CardService } from './services/CardService';
import { CardTransactionService } from './services/CardTransactionService';
import { CashTransactionService } from './services/CashTransactionService';
import { CreditControlService } from './services/CreditControlService';
import { CreditLineService } from './services/CreditLineService';
import { DepositAccountService } from './services/DepositAccountService';
import { DepositInterestService } from './services/DepositInterestService';
import { DepositProductService } from './services/DepositProductService';
import { EndOfDayService } from './services/EndOfDayService';
import { InstitutionService } from './services/InstitutionService';
import { LoanAccountService } from './services/LoanAccountService';
import { LoanAccountDisbursementService } from './services/LoanAccountDisbursementService';
import { LoanAccountPaymentService } from './services/LoanAccountPaymentService';
import { LoanFeeService } from './services/LoanFeeService';
import { LoanInterestService } from './services/LoanInterestService';
import { LoanProductService } from './services/LoanProductService';
import { PositionService } from './services/PositionService';
import { TaxService } from './services/TaxService';
import { TellerService } from './services/TellerService';
import { TransferService } from './services/TransferService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class BankingApiModule {

    public readonly accountGroup: AccountGroupService;
    public readonly accountHold: AccountHoldService;
    public readonly administration: AdministrationService;
    public readonly biller: BillerService;
    public readonly billSchedule: BillScheduleService;
    public readonly branch: BranchService;
    public readonly card: CardService;
    public readonly cardTransaction: CardTransactionService;
    public readonly cashTransaction: CashTransactionService;
    public readonly creditControl: CreditControlService;
    public readonly creditLine: CreditLineService;
    public readonly depositAccount: DepositAccountService;
    public readonly depositInterest: DepositInterestService;
    public readonly depositProduct: DepositProductService;
    public readonly endOfDay: EndOfDayService;
    public readonly institution: InstitutionService;
    public readonly loanAccount: LoanAccountService;
    public readonly loanAccountDisbursement: LoanAccountDisbursementService;
    public readonly loanAccountPayment: LoanAccountPaymentService;
    public readonly loanFee: LoanFeeService;
    public readonly loanInterest: LoanInterestService;
    public readonly loanProduct: LoanProductService;
    public readonly position: PositionService;
    public readonly tax: TaxService;
    public readonly teller: TellerService;
    public readonly transfer: TransferService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:9003',
            VERSION: config?.VERSION ?? '0.0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.accountGroup = new AccountGroupService(this.request);
        this.accountHold = new AccountHoldService(this.request);
        this.administration = new AdministrationService(this.request);
        this.biller = new BillerService(this.request);
        this.billSchedule = new BillScheduleService(this.request);
        this.branch = new BranchService(this.request);
        this.card = new CardService(this.request);
        this.cardTransaction = new CardTransactionService(this.request);
        this.cashTransaction = new CashTransactionService(this.request);
        this.creditControl = new CreditControlService(this.request);
        this.creditLine = new CreditLineService(this.request);
        this.depositAccount = new DepositAccountService(this.request);
        this.depositInterest = new DepositInterestService(this.request);
        this.depositProduct = new DepositProductService(this.request);
        this.endOfDay = new EndOfDayService(this.request);
        this.institution = new InstitutionService(this.request);
        this.loanAccount = new LoanAccountService(this.request);
        this.loanAccountDisbursement = new LoanAccountDisbursementService(this.request);
        this.loanAccountPayment = new LoanAccountPaymentService(this.request);
        this.loanFee = new LoanFeeService(this.request);
        this.loanInterest = new LoanInterestService(this.request);
        this.loanProduct = new LoanProductService(this.request);
        this.position = new PositionService(this.request);
        this.tax = new TaxService(this.request);
        this.teller = new TellerService(this.request);
        this.transfer = new TransferService(this.request);
    }
}

