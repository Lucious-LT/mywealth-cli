import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { InsuranceService, AccountingService } from "~/utils/service";
import { getApiErrorMessage, getTenant } from "~/server/api/routers/util";
import { analyzeError } from "~/utils/analyzeError";
import {
    QuoteRequest,
    Direction,
    ClaimRequest,
    AppMessage,
    QuoteListSort,
    InsuranceProductListSort,
    PartnerListSort,
    BranchListSort,
    PaymentListSort
} from "../models/insurance";
import { CurrencyCodeListSort } from "../models/accounting";

const ClaimRequestSchema = z.object({
    claimLabel: z.string().min(5),
    currency: z.string(),
    claimAmount: z.number().min(0.01),
    claimDate: z.string(),
    policyId: z.string().uuid(),
    refClaimNo: z.string().optional(),
    approvedAmount: z.number().optional(),
    dateProcessed: z.string().optional(),
    notes: z.string().optional(),
})

const QuoteRequestSchema = z.object({
    quoteLabel: z.string().min(5),
    currency: z.string(),
    productId: z.string().uuid(),
    startDate: z.string(),
    sumInsured: z.number().min(0.01),
    refQuoteNo: z.string().optional(),
    paymentTerms: z.string(),
    riskType: z.string(),
    notes: z.string().optional(),
    branchId: z.string().uuid().optional(),
    partnerId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
})

export type ClaimRequestType = z.infer<typeof ClaimRequestSchema>;
export type QuoteRequestType = z.infer<typeof QuoteRequestSchema>;

export const insuranceRouter = createTRPCRouter({

    getOverviewData: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input: clientId }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .quote
                .listQuote(Direction.ASC, QuoteListSort.CLIENT_LABEL, tenant, 0, 100)
                .then((response) => {
                    const overviewData = response.content.filter(data => data.clientId === clientId);

                    const group = overviewData?.reduce((result: any, currentItem: any) => {
                        const { productLabel, sumInsured, status } = currentItem;

                        // todo - confirm this status
                        if (status === "CONVERTED") {
                            if (!result[productLabel]) {
                                result[productLabel] = { productLabel, sumInsured: 0 };
                            }
                            result[productLabel].sumInsured += sumInsured;
                        }

                        return result;
                    }, {})

                    const overview = group ? Object.keys(group).map(key => group[key]) : [];

                    return overview;
                })
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getPartners: protectedProcedure
        .query(async ({ ctx }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .partner
                .listPartner(Direction.ASC, PartnerListSort.LABEL, tenant, 0, 100)
                .then(response => response.content)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getBranches: protectedProcedure
        .query(async ({ ctx }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .branch
                .listBranch(Direction.ASC, BranchListSort.LABEL, tenant, 0, 100)
                .then(response => response.content)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getProductCatgeories: protectedProcedure
        .query(async ({ ctx }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .insuranceProduct
                .listInsuranceProduct(Direction.ASC, InsuranceProductListSort.LABEL, tenant, 0, 100)
                .then(response => response.content)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    addQuote: protectedProcedure
        .input(QuoteRequestSchema)
        .mutation(async ({ ctx, input: quoteRequest }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .quote
                .addQuote(tenant, quoteRequest as QuoteRequest)
                .then(result => result)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });
        }),

    getQuotesForClient: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input: clientId }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .quote
                .listQuote(Direction.ASC, QuoteListSort.CLIENT_LABEL, tenant, 0, 100)
                .then((response) => {
                    return response.content.filter(data => data.clientId === clientId)
                })
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    addClaim: protectedProcedure
        .input(ClaimRequestSchema)
        .mutation(async ({ ctx, input: claimRequest }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .claim
                .addClaim(tenant, claimRequest as ClaimRequest)
                .then(result => result)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getClaimsForClient: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input: clientId }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService.claim
                .findClaimsForClientById(clientId, tenant)
                .then((result) => result)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });
        }),

    getPoliciesForClient: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input: clientId }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .policy
                .findPoliciesForClientById(clientId, tenant)
                .then(result => result)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getCurrencies: protectedProcedure
        .query(async ({ ctx }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const accountService = await AccountingService.getInstance().getApiService(tenant);

            return accountService
                .currencyCode
                .listCurrencyCode(Direction.ASC, CurrencyCodeListSort.LABEL, tenant, 0, 100)
                .then(result => result.content)
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        }),

    getPaymentForCLient: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input: clientId }) => {
            //Get the tenant from the session
            const tenant = getTenant(ctx);
            const insuranceService = await InsuranceService.getInstance().getApiService(tenant);

            return insuranceService
                .payment
                .listPayment(Direction.ASC, PaymentListSort.LABEL, tenant, 0, 100)
                .then((response) => {
                    return response.content.filter(data => data.clientId === clientId)
                })
                .catch(error => {
                    const { details } = analyzeError(error) as AppMessage;
                    throw new Error(details);
                });

        })
})