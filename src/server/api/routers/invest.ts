import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AdministrationService, InvestingService } from "~/utils/service";
import {
  type ApiError,
  type AppMessage,
  CashTransactionRequest,
  FixedDepositTransaction,
  FixedDepositTransactionRequest,
  FundTransaction,
  FundTransactionRequest,
  type InvestmentAccount,
  MoneyMarketProduct,
  MoneyMarketTransaction,
  MoneyMarketTransactionRequest,
  Order,
  OrderRequest,
  PageTemplateFixedDepositProduct,
  PageTemplateFixedDepositTransaction,
  type PageTemplateFundTransaction,
  type PageTemplateInvestmentProduct,
  PageTemplateMoneyMarketProduct
} from "../models/investing";
import { analyzeError } from "~/utils/analyzeError";
import { getTenant } from "./util";
import { orderRouter, type OrdersView } from "./order";
import { type AxiosError } from "axios";
import { convertDate } from "~/utils/format";

const postFundTransactionRequestSchema = z.object({
  accountId: z.string().uuid(),
  orderType: z.nativeEnum(FundTransactionRequest.orderType),
  marketCode: z.string(),
  secId: z.string(),
  requestedQty: z.number().optional(),
  requestedVal: z.number().optional(),
  price: z.number().optional(),
  requestDate: z.string(),
  currency: z.string(),
  notes: z.string().optional(),
  autoApprove: z.boolean()
});

const postCashTransactionRequestSchema = z.object({
  accountId: z.string().uuid(),
  valueDate: z.string(),
  currency: z.string(),
  notes: z.string().optional(),
  autoApprove: z.boolean(),
  branchId: z.string().uuid(),
  destAccountId: z.string().uuid().optional(),
  destAccountType: z
    .nativeEnum(CashTransactionRequest.destAccountType)
    .optional(),
  channel: z.nativeEnum(CashTransactionRequest.channel),
  type: z.nativeEnum(CashTransactionRequest.type),
  amount: z.number(),
  reference: z.string()
});

const filterOptions = z.object({
  accountId: z.string().uuid(),
  orderNo: z.string().optional(),
  secId: z.string().optional(),
  orderStatus: z
    .nativeEnum({ ...Order.orderStatus, ...FundTransaction.orderStatus })
    .optional(),
  orderType: z
    .nativeEnum({ ...FundTransactionRequest.orderType, ...OrderRequest.side })
    .optional(),
  assetType: z
    .nativeEnum({ ...OrderRequest.assetType, ...FundTransaction.fundType })
    .optional(),
  date: z
    .object({
      startDate: z.string(),
      endDate: z.string()
    })
    .nullable()
    .optional(),
  page: z.number()
});

const updateFundTransactionRequestSchema = postFundTransactionRequestSchema
  .partial()
  .extend({
    accountId: postFundTransactionRequestSchema.shape.accountId,
    marketCode: postFundTransactionRequestSchema.shape.marketCode,
    secId: postFundTransactionRequestSchema.shape.secId,
    requestedQty: postFundTransactionRequestSchema.shape.requestedQty,
    currency: postFundTransactionRequestSchema.shape.currency,
    autoApprove: postFundTransactionRequestSchema.shape.autoApprove,
    orderType: postFundTransactionRequestSchema.shape.orderType,
    requestDate: postFundTransactionRequestSchema.shape.requestDate
  });

interface accountView {
  accountLabel: string;
  accountNo: string;
  id: string;
  currency: string;
  status: InvestmentAccount.status;
  accountUsage: InvestmentAccount.accountUsage;
  refCode: string;
  cashBalance: number;
  mgmtType: InvestmentAccount.mgmtType;
}

export interface FundTransactionView {
  orderType: FundTransaction.orderType;
  requestedVal: number;
  requestedQty: number;
  price: number;
  accountId: string;
  marketCode: string;
  secId: string;
  currency: string;
  notes?: string;
  requestDate: string;
  orderNo: string;
  createdAt: string;
  orderDesc: string;
  orderStatus?: FundTransaction.orderStatus;
  id: string;
  fundType?: FundTransaction.fundType;
}

