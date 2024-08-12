import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { AccountingService, assert, BankingService, ReportsService } from "~/utils/service";
import { LedgerListSort, type PageTemplateLedger } from "~/server/api/models/accounting";
import { v4 as uuidv4 } from "uuid";
import {
  type AppMessage,
  type BillerAccountLookupResponse,
  BillerListSort,
  type BillScheduleRequest,
  BranchListSort,
  type Card,
  type CardDisplayView,
  type CardRequest,
  type DepositAccount,
  type DepositAccountRequest,
  DepositProductListSort,
  Direction,
  InstitutionListSort,
  InstitutionSearchSort,
  type LoanAccount,
  type LoanAccountRequest,
  LoanProductListSort,
  type PageTemplateBiller,
  type PageTemplateCardTransaction,
  type PageTemplateDepositProduct,
  type PageTemplateInstitution,
  type PageTemplateLoanProduct,
  type TransactionResponse,
  type TransferAccountLookupResponse,
  TransferDirection,
  type TransferRequest,
  AccountGroupListSort
} from "~/server/api/models/banking";
import { GlSubAccountType } from "~/server/api/models/reports";
import { getApiErrorMessage, getTenant } from "~/server/api/routers/util";
import { AxiosError } from "axios";
import { analyzeError } from "~/utils/analyzeError";

const AccountStatementParamSchema = z.object({
  accountId: z.string(),
  subAccountType: z.enum([
    GlSubAccountType.DEPOSIT,
    GlSubAccountType.LOAN,
    GlSubAccountType.INVEST,
    GlSubAccountType.INSURANCE
  ]),
  startDate: z.string(),
  endDate: z.string(),
  page: z.number(),
  size: z.number().optional(),
  count: z.number().optional()
});

const CardStatementParamSchema = z.object({
  cardId: z.string(),
  order: z.enum(["desc", "asc"]).optional(),
  sort: z.enum(["transactionDate", "updatedAt"]).optional(),
  page: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  size: z.number().optional()
});

const CardPinChangeRequestSchema = z.object({
  tokenId: z.string().uuid(),
  oldPin: z.string().min(4).max(4), //use '0000' for first time
  newPin: z.string().min(4).max(4)
});

const ScheduleRequestSchema = z.object({
  autoApprove: z.boolean().default(true),
  accountId: z.string().uuid(),
  billerId: z.string().uuid(),
  billAccountNo: z.string().min(3).max(20), // eg 089938839933
  startDate: z.string(),
  billAmount: z.number().min(0.01),
  currency: z.string().min(3).max(3),
  paymentFrequency: z.enum(["ONCE", "MONTHLY", "QUARTERLY", "YEARLY"]),
  label: z.string().min(5)
});

const TransferRequestSchema = z.object({
  idempotencyKey: z.string().uuid(),
  institutionCode: z.string().min(3).max(20), // eg 089938839933
  description: z.string().max(255), // eg "Payment for consulting services"
  currency: z.string().min(3).max(3), // eg "USD"
  destinationType: z.enum(["INTERNAL", "EXTERNAL"]),
  srcAccountType: z.enum([
    // "SAVINGS",
    // "CURRENT",
    "DEPOSIT",
    "LOAN",
    "INVESTMENT",
    "INSURANCE"
  ]),
  srcAccountNo: z.string().min(3).max(20),
  srcAccountLabel: z.string().min(3).max(255),
  destAccountNo: z.string().min(3).max(20),
  destAccountLabel: z.string().min(3).max(255),
  institutionId: z.string().min(36).max(36),
  institutionLabel: z.string().min(3).max(255),
  transactionDate: z.string(), //todo validate date
  saveBeneficiary: z.boolean().default(false),
  amount: z.number().min(0.01),
  reference: z.string().min(3).max(255)
});

const DepositAccountRequestSchema = z.object({
  accountLabel: z.string().optional(),
  notes: z.string().nullable().optional(),
  clientId: z.string().uuid(),
  productId: z.string().uuid(),
  branchId: z.string().uuid(),
  accountGroupId: z.string().uuid().nullable().optional(),
  status: z.enum([
    "PENDING",
    "REJECTED",
    "ACTIVE",
    "ARREARS",
    "NO_DEBITS",
    "CLOSED"
  ]),
  overdraftInterestRate: z.number().nullable().optional(),
  overdraftLimit: z.number().nullable().optional(),
  depositInterestRate: z.number().nullable().optional()
});

