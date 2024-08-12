import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { InvestingService } from "~/utils/service";
import {
  type AppMessage,
  type Order,
  OrderRequest,
  type PageTemplateOrder,
} from "../models/investing";
import { analyzeError } from "~/utils/analyzeError";
import { getTenant } from "./util";

const OrderRequestSchema = z.object({
  accountId: z.string(),
  side: z.nativeEnum(OrderRequest.side),
  tif: z.nativeEnum(OrderRequest.tif),
  marketCode: z.string(),
  secId: z.string(),
  requestedQty: z.number(),
  limitPrice: z.number().optional(),
  currency: z.string(),
  numberOfLegs: z.number().default(1),
  assetType: z.nativeEnum(OrderRequest.assetType),
  orderStrategy: z.nativeEnum(OrderRequest.orderStrategy).optional(),
  expires: z.string().optional(),
  notes: z.string().optional(),
  autoApprove: z.boolean(),
  allOrNone: z.boolean(),
});

const UpdateOrderRequestSchema = OrderRequestSchema.partial().extend({
  accountId: OrderRequestSchema.shape.accountId,
  side: OrderRequestSchema.shape.side,
  tif: OrderRequestSchema.shape.tif,
  marketCode: OrderRequestSchema.shape.marketCode,
  secId: OrderRequestSchema.shape.secId,
  requestedQty: OrderRequestSchema.shape.requestedQty,
  currency: OrderRequestSchema.shape.currency,
  numberOfLegs: OrderRequestSchema.shape.numberOfLegs,
  assetType: OrderRequestSchema.shape.assetType,
  autoApprove: OrderRequestSchema.shape.autoApprove,
  limitPrice: OrderRequestSchema.shape.limitPrice.optional(),
  orderStrategy: OrderRequestSchema.shape.orderStrategy.optional(),
  expires: OrderRequestSchema.shape.expires.optional(),
  notes: OrderRequestSchema.shape.notes.optional(),
  allOrNone: OrderRequestSchema.shape.allOrNone,
});

export interface OrdersView {
  side: OrderRequest.side;
  limitPrice?: number;
  requestedQty: number;
  tif: OrderRequest.tif;
  accountId: string;
  marketCode: string;
  secId: string;
  currency: string;
  assetType: OrderRequest.assetType;
  numberOfLegs: number;
  notes?: string;
  orderStrategy?: OrderRequest.orderStrategy;
  expires: string;
  createdAt: string;
  orderDesc: string;
  orderNo: string;
  orderStatus?: Order.orderStatus;
  id: string;
}

export const orderRouter = createTRPCRouter({
  // Generate a list of recent orders for a sub account - Also generic
  listOrders: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    const investingService = await InvestingService.getInstance().getApiService(
      tenant
    );

    return investingService.order
      .listOrder(tenant, 0, 5, "clientId", "asc")
      .then((result: PageTemplateOrder) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),

  // Generate a list of recent orders for a sub account - Also generic
  listClientOrders: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input: clientId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .listAccountOrders(clientId, tenant, 0, 5, "clientId", "asc")
        .then((result: PageTemplateOrder) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Generate a list of recent orders for a sub account - Also generic
  listAccountOrders: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { accountId, page, size } = input;

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .listClientOrders(accountId, tenant, page, size, "clientId", "desc")
        .then((result: PageTemplateOrder) => {
          return result.content?.map((result) => {
            const orders: OrdersView = {
              side: result.side,
              limitPrice: result.limitPrice,
              requestedQty: result.requestedQty,
              tif: result.tif,
              accountId: result.accountId,
              marketCode: result.marketCode,
              secId: result.secId,
              currency: result.currency,
              assetType: result.assetType,
              numberOfLegs: result.numberOfLegs,
              notes: result.notes,
              orderStrategy: result.orderStrategy,
              expires: result.expires,
              createdAt: result.createdAt,
              orderDesc: result.orderDesc,
              orderNo: result.orderNo,
              orderStatus: result.orderStatus,
              id: result.id,
            };
            return orders;
          });
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listAccountEquityOrders: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { accountId, page, size } = input;

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .listClientOrders(accountId, tenant, page, size, "clientId", "desc")
        .then((result: PageTemplateOrder) => {
          return result.content?.filter(result => (result.assetType == OrderRequest.assetType.EQUITY)).map((result) => {
            const orders: OrdersView = {
              side: result.side,
              limitPrice: result.limitPrice,
              requestedQty: result.requestedQty,
              tif: result.tif,
              accountId: result.accountId,
              marketCode: result.marketCode,
              secId: result.secId,
              currency: result.currency,
              assetType: result.assetType,
              numberOfLegs: result.numberOfLegs,
              notes: result.notes,
              orderStrategy: result.orderStrategy,
              expires: result.expires,
              createdAt: result.createdAt,
              orderDesc: result.orderDesc,
              orderNo: result.orderNo,
              orderStatus: result.orderStatus,
              id: result.id,
            };
            return orders;
          });
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listAccountBondOrders: protectedProcedure
    .input(
      z.object({
        accountId: z.string().uuid(),
        page: z.number().default(0),
        size: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { accountId, page, size } = input;

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .listClientOrders(accountId, tenant, page, size, "clientId", "desc")
        .then((result: PageTemplateOrder) => {
          return result.content?.filter(result => (result.assetType == OrderRequest.assetType.BOND)).map((result) => {
            const orders: OrdersView = {
              side: result.side,
              limitPrice: result.limitPrice,
              requestedQty: result.requestedQty,
              tif: result.tif,
              accountId: result.accountId,
              marketCode: result.marketCode,
              secId: result.secId,
              currency: result.currency,
              assetType: result.assetType,
              numberOfLegs: result.numberOfLegs,
              notes: result.notes,
              orderStrategy: result.orderStrategy,
              expires: result.expires,
              createdAt: result.createdAt,
              orderDesc: result.orderDesc,
              orderNo: result.orderNo,
              orderStatus: result.orderStatus,
              id: result.id,
            };
            return orders;
          });
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),


  // Generate a list of recent orders for a sub account - Also generic
  searchOrder: protectedProcedure
    .input(
      z.object({
        pattern: z.string(),
        page: z.number().default(0),
        size: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { pattern, page, size } = input;

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .searchOrder(tenant, pattern, page, size, "orderNo_sort", "desc")
        .then((result: PageTemplateOrder) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new orders for a sub account - Also generic
  addOrder: protectedProcedure
    .input(OrderRequestSchema)
    .mutation(async ({ ctx, input: request }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .addOrder(tenant, request)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Cancel orders for an account - Also generic
  cancelOrderById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .cancelOrderById(tenant, orderId)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Edit an orders for a sub account - Also generic
  editOrderById: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        requestBody: UpdateOrderRequestSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const { orderId, requestBody } = input;

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .updateOrder(orderId, tenant, requestBody)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Delete an orders for a sub account - Also generic
  deleteOrderById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: orderId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const investingService =
        await InvestingService.getInstance().getApiService(tenant);

      return investingService.order
        .deleteOrder(orderId, tenant)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),
});
