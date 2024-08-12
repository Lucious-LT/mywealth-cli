import { BankingApiModule } from "~/server/api/models/banking";
import { CrmApiModule } from "~/server/api/models/crm";
import { TokenService } from "~/server/api/oidc/keycloak-admin-client";
import { AccountingApiModule } from "~/server/api/models/accounting";
import { ReportsApiModule } from "~/server/api/models/reports";
import { InvestingApiModule } from "~/server/api/models/investing";
import { PositionApiModule } from "~/server/api/models/position";
import { FundsApiModule } from "~/server/api/models/funds";
import { TreasuryApiModule } from "~/server/api/models/treasury";
import { InsuranceApiModule } from "~/server/api/models/insurance";
import { AdministrationApiModule } from "~/server/api/models/administration";
import { CommunicationApiModule } from "~/server/api/models/communication";

interface ApiService {
  getApiService(tenant: string): Promise<unknown>;
}

export class BankingService implements ApiService {
  private static bankingService: BankingService | null = null;
  private static BANKING_SERVICE_MAP = new Map<string, BankingApiModule>();

  static getInstance() {
    if (BankingService.bankingService === null) {
      BankingService.bankingService = new BankingService();
    }
    return BankingService.bankingService;
  }

  async getApiService(tenant: string): Promise<BankingApiModule> {
    let bankingService = BankingService.BANKING_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (bankingService === undefined) {
      bankingService = new BankingApiModule({
        CREDENTIALS: "include",
        BASE: process.env.BANKING_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      BankingService.BANKING_SERVICE_MAP.set(tenant, bankingService);
    }

    //Set the token on the banking service
    bankingService.request.config.TOKEN = token;
    return bankingService;
  }
}

export class CrmService implements ApiService {
  private static crmService: CrmService | null = null;
  private static CRM_SERVICE_MAP = new Map<string, CrmApiModule>();

  static getInstance() {
    if (CrmService.crmService === null) {
      CrmService.crmService = new CrmService();
    }
    return CrmService.crmService;
  }

  async getApiService(tenant: string): Promise<CrmApiModule> {
    let crmService = CrmService.CRM_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (crmService === undefined) {
      crmService = new CrmApiModule({
        CREDENTIALS: "include",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        BASE: `${process.env.CRM_SERVICE_URL}/crm`,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      CrmService.CRM_SERVICE_MAP.set(tenant, crmService);
    }

    //Set the token on the banking service
    crmService.request.config.TOKEN = token;
    return crmService;
  }
}

export class CommunicationService implements ApiService {
  private static communicationService: CommunicationService | null = null;
  private static COMMUNICATION_SERVICE_MAP = new Map<string, CommunicationApiModule>();

  static getInstance() {
    if (CommunicationService.communicationService === null) {
      CommunicationService.communicationService = new CommunicationService();
    }
    return CommunicationService.communicationService;
  }

  async getApiService(tenant: string): Promise<CommunicationApiModule> {
    let communicationService = CommunicationService.COMMUNICATION_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (communicationService === undefined) {
      communicationService = new CommunicationApiModule({
        CREDENTIALS: "include",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        BASE: `${process.env.COMMUNICATION_SERVICE_URL}/communication`,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      CommunicationService.COMMUNICATION_SERVICE_MAP.set(tenant, communicationService);
    }

    //Set the token on the banking service
    communicationService.request.config.TOKEN = token;
    return communicationService;
  }
}


export class AccountingService implements ApiService {
  private static accountingService: AccountingService | null = null;
  private static ACCOUNTING_SERVICE_MAP = new Map<
    string,
    AccountingApiModule
  >();

  static getInstance() {
    if (AccountingService.accountingService === null) {
      AccountingService.accountingService = new AccountingService();
    }
    return AccountingService.accountingService;
  }

  async getApiService(tenant: string): Promise<AccountingApiModule> {
    let accountingService =
      AccountingService.ACCOUNTING_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (accountingService === undefined) {
      accountingService = new AccountingApiModule({
        CREDENTIALS: "include",
        BASE: process.env.ACCOUNTING_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      AccountingService.ACCOUNTING_SERVICE_MAP.set(tenant, accountingService);
    }

    //Set the token on the banking service
    accountingService.request.config.TOKEN = token;
    return accountingService;
  }
}

export class InvestingService implements ApiService {
  private static investingService: InvestingService | null = null;
  private static INVESTING_SERVICE_MAP = new Map<string, InvestingApiModule>();

  static getInstance() {
    if (InvestingService.investingService === null) {
      InvestingService.investingService = new InvestingService();
    }
    return InvestingService.investingService;
  }

  async getApiService(tenant: string): Promise<InvestingApiModule> {
    let investingService = InvestingService.INVESTING_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (investingService === undefined) {
      investingService = new InvestingApiModule({
        CREDENTIALS: "include",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        BASE: `${process.env.INVESTING_SERVICE_URL}/investing`,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      InvestingService.INVESTING_SERVICE_MAP.set(tenant, investingService);
    }

    //Set the token on the banking service
    investingService.request.config.TOKEN = token;
    return investingService;
  }
}

export class FundsService implements ApiService {
  private static fundsService: FundsService | null = null;
  private static FUNDS_SERVICE_MAP = new Map<string, FundsApiModule>();

  static getInstance() {
    if (FundsService.fundsService === null) {
      FundsService.fundsService = new FundsService();
    }
    return FundsService.fundsService;
  }

  async getApiService(tenant: string): Promise<FundsApiModule> {
    let fundsService = FundsService.FUNDS_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the funds service if it is not already initialized and cache it
    if (fundsService === undefined) {
      fundsService = new FundsApiModule({
        CREDENTIALS: "include",
        BASE: process.env.FUNDS_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      FundsService.FUNDS_SERVICE_MAP.set(tenant, fundsService);
    }

    //Set the token on the banking service
    fundsService.request.config.TOKEN = token;
    return fundsService;
  }
}

export class TreasuryService implements ApiService {
  private static treasuryService: TreasuryService | null = null;
  private static TREASURY_SERVICE_MAP = new Map<string, TreasuryApiModule>();

  static getInstance() {
    if (TreasuryService.treasuryService === null) {
      TreasuryService.treasuryService = new TreasuryService();
    }
    return TreasuryService.treasuryService;
  }

  async getApiService(tenant: string): Promise<TreasuryApiModule> {
    let treasuryService = TreasuryService.TREASURY_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the funds service if it is not already initialized and cache it
    if (treasuryService === undefined) {
      treasuryService = new TreasuryApiModule({
        CREDENTIALS: "include",
        BASE: process.env.FUNDS_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      TreasuryService.TREASURY_SERVICE_MAP.set(tenant, treasuryService);
    }

    //Set the token on the banking service
    treasuryService.request.config.TOKEN = token;
    return treasuryService;
  }
}

export class PositionService implements ApiService {
  private static positionService: PositionService | null = null;
  private static POSITION_SERVICE_MAP = new Map<string, PositionApiModule>();

  static getInstance() {
    if (PositionService.positionService === null) {
      PositionService.positionService = new PositionService();
    }
    return PositionService.positionService;
  }

  async getApiService(tenant: string): Promise<PositionApiModule> {
    let positionService = PositionService.POSITION_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (positionService === undefined) {
      positionService = new PositionApiModule({
        CREDENTIALS: "include",
        BASE: process.env.POSITION_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      PositionService.POSITION_SERVICE_MAP.set(tenant, positionService);
    }

    //Set the token on the banking service
    positionService.request.config.TOKEN = token;
    return positionService;
  }
}

export class ReportsService implements ApiService {
  private static reportsService: ReportsService | null = null;
  private static REPORTS_SERVICE_MAP = new Map<string, ReportsApiModule>();

  static getInstance() {
    if (ReportsService.reportsService === null) {
      ReportsService.reportsService = new ReportsService();
    }
    return ReportsService.reportsService;
  }

  async getApiService(tenant: string): Promise<ReportsApiModule> {
    let reportsService = ReportsService.REPORTS_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the banking service if it is not already initialized and cache it
    if (reportsService === undefined) {
      reportsService = new ReportsApiModule({
        CREDENTIALS: "include",
        BASE: process.env.REPORTS_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      ReportsService.REPORTS_SERVICE_MAP.set(tenant, reportsService);
    }

    //Set the token on the banking service
    reportsService.request.config.TOKEN = token;
    return reportsService;
  }
}

export class InsuranceService implements ApiService {
  private static insuranceService: InsuranceService | null = null;
  private static INSURANCE_SERVICE_MAP = new Map<string, InsuranceApiModule>();

  static getInstance() {
    if (InsuranceService.insuranceService === null) {
      InsuranceService.insuranceService = new InsuranceService();
    }
    return InsuranceService.insuranceService;
  }

  async getApiService(tenant: string): Promise<InsuranceApiModule> {
    let insuranceService = InsuranceService.INSURANCE_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the service if it is not already initialized and cache it
    if (insuranceService === undefined) {
      insuranceService = new InsuranceApiModule({
        CREDENTIALS: "include",
        BASE: process.env.INSURANCE_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      InsuranceService.INSURANCE_SERVICE_MAP.set(tenant, insuranceService);
    }

    //Set the token on the service
    insuranceService.request.config.TOKEN = token;
    return insuranceService;
  }
}

export class AdministrationService implements ApiService {
  private static administrationService: AdministrationService | null = null;
  private static ADMINISTRATION_SERVICE_MAP = new Map<string, AdministrationApiModule>();

  static getInstance() {
    if (AdministrationService.administrationService === null) {
      AdministrationService.administrationService = new AdministrationService();
    }
    return AdministrationService.administrationService;
  }

  async getApiService(tenant: string): Promise<AdministrationApiModule> {
    let administrationService = AdministrationService.ADMINISTRATION_SERVICE_MAP.get(tenant);
    const token: string | undefined = await TokenService.getInstance().then(
      (service) => {
        return service.getToken(tenant);
      }
    );

    //Initialize the service if it is not already initialized and cache it
    if (administrationService === undefined) {
      administrationService = new AdministrationApiModule({
        CREDENTIALS: "include",
        BASE: process.env.ADMINISTRATION_SERVICE_URL,
        VERSION: "0.0.1",
        WITH_CREDENTIALS: true,
        TOKEN: token,
      });
      AdministrationService.ADMINISTRATION_SERVICE_MAP.set(tenant, administrationService);
    }

    //Set the token on the service
    administrationService.request.config.TOKEN = token;
    return administrationService;
  }
}



export function assert(condition: unknown, msg?: string) {
  if (condition === false) throw new Error(msg);
}