const CardRequestSchema = z.object({
  label: z.string(),
  currency: z.string(),
  accounts: z.array(z.string()),
  cardType: z.enum(["VIRTUAL", "PHYSICAL"]),
  cardFunding: z.enum(["DEBIT", "CREDIT", "PREPAID"]),
  cardBrand: z.enum(["VISA", "MASTERCARD"]),
  notes: z.string().optional().nullable()
});

const AccountBalanceSchema = z.object({
  accountId: z.string(),
  valueDate: z.date()
});

const LoanRequestSchema = z.object({
  accountLabel: z.string(),
  clientId: z.string(),
  productId: z.string(),
  branchId: z.string(),
  principalAmount: z.number(),
  applicationDate: z.string(),
  tenor: z.number().optional().nullable(),
  paymentDay: z.number().optional().nullable()
});

export type TransferRequestType = z.infer<typeof TransferRequestSchema>;
export type ScheduleRequestType = z.infer<typeof ScheduleRequestSchema>;
export type DepositAccountRequestType = z.infer<
  typeof DepositAccountRequestSchema
>;
export type CardRequestType = z.infer<typeof CardRequestSchema>;
export type LoanRequestType = z.infer<typeof LoanRequestSchema>;
export type CardPinChangeRequestSchema = z.infer<typeof CardPinChangeRequestSchema>;

const LookupBillAccountSchema = z.object({
  billerCode: z.string().min(3).max(20),
  billAccountNo: z.string().min(3).max(20) // eg 089938839933
});

const LookupTransferAccountSchema = z.object({
  type: z.enum(["INTERNAL", "EXTERNAL"]),
  institutionCode: z.string().min(3).max(20),
  destAccountNo: z.string().min(3).max(20) // eg 0000000000
});

export interface accountView {
  accountLabel: string;
  accountNo: string;
  accountType: string;
  active?: boolean;
  availableBalance: number;
  balance: number;
  billPayEnabled?: boolean;
  branchLabel: string;
  cardEnabled?: boolean;
  clientCode: string;
  clientId: string;
  currency: string;
  id: string;
  transferEnabled?: boolean;
  status: string;
  refCode: string;
  productType: string;
}

export interface BillerView {
  code: string;
  commission: number;
  country: string;
  currency: string;
  glAccountCode: string;
  glAccountLabel: string;
  id: string;
  label: string;
  maxDailyAmount: number;
  maxTransAmount: number;
  minTransAmount: number;
  status: string;
  type: string;
}


