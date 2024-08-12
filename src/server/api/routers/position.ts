import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PositionService } from "~/utils/service";
import { type AppMessage } from "../models/investing";
import { analyzeError } from "~/utils/analyzeError";
import { getTenant } from "./util";
import {
  BondListSort,
  Direction,
  EquityListSort,
  FundListSort,
  MarketListSort,
  PositionInstrumentView,
  PositionView,
  type PageTemplateBond,
  type PageTemplateEquity,
  type PageTemplateFund,
  type PageTemplateMarket,
} from "../models/position";

export const positionRouter = createTRPCRouter({

  getEquityList: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    //Return the list of equity
    const positionService = await PositionService.getInstance().getApiService(
      tenant
    );

    return positionService.equity
      .listEquity(Direction.ASC, EquityListSort.SEC_ID, tenant, 0)
      .then((result: PageTemplateEquity) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),

  listEquityByMarketCode: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: marketCode }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of equity
      const positionService = await PositionService.getInstance().getApiService(
        tenant
      );

      return positionService.equity
        .listEquityByMarketCode(
          marketCode,
          Direction.ASC,
          BondListSort.SEC_ID,
          tenant,
          0
        )
        .then((result: PageTemplateEquity) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  getFundList: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    //Return the list of funds
    const positionService = await PositionService.getInstance().getApiService(
      tenant
    );

    return positionService.fund
      .listFund(Direction.ASC, FundListSort.SEC_ID, tenant, 0)
      .then((result: PageTemplateFund) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),

  getPortfolioPositionForSecurity: protectedProcedure.input(z.object({
    marketCode: z.string(),
    accountId: z.string().uuid(),
    securityId: z.string(),
    currency: z.string()
  })).query(async ({ ctx, input: { marketCode, accountId, securityId, currency } }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    //Return the list of funds
    const positionService = await PositionService.getInstance().getApiService(
      tenant
    );

    const date = new Date().toISOString().split("T")[0]!
    return positionService.ledger.getPortfolioPositionForSecurity(accountId, marketCode, securityId, date, tenant, currency)
      .then((result: PositionInstrumentView) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),


  getBondList: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    //Return the list of funds
    const positionService = await PositionService.getInstance().getApiService(
      tenant
    );

    return positionService.bond
      .listBond(Direction.ASC, BondListSort.SEC_ID, tenant, 0)
      .then((result: PageTemplateBond) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),

  listBondByMarketCode: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: marketCode }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of Bonds
      const positionService = await PositionService.getInstance().getApiService(
        tenant
      );

      return positionService.bond
        .listBondByMarketCode(marketCode, Direction.ASC, BondListSort.SEC_ID, tenant, 0)
        .then((result: PageTemplateBond) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  listFundByMarketCode: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: marketCode }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of funds
      const positionService = await PositionService.getInstance().getApiService(
        tenant
      );

      return positionService.fund
        .listFundByMarketCode(marketCode, Direction.ASC, BondListSort.SEC_ID, tenant, 0)
        .then((result: PageTemplateFund) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  getPositionReport: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: accountId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      //Return the list of funds
      const positionService = await PositionService.getInstance().getApiService(
        tenant
      );

      return positionService.ledger.getPositionReport(accountId, new Date().toISOString().split("T")[0]!, tenant)
        .then((result: PositionView) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  getMarketList: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    //Return the list of funds
    const positionService = await PositionService.getInstance().getApiService(
      tenant
    );

    return positionService.market
      .listMarket(Direction.ASC, MarketListSort.MARKET_CODE, tenant, 0)
      .then((result: PageTemplateMarket) => {
        return result;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),
});
