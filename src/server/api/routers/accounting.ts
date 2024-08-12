import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AppMessage } from "~/server/api/models/crm";
import { getTenant } from "./util";
import { AccountingService } from "~/utils/service";
import { analyzeError } from "~/utils/analyzeError";
import { Direction } from "../models/banking";
import { CurrencyCodeListSort, PageTemplateCurrencyCode } from "../models/accounting";


export const accountingRouter = createTRPCRouter({
  // Get the details of a client - Also generic
  listCurrencyCode: protectedProcedure
    .query(async ({ ctx }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const accountingService =
        await AccountingService.getInstance().getApiService(tenant);

      return accountingService.currencyCode.listCurrencyCode(Direction.ASC, CurrencyCodeListSort.ID, tenant, 0, 10)
        .then((result: PageTemplateCurrencyCode) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),
});