export const bankingRouter = createTRPCRouter({
  //Generate a statement for a sub account. This can also be used for investment and insurance - todo move
  getDepositAccountStatement: protectedProcedure
    .input(AccountStatementParamSchema)
    .query(async ({ ctx, input: params }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const reportsService = await ReportsService.getInstance().getApiService(
        tenant
      );
      return reportsService.productAccounts
        .generateSubAccountStatement(
          params.accountId,
          params.endDate,
          params.startDate,
          params.subAccountType,
          tenant,
          params.page,
          false,
          params.size ?? 25
        )
        .then((result) => {
          //Get the session and compare the client Id for security
          const clientId = ctx.session?.user.clientId;
          assert(
            clientId !== undefined && clientId !== null,
            "Client Id is not defined in the session"
          );

          //If the client ID does not match the response data thrown an exception
          if (result.clientId !== clientId) {
            throw new Error("Client Id does not match the response data");
          }
          return result;
        });
    }),

  getDepositAccountBalance: protectedProcedure
    .input(AccountBalanceSchema)
    .query(async ({ ctx, input: params }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.depositAccount
        .getDepositAccountBalance(params.accountId, tenant)
        .then((result) => {
          return result;
        });
    }),

  // Retrieve details for a deposit account
  getDepositAccountById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.depositAccount
        .findDepositAccountById(accountId, tenant)
        .then((result) => {
          return result;
        });
    }),

  //Retrieve all banking accounts
  getAccountsForClient: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.position
        .listClientAccounts(clientId, tenant)
        .then((result) => {
          return result.map((acct) => {
            const account: accountView = {
              accountLabel: acct.accountLabel,
              accountNo: acct.accountNo,
              accountType: acct.accountType,
              active: acct.active,
              availableBalance: acct.balance,
              balance: acct.balance,
              billPayEnabled: acct.billPayEnabled,
              branchLabel: acct.branchLabel,
              cardEnabled: acct.cardsEnabled,
              clientCode: acct.clientCode,
              clientId: acct.clientId,
              currency: acct.currency,
              id: acct.id,
              transferEnabled: acct.transfersEnabled,
              status: acct.status,
              refCode: acct.refCode,
              productType: acct.productType
            };
            return account;
          });
        });
    }),

  // Retrieve all deposit accounts for a client
  getDepositAccountsForClient: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const userId = ctx.session?.user.id;

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.depositAccount
        .listClientDepositAccounts(clientId, tenant)
        .then((result: DepositAccount[]) => {
          if (userId !== undefined && userId !== null) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            result.forEach(async (account) => {
              const lv = {
                userId: userId,
                status: account.status,
                type: account.accountType,
                productId: account.productId,
                productCode: account.productCode,
                clientId: account.clientId,
                accountId: account.id,
                accountNo: account.accountNo,
                accountLabel: account.accountLabel
              };
              const oldAccount = await ctx.prisma.account.findUnique({
                where: {
                  accountId_clientId: {
                    accountId: account.id,
                    clientId: account.clientId
                  }
                }
              });
              if (oldAccount === null || oldAccount === undefined) {
                //Create the user
                await ctx.prisma.account.create({
                  data: {
                    ...lv
                  }
                });
              } else {
                //Update the user
                await ctx.prisma.account.update({
                  data: {
                    ...lv
                  },
                  where: {
                    accountId_clientId: {
                      accountId: account.id,
                      clientId: account.clientId
                    }
                  }
                });
              }
            });
            return result;
          } else {
            console.log("Warning !!! - User is undefined"); //todo resolve this
          }
        });
    }),

  // Retrieve all loan accounts for a client
  getLoanAccountsForClient: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const userId = ctx.session?.user.id;

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.loanAccount
        .listClientLoanAccounts(clientId, tenant)
        .then((result: LoanAccount[]) => {
          if (userId !== undefined && userId !== null) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            result.forEach(async (account) => {
              const lv = {
                userId: userId,
                status: account.status,
                type: account.accountType,
                productId: account.productId,
                productCode: account.productCode,
                clientId: account.clientId,
                accountId: account.id,
                accountNo: account.accountNo,
                accountLabel: account.accountLabel,
                balanceTime: account.balanceTime
              };
              const oldAccount = await ctx.prisma.account.findUnique({
                where: {
                  accountId_clientId: {
                    accountId: account.id,
                    clientId: account.clientId
                  }
                }
              });
              if (oldAccount === null || oldAccount === undefined) {
                //Create the user
                await ctx.prisma.account.create({
                  data: {
                    ...lv
                  }
                });
              } else {
                //Update the account
                await ctx.prisma.account.update({
                  data: {
                    ...lv
                  },
                  where: {
                    accountId_clientId: {
                      accountId: account.id,
                      clientId: account.clientId
                    }
                  }
                });
              }
            });
            return result;
          } else {
            console.log("Warning !!! - User is undefined"); //todo resolve this
          }
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  getLoanAccountById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.loanAccount
        .findLoanAccountById(accountId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  // Generate a list of recent transactions for a sub account - Also generic
  getTransactionsForAccount: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const accountService =
        await AccountingService.getInstance().getApiService(tenant);
      return accountService.journal
        .listSubAccountLedgerEntries(
          accountId,
          Direction.DESC,
          LedgerListSort.UPDATED_AT,
          tenant,
          0,
          5
        )
        .then((response: PageTemplateLedger) => {
          return response.content;
        });
    }),

  // Retrieve cards for a given bank account
  getCardsForAccountWithId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.card
        .findCardsForAccountId(accountId, tenant)
        .then((result) => {
          return result;
        });
    }),

  // Retrieve transactions for a card
  getTransactionsForCard: protectedProcedure
    .input(CardStatementParamSchema)
    .query(async ({ ctx, input: params }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.cardTransaction
        .listCardTransactionForCard(
          params.cardId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          params.order ?? "desc",
          params.sort ?? "transactionDate",
          params.page ?? 0,
          params.size ?? 10,
          tenant
        )
        .then((response: PageTemplateCardTransaction) => {
          return response;
        });
    }),

  // Retrieve card details including the unmasked PAN - TODO encrypt the response
  getCardForDisplayByTokenId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: tokenId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.card
        .findForDisplayByTokenId(tokenId, tenant)
        .then((cdv: CardDisplayView) => {
          return cdv;
        });
    }),

  // Block a card by id
  // blockCardById: protectedProcedure
  //   .input(z.string())
  //   .query(async ({ ctx, input: cardId }) => {
  //     //Get the tenant from the session
  //     const tenant = getTenant(ctx);
  //     const bankingService = await BankingService.getInstance().getApiService(
  //       tenant
  //     );
  //     return bankingService.card
  //       .blockCardById(cardId, tenant)
  //       .then((card: Card) => {
  //         return card;
  //       });
  //   }),

  blockCardById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: cardId }) => {
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.card
        .blockCardById(cardId, tenant)
        .then((cdv: Card) => {
          // console.log(cdv);

          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  // Unblock a card by id
  // unblockCardById: protectedProcedure
  //   .input(z.string())
  //   .query(async ({ ctx, input: cardId }) => {
  //     //Get the tenant from the session
  //     const tenant = getTenant(ctx);
  //     const bankingService = await BankingService.getInstance().getApiService(
  //       tenant
  //     );
  //     return bankingService.card
  //       .unblockCardById(cardId, tenant)
  //       .then((card: Card) => {
  //         return card;
  //       });
  //   }),

  unblockCardById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: cardId }) => {
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.card
        .unblockCardById(cardId, tenant)
        .then((cdv: Card) => {
          // console.log(cdv);

          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  //Retrieve bank account groups
  getAccountGroups: protectedProcedure
    .query(async ({ ctx }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.accountGroup.listAccountGroup(Direction.ASC, AccountGroupListSort.TYPE, tenant, 0, 10)
        .then((result) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  //Retrieve bank account groups
  deleteLoanAccountById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.loanAccount.deleteLoanAccount(accountId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  //Retrieve bank account groups
  blockLoanAccountById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of accounts for the client
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.loanAccount.closeLoanAccountById(accountId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  // Retrieve active financial institutions
  getActiveFinancialInstitutions: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);
    const bankingService = await BankingService.getInstance().getApiService(
      tenant
    );
    return bankingService.institution
      .listInstitution(Direction.ASC, InstitutionListSort.LABEL, tenant, 0, 1000)
      .then((cdv: PageTemplateInstitution) => {
        return cdv;
      });
  }),

  // Search for active financial institutions
  searchActiveFinancialInstitutions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: pattern }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.institution
        .searchInstitution(
          Direction.ASC,
          InstitutionSearchSort.LABEL_SORT,
          tenant,
          0,
          pattern,
          100
        )
        .then((cdv: PageTemplateInstitution) => {
          return cdv;
        });
    }),

  // Retrieve active billers
  getActiveBillers: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);
    const bankingService = await BankingService.getInstance().getApiService(
      tenant
    );
    return bankingService.biller
      .listBiller(Direction.ASC, BillerListSort.LABEL, tenant, 0, 100)
      .then((cdv: PageTemplateBiller) => {
        return cdv.content.map((biller) => {
          const billers: BillerView = {
            code: biller.code,
            commission: biller.commission,
            country: biller.country,
            currency: biller.currency,
            glAccountCode: biller.glAccountCode,
            glAccountLabel: biller.glAccountLabel,
            id: biller.id,
            label: biller.label,
            maxDailyAmount: biller.maxDailyAmount,
            maxTransAmount: biller.maxTransAmount,
            minTransAmount: biller.minTransAmount,
            status: biller.status,
            type: biller.type
          };
          return billers;
        });
      });
  }),

  // Retrieve biller account details
  lookupBillAccount: protectedProcedure
    .input(LookupBillAccountSchema)
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.billSchedule
        .lookupBillerAccount(
          tenant,
          {
            billerAccountNo: request.billAccountNo,
            billerCode: request.billerCode
          }
        )
        .then((response: BillerAccountLookupResponse) => {
          return response;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
          // console.log(details as string);
        });
    }),

  // Retrieve biller account details
  lookupTransferAccount: protectedProcedure
    .input(LookupTransferAccountSchema)
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      return bankingService.transfer
        .lookupTransferAccount(
          tenant,
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            type: request.type,
            destAccountNo: request.destAccountNo,
            institutionCode: request.institutionCode
          }
        )
        .then((response: TransferAccountLookupResponse) => {
          return response;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  // Retrieve transfer beneficiaries for a user
  getTransferBeneficiariesByUserId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: userId }) => {
      return ctx.prisma.beneficiary.findMany({
        where: {
          userId: userId
        },
        orderBy: {
          destAccountLabel: "asc"
        }
      });
    }),

  // Retrieve the recent transfers for a user
  getRecentTransfersByUserId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: userId }) => {
      return await ctx.prisma.transfer.findMany({
        take: 6,
        where: {
          userId: userId
        },
        orderBy: {
          transactionDate: "desc"
        }
      });
    }),

  // Submit a bill payment request. This will return a bill payment response and if the payment frequency is once off, the payment will be processed immediately
  // TODO we should add the idempotency key to the database before we submit the request to ensure that we don't process the same request twice
  // On second thought this idempotency key should be generated by the client and passed in
  addBillSchedule: protectedProcedure
    .input(ScheduleRequestSchema)
    .mutation(async ({ ctx, input: scheduleRequest }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const idempotencyKey = uuidv4();
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.billSchedule
        .addBillSchedule(
          tenant,
          scheduleRequest as BillScheduleRequest,
          idempotencyKey
        )
        .then((cdv) => {
          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  // Retrieve the deposit products - todo deal with loan products

  addTransfer: protectedProcedure
    .input(TransferRequestSchema)
    .mutation(async ({ ctx, input: transferRequest }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const userId = ctx.session?.user.id;
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );

      //If the description is empty then we will just use a standard description - 'WEB TRANSFER'
      if (transferRequest.description.trim() === "") {
        transferRequest.description = "WEB TRANSFER";
      }

      // Save the request to the database before we submit it to the banking service
      const transfer = await ctx.prisma.transfer.create({
        data: {
          idempotencyKey: transferRequest.idempotencyKey,
          userId: userId,
          status: "IN_PROGRESS",
          destAccountLabel: transferRequest.destAccountLabel,
          destAccountNo: transferRequest.destAccountNo,
          institutionId: transferRequest.institutionId,
          institutionLabel: transferRequest.institutionLabel,
          institutionCode: transferRequest.institutionCode,
          amount: transferRequest.amount,
          currency: transferRequest.currency,
          description: transferRequest.description,
          transactionDate: transferRequest.transactionDate,
          destinationType: transferRequest.destinationType,
          srcAccountNo: transferRequest.srcAccountNo,
          srcAccountLabel: transferRequest.srcAccountLabel,
          srcAccountType: transferRequest.srcAccountType,
          reference: transferRequest.reference
        }
      });

      // Save the beneficiary if it is a new one or update the label if it is an existing one
      if (transferRequest.saveBeneficiary) {
        await ctx.prisma.beneficiary.upsert({
          update: {
            userId: userId,
            destAccountLabel: transferRequest.destAccountLabel
          },
          where: {
            userId_institutionId_destAccountNo: {
              userId: userId,
              institutionId: transferRequest.institutionId,
              destAccountNo: transferRequest.destAccountNo
            }
          },
          create: {
            userId: userId,
            destinationType: transferRequest.destinationType,
            destAccountNo: transferRequest.destAccountNo,
            destAccountLabel: transferRequest.destAccountLabel,
            currency: transferRequest.currency,
            institutionId: transferRequest.institutionId,
            institutionLabel: transferRequest.institutionLabel,
            institutionCode: transferRequest.institutionCode
          }
        });
      }

      // Remove the properties not supported by the API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        institutionId,
        institutionLabel,
        saveBeneficiary,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        srcAccountType,
        idempotencyKey,
        ...serverProps
      } = transferRequest;

      // Build the final request
      const request = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: transferRequest.destinationType as any,
        direction: TransferDirection.OUTBOUND,
        date: transferRequest.transactionDate,
        ...serverProps
      } as TransferRequest;

      return bankingService.transfer
        .addAndPostSelfServiceTransfer(tenant, request, idempotencyKey)
        .then((cdv) => {
          ctx.prisma.transfer
            .update({
              where: {
                id: transfer.id
              },
              data: {
                status: cdv.status,
                reference: cdv.reference
              }
            })
            .catch((error: any) => {
              console.error(
                "Failed to update the status of the transfer",
                error
              );
              throw new Error("Failed to update the status of the transfer");
            });

          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          // console.log(details as string)
          throw new Error(details);
        });
    }),

  getDepositProducts: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);
    const bankingService = await BankingService.getInstance().getApiService(
      tenant
    );
    return bankingService.depositProduct
      .listDepositProduct(Direction.ASC, DepositProductListSort.LABEL, tenant, 0, 100)
      .then((cdv: PageTemplateDepositProduct) => {
        return cdv;
      });
  }),

  addDepositAccount: protectedProcedure
    .input(DepositAccountRequestSchema)
    .mutation(async ({ ctx, input: depositAccountRequest }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.depositAccount
        .addDepositAccount(
          tenant,
          depositAccountRequest as DepositAccountRequest
        )
        .then((cdv) => {
          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details);
        });
    }),

  changeCardPin: protectedProcedure
    .input(CardPinChangeRequestSchema)
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.card
        .changeCardPinByTokenId(
          request.tokenId,
          tenant,
          {
            oldPin: request.oldPin,
            newPin: request.newPin
          }
        )
        .then((response: TransactionResponse) => {
          return response;
        });
      // return bankingService.card.changeCardPinByTokenId(changeCardPinRequest as CardPinRequest)
    }),

  getLoanProducts: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);
    const bankingService = await BankingService.getInstance().getApiService(
      tenant
    );
    return bankingService.loanProduct
      .listLoanProduct(Direction.ASC, LoanProductListSort.LABEL, tenant, 0, 100)
      .then((cdv: PageTemplateLoanProduct) => {
        return cdv;
      });
  }),

  addLoanApplication: protectedProcedure
    .input(LoanRequestSchema)
    .mutation(async ({ ctx, input: loanRequest }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      console.log(loanRequest);
      console.log(loanRequest);
      return bankingService.loanAccount
        .addLoanAccount(tenant, loanRequest as LoanAccountRequest)
        .then((cdv: LoanAccount) => {
          return cdv;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          // throw new Error(details as string);
          console.log(details);
        });
    }),

  addCard: protectedProcedure
    .input(CardRequestSchema)
    .mutation(async ({ ctx, input: cardRequest }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const bankingService = await BankingService.getInstance().getApiService(
        tenant
      );
      return bankingService.card
        .addCard(tenant, cardRequest as CardRequest)
        .then((cdv) => {
          return {
            responseStatus: "SUCCESS",
            success: true,
            message: "Your card was created successfully.",
            ...cdv
          };
          // return cdv;
        })
        .catch((error) => {
          console.error("Request failed", error);

          let msg = "Failed to process create the card";
          if (error instanceof AxiosError) {
            const e = getApiErrorMessage(error);
            msg = `${e.summary} - ${e?.details ?? ""}`;
          }

          return {
            success: false,
            code: null,
            responseCode: "99",
            responseMessage: msg,
            message: "Your request failed."
          };
        });
    }),

  getBranches: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);
    const bankingService = await BankingService.getInstance().getApiService(
      tenant
    );
    return bankingService.branch
      .listBranch(Direction.ASC, BranchListSort.LABEL, tenant, 0, 100)
      .then((cdv) => {
        return cdv;
      });
  })
});