interface PortfolioHighlight {
  portfolioIndex: string,
  percentProfit: string,
  totalInvestedAmount: string,
  currentValue: string,
  ROI: string
}

const moneyMarketTransactionRequestSchema = z.object({
  accountId: z.string(),
  productId: z.string(),
  notes: z.string().optional(),
  currency: z.string(),
  faceValue: z.number(),
  startDate: z.string(),
  tenor: z.number().optional(),
  discountRate: z.number().optional(),
  refCode: z.string().optional(),
  positionTransferDate: z.string().optional(),
  interestType: z.nativeEnum(MoneyMarketTransactionRequest.interestType).optional()
});

const fixedDepositTransactionRequest = z.object({
  rolloverRule: z.nativeEnum(FixedDepositTransactionRequest.rolloverRule),
  accountId: z.string(),
  productId: z.string(),
  notes: z.string().optional(),
  currency: z.string(),
  principal: z.number(),
  startDate: z.string(),
  tenor: z.number(),
  interestRate: z.number().optional(),
  refCode: z.string().optional(),
  positionTransferDate: z.string().optional()
});

const moneyMarketTransactionRequest = z.object({
  accountId: z.string(),
  productId: z.string(),
  notes: z.string().optional(),
  currency: z.string(),
  faceValue: z.number(),
  startDate: z.string(),
  tenor: z.number().optional(),
  discountRate: z.number().optional(),
  refCode: z.string().optional(),
  positionTransferDate: z.string().optional(),
  interestType: z.nativeEnum(MoneyMarketTransactionRequest.interestType).optional()
});

function filterByDateRange(
  filteredArray: (FundTransactionView | OrdersView)[],
  startDate: Date,
  endDate: Date
):
| (FundTransactionView | OrdersView)[] {
  return filteredArray.filter((obj) => {
    const objDate = new Date(convertDate(obj.createdAt));
    return (
      objDate.setHours(0, 0, 0, 0) >= startDate.setHours(0, 0, 0, 0) &&
      objDate <= endDate
    );
  });
}

