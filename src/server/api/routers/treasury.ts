import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type AppMessage } from "~/server/api/models/crm";
import { getTenant } from "./util";
import { TreasuryService } from "~/utils/service";
import { analyzeError } from "~/utils/analyzeError";
import { Direction, FixedIncomeTransactionListSort } from "../models/funds";
import { type PageTemplateFixedIncomeTransaction } from "../models/treasury";


export const treasuryRouter = createTRPCRouter({
  // Generate a list of recent fixed income - Also generic
  listFixedIncome: protectedProcedure.query(async ({ ctx }) => {
    //Get the tenant from the session
    const tenant = getTenant(ctx);

    const treasuryService = await TreasuryService.getInstance().getApiService(
      tenant
    );

    return treasuryService.fixedIncomeTransaction.listFixedIncomeTransaction(Direction.ASC,
      FixedIncomeTransactionListSort.CODE, tenant, 0, 5)
      .then((result: PageTemplateFixedIncomeTransaction) => {
        return result.content;
      })
      .catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new Error(details as string);
      });
  }),
});
