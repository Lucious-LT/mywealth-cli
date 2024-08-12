import { createTRPCRouter } from "~/server/api/trpc";
import { bankingRouter } from "~/server/api/routers/banking";
import { profileRouter } from "./routers/profile";
import { investRouter } from "./routers/invest";
import { positionRouter } from "./routers/position";
import { orderRouter } from "./routers/order";
import { fundsRouter } from "./routers/funds";
import { treasuryRouter } from "./routers/treasury";
import { insuranceRouter } from "./routers/insure";
import { accountingRouter } from "./routers/accounting";
import { crmRouter } from "./routers/crm";
import { reportsRouter } from "./routers/reports";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  banking: bankingRouter,
  invest: investRouter,
  profile: profileRouter,
  position: positionRouter,
  order: orderRouter,
  funds: fundsRouter,
  treasury: treasuryRouter,
  insurance: insuranceRouter,
  accounting: accountingRouter,
  crm: crmRouter,
  reports: reportsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