function paginate(array: (FundTransactionView | OrdersView)[], pageNumber: number = 1, pageSize: number = 10) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export const investRouter = createTRPCRouter({
  // Retrieve the api key for the market data
  getMdsApiKeyForTenant: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: tenantId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the market data api key
      const adminService =
        await AdministrationService.getInstance().getApiService(tenant);

      return adminService.tenant.findTenantMarketDataApiKey(tenantId, tenant)
        .then((response ) => {
          return response.apiKey;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Retrieve all loan accounts for a client
  getAccountsForClient: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);
      //const _userId = ctx.session?.user.id;

      //Return the list of accounts for the client
      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.investmentAccount
        .listInvestmentAccountsForClient(clientId, tenant)
        .then((result: InvestmentAccount[]) => {
          return result.map((result) => {
            const account: accountView = {
              accountLabel: result.accountLabel,
              id: result.id,
              accountNo: result.accountNo,
              currency: result.currency,
              status: result.status,
              accountUsage: result.accountUsage,
              refCode: result.refCode,
              cashBalance: result.cashBalance,
              mgmtType: result.mgmtType
            };
            return account as InvestmentAccount;
          });
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Generate a list of investment products - Also generic
  getInvestmentProducts: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    const investingService = await InvestingService.getInstance().getApiService(
      tenant
    );

    return investingService.investmentProduct
      .listInvestmentProduct(tenant, 0, 5, "code", "asc")
      .then((result: PageTemplateInvestmentProduct) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),

  // Generate a list of recent fund transactions for a sub account - Also generic
  listAccountFundTransaction: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(10)
      })
    )
    .query(async ({ ctx, input: { accountId, page, size } }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .listAccountFundTransactions(
          accountId,
          tenant,
          page,
          size,
          "clientId",
          "asc"
        )
        .then((result: PageTemplateFundTransaction) => {
          return result.content?.map((result) => {
            const fund: FundTransactionView = {
              orderType: result.orderType,
              orderNo: result.orderNo,
              orderDesc: result.orderDesc,
              orderStatus: result.orderStatus,
              marketCode: result.marketCode,
              secId: result.secId,
              currency: result.currency,
              requestedQty: result.requestedQty,
              requestDate: result.requestDate,
              requestedVal: result.requestedVal,
              notes: result.notes,
              price: result.price,
              createdAt: result.createdAt,
              accountId: result.accountId,
              id: result.id,
              fundType: result.fundType
            };
            return fund;
          });
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  //Generate a list of recent orders and fund transaction for a sub-account
  listAccountOrdersAndFundTransactions: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(20)
      })
    )
    .query(
      async ({
               ctx,
               input: { accountId, page, size }
             }): Promise<(FundTransactionView | OrdersView)[]> => {
        try {
          const investCaller = investRouter.createCaller(ctx);
          const orderCaller = orderRouter.createCaller(ctx);
          // Execute both procedures concurrently using Promise.all
          const [result1, result2] = await Promise.all([
            investCaller.listAccountFundTransaction({ accountId, page, size }),
            orderCaller.listAccountOrders({ accountId, page, size })
          ]);

          // Merge the results into a single array
          return paginate([...(result1 || []), ...(result2 || [])].sort(
            (b, a) => convertDate(a.createdAt) - convertDate(b.createdAt)
          ));
        } catch (error) {
          // Handle errors appropriately
          const { details } = analyzeError(
            error as ApiError | AxiosError<unknown>
          ) as AppMessage;
          throw new Error(details as string);
        }
      }
    ),

  //Generate a list of recent orders and fund transaction for a sub-account
  listAllAccountOrdersAndFundTransactions: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(20)
      })
    )
    .query(
      async ({
               ctx,
               input: { accountId, page, size }
             }): Promise<(FundTransactionView | OrdersView)[]> => {
        try {
          const investCaller = investRouter.createCaller(ctx);
          const orderCaller = orderRouter.createCaller(ctx);
          // Execute both procedures concurrently using Promise.all
          const [result1, result2] = await Promise.all([
            investCaller.listAccountFundTransaction({ accountId, page, size }),
            orderCaller.listAccountOrders({ accountId, page, size })
          ]);

          // Merge the results into a single array
          return [...(result1 || []), ...(result2 || [])].sort(
            (b, a) => convertDate(a.createdAt) - convertDate(b.createdAt)
          );
        } catch (error) {
          // Handle errors appropriately
          const { details } = analyzeError(
            error as ApiError | AxiosError<unknown>
          ) as AppMessage;
          throw new Error(details as string);
        }
      }
    ),

  filterOrdersAndFundTransactions: protectedProcedure
    .input(filterOptions)
    .query(
      async ({ ctx, input }): Promise<(FundTransactionView | OrdersView)[]> => {
        try {
          const investCaller = investRouter.createCaller(ctx);
          const optionsWithoutAccountId = filterOptions.omit({
            accountId: true
          });
          return investCaller
            .listAllAccountOrdersAndFundTransactions({
              accountId: input.accountId
            })
            .then((result) => {
              const filteredResult = result.filter((item) => {
                // Check if the item satisfies all optional filters
                return Object.entries(
                  optionsWithoutAccountId.parse(input)
                ).every(([key, value]) => {
                  // Skip filtering if the optional field is not present in the item
                  if (value == undefined || key == "date" || key == "page") {
                    return true;
                  } else if (key == "orderType") {
                    //@ts-ignore
                    return item[key] === value || item["side"] == value;
                  } else if (key == "assetType") {
                    //@ts-ignore
                    return item[key] == value || item["fundType"] == value;
                  } else if (!(key in item)) {
                    return false;
                  }

                  //@ts-ignore
                  return item[key] === value.toString().toUpperCase();
                });
              });

              if (input.date) {
                const { startDate, endDate } = input.date;
                return paginate(filterByDateRange(
                  filteredResult,
                  new Date(startDate),
                  new Date(endDate)
                ), input.page > 0 ? input.page : 1);
              } else {
                return paginate(filteredResult, input.page > 0 ? input.page : 1);
              }
            });
        } catch (error) {
          // Handle errors appropriately
          const { details } = analyzeError(
            error as ApiError | AxiosError<unknown, any>
          ) as AppMessage;
          throw new Error(details as string);
        }
      }
    ),

  // Add a new fund transaction for a sub account - Also generic
  addFundTransaction: protectedProcedure
    .input(
      z.object({
        requestBody: postFundTransactionRequestSchema,
        xIdemKey: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);
      const { requestBody, xIdemKey } = request;

      return investingService.fundTransaction
        .addFundTransaction(tenant, requestBody, xIdemKey)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new cash transaction for an account - Also generic
  addCashTransaction: protectedProcedure
    .input(
      z.object({
        requestBody: postCashTransactionRequestSchema,
        xIndempotencyKey: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);
      const { requestBody, xIndempotencyKey } = request;

      return investingService.cashTransaction
        .addCashTransaction(tenant, requestBody, xIndempotencyKey)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Edit an orders for a sub account - Also generic
  updateFundTransactionById: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        requestBody: updateFundTransactionRequestSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const { orderId, requestBody } = input;

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .updateFundTransaction(orderId, tenant, requestBody)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Cancel a fund transaction for a sub account - Also generic
  cancelFundTransactionById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: transactionId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .cancelFundTransactionById(transactionId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  //Delete an fund transaction for a sub account - Also generic
  deleteFundTransactionById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .deleteFundTransaction(orderId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  //Reverse a fund transaction for a sub account - Also generic
  reverseFundTransactionById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .reverseApprovedFundTransactionById(orderId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  //Approve a fund transaction for a sub account - Also generic
  approveFundTransactionById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .approveFundTransactionById(orderId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  //Approve a fund transaction for a sub account - Also generic
  findFundTransactionById: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.fundTransaction
        .findFundTransactionById(orderId, tenant)
        .then((result) => {
          const fund: FundTransactionView = {
            orderType: result.orderType,
            orderNo: result.orderNo,
            orderDesc: result.orderDesc,
            orderStatus: result.orderStatus,
            marketCode: result.marketCode,
            secId: result.secId,
            currency: result.currency,
            requestedQty: result.requestedQty,
            requestDate: result.requestDate,
            requestedVal: result.requestedVal,
            notes: result.notes,
            price: result.price,
            createdAt: result.createdAt,
            accountId: result.accountId,
            id: result.id,
            fundType: result.fundType
          };
          return fund as FundTransaction;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Generate a list of fixed deposit investment products - Also generic
  listFixedDepositProducts: protectedProcedure
    .query(async ({ ctx }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(
        tenant
      );

      return investingService.fixedDepositProduct.listFixedDepositProduct(tenant, 0, 10, "code", "asc")
        .then((result: PageTemplateFixedDepositProduct) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  addFixedDepositInvestment: protectedProcedure
    .input(fixedDepositTransactionRequest)
    .mutation(async ({ ctx, input: requestBody }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.addFixedDepositTransaction(tenant, requestBody)
        .then((result: FixedDepositTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  updateFixedDepositInvestment: protectedProcedure
    .input(z.object({
      requestBody: fixedDepositTransactionRequest,
      transactionId: z.string()
    }))
    .mutation(async ({ ctx, input: { requestBody, transactionId } }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.updateFixedDepositTransaction(transactionId, tenant, requestBody)
        .then((result: FixedDepositTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  updateMoneyMarketTransaction: protectedProcedure
    .input(z.object({
      requestBody: moneyMarketTransactionRequestSchema,
      transactionId: z.string()
    }))
    .mutation(async ({ ctx, input: { requestBody, transactionId } }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.moneyMarketTransaction.updateMoneyMarketTransaction(transactionId, tenant, requestBody)
        .then((result: MoneyMarketTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  terminateFixedDepositInvestment: protectedProcedure
    .input(z.object({
      terminationDate: z.string(),
      transactionId: z.string()
    }))
    .mutation(async ({ ctx, input: { terminationDate, transactionId } }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.terminateFixedDepositTransactionById(transactionId, terminationDate, tenant)
        .then((result: FixedDepositTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  findFixedDepositTransactionById: protectedProcedure
    .input(z.object({
      transactionId: z.string()
    }))
    .query(async ({ ctx, input: { transactionId } }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.findFixedDepositTransactionById(transactionId, tenant)
        .then((result: FixedDepositTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listAccountFixedDepositTransactions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.listAccountFixedDepositTransactions(accountId, tenant, 0, 10, "orderNo")
        .then((result: PageTemplateFixedDepositTransaction) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listClientFixedDepositTransactions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.fixedDepositTransaction.listClientFixedDepositTransactions(clientId, tenant, 0, 10, "orderNo")
        .then((result: PageTemplateFixedDepositTransaction) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listAccountMoneyMarketTransactions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.moneyMarketTransaction.listAccountMoneyMarketTransactions(accountId, tenant, 0, 10, "orderNo")
        .then((result) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),


  listClientMoneyMarketTransactions: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.moneyMarketTransaction.listClientMoneyMarketTransactions(clientId, tenant, 0, 10, "orderNo")
        .then((result) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Generate a list of money market products - Also generic
  listMoneyMarketProducts: protectedProcedure
    .query(async ({ ctx }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(
        tenant
      );

      return investingService.moneyMarketProduct.listMoneyMarketProduct(tenant, 0, 10, "code", "asc")
        .then((result: PageTemplateMoneyMarketProduct) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Get a money market product by its Id - Also generic
  getMoneyMarketProductById: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input: { productId } }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(
        tenant
      );

      return investingService.moneyMarketProduct.findMoneyMarketProductById(productId, tenant)
        .then((result: MoneyMarketProduct) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  findMoneyMarketTransactionById: protectedProcedure
    .input(z.object({
      transactionId: z.string()
    }))
    .query(async ({ ctx, input: { transactionId } }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.moneyMarketTransaction.findMoneyMarketTransactionById(transactionId, tenant)
        .then((result: MoneyMarketTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  addMoneyMarketInvestment: protectedProcedure
    .input(moneyMarketTransactionRequest)
    .mutation(async ({ ctx, input: requestBody }) => {
      //Get the tenant from session
      const tenant = getTenant(ctx);

      const investingService = await InvestingService.getInstance().getApiService(tenant);

      return investingService.moneyMarketTransaction.addMoneyMarketTransaction(tenant, requestBody)
        .then((result: MoneyMarketTransaction) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),


  // Generate a list of investment products - Also generic
  getClientValuationDetails: protectedProcedure.query(async ({ ctx }) => {
      //Get the tenant from the session
      // const tenant = getTenant(ctx);
      //
      // const investingService = await InvestingService.getInstance().getApiService(
      //   tenant
      // );

      const response: any = {
        netAssetCost: {
          value: 17663,
          percentChange: 2,
          series: [
            {
              name: "NAC",
              data: [73, 22, 43, 12, 33, 44, 32, 42, 53, 62, 53, 84]
            }
          ]
        },
        netAssetValue: {
          value: 54663,
          percentChange: 4,
          series: [
            {
              name: "NAV",
              data: [53, 32, 33, 52, 13, 44, 32, 42, 43, 52, 53, 64]
            }
          ]
        },
        valuation: {
          series: [76, 67, 61, 90]
        },
        portfolioCompare: {
          series: [
            {
              name: "Portfolio Size",
              data: [10, 41, 35, 51, 49]
            }
          ]
        },
        profit: {
          overallInvested: {
            value: 17854, percentChange: 2
          }, average: {
            value: 60, percentChange: 2
          }, overallProfit: {
            value: 3858, percentChange: 3
          }

        }
      };

      return response;
    }
  ),
  getPortfolioHighlight: protectedProcedure.query(async ({ ctx }) => {
      //Get the tenant from the session
      // const tenant = getTenant(ctx);
      //
      // const investingService = await InvestingService.getInstance().getApiService(
      //   tenant
      // );

      const response: PortfolioHighlight = {
        portfolioIndex: "51412.03",
        percentProfit: "1.41",
        totalInvestedAmount: "5663.00",
        currentValue: "10632.02",
        ROI: "+20.3"
      };

      return response;
    }
  )
});
