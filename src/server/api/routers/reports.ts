import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type AppMessage } from "~/server/api/models/crm";
import { z } from "zod";
import { getTenant } from "./util";
import { ReportsService } from "~/utils/service";
import { analyzeError } from "~/utils/analyzeError";
import { type ClientCenterReport } from "../models/reports";
import { TRPCError } from "@trpc/server";


export const reportsRouter = createTRPCRouter({

  // Get the details of a client - Also generic
  getClientCenterValuationReport: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const reportService =
        await ReportsService.getInstance().getApiService(tenant);

      return reportService.client.getClientCenterValuationReport(input.clientId, tenant)
        .then((result: ClientCenterReport) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new TRPCError({
            message: details,
            code: "INTERNAL_SERVER_ERROR"
          });
        });
    })
});
