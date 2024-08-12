import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import {
  type AppMessage,
  type Client,
  type KycDocument,
  KycDocumentRequest,
  type TransactionResponse
} from "~/server/api/models/crm";
import { z } from "zod";
import { getTenant } from "./util";
import { AdministrationService, CrmService } from "~/utils/service";
import { analyzeError } from "~/utils/analyzeError";
import { TRPCError } from "@trpc/server";

export const kycDocumentRequestSchema = z.object({
  clientId: z.string(),
  contactId: z.string().optional(),
  recordType: z.nativeEnum(KycDocumentRequest.recordType),
  idType: z.nativeEnum(KycDocumentRequest.idType),
  idNo: z.string().optional(),
  idIssuer: z.string().optional(),
  idExpDate: z.string().optional(),
  fileType: z.string().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  notes: z.string().optional(),
  fileContent: z.string().optional()
});

export const profileRouter = createTRPCRouter({

  // Generate a password reset link
  resetPasswordWithToken: publicProcedure
    .input(
      z.object({
        password: z.string(),
        tenantId: z.string(),
        tokenId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { password, tenantId, tokenId } = input;
      const crmService = await CrmService.getInstance().getApiService(tenantId);
      return crmService.client.resetContactPasswordWithToken(tenantId, {
        tokenId: tokenId,
        password: password
      }).then((result: TransactionResponse) => {
        return result;
      }).catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new TRPCError({
          message: details,
          code: "BAD_REQUEST"
        });
      });
    }),

  // Generate a password reset link
  generatePasswordResetLink: publicProcedure
    .input(
      z.object({
        username: z.string(),
        tenantId: z.string(),
        tenantUrl: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { username, tenantId, tenantUrl } = input;
      const crmService = await CrmService.getInstance().getApiService(tenantId);
      return crmService.client.generateContactPasswordResetToken(tenantId, {
        username: username,
        tenantUrl: tenantUrl
      }).then((result: TransactionResponse) => {
        return result;
      }).catch((error) => {
        const { details } = analyzeError(error) as AppMessage;
        throw new TRPCError({
          message: details,
          code: "BAD_REQUEST"
        });
      });
    }),

  // Get the tenant logo
  getTenantLogo: publicProcedure
    .input(
      z.object({
        tenantId: z.string()
      })
    )
    .query(async ({ input }) => {
      const { tenantId } = input;
      const adminService = await AdministrationService.getInstance().getApiService(tenantId);
      return adminService.tenant.getEncodedTenantLogo(tenantId, tenantId)
        .then((blob) => {
          return `data:image/jpg;base64,${blob}`;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new TRPCError({
            message: details,
            code: "INTERNAL_SERVER_ERROR"
          });
        });
    }),

  // Get the details of a client - Also generic
  findByClientId: protectedProcedure
    .input(
      z.object({
        clientId: z.string().uuid()
      })
    )
    .query(async ({ ctx, input }) => {
      const { clientId } = input;

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.client.findByClientId(clientId, tenant)
        .then((result: Client) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Load the profile picture
  loadClientPicture: protectedProcedure
    .input(
      z.object({
        clientId: z.string().uuid()
      })
    )
    .query(async ({ ctx }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);
      const imageUrl = ctx.session.user.image;

      //If the image is not present, return null else load the image
      if (imageUrl === null || imageUrl === undefined || imageUrl === "") {
        return null;
      }

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.media.getBase64EncodedMediaWithUrl(imageUrl, tenant)
        .then((blob) => {
          //Get the mime type by splitting the image url and then getting the last value
          const mimeType = imageUrl.split(".").pop();
          if (mimeType === null || mimeType === undefined) {
            throw new Error("Invalid image url");
          }
          let mimeTypeValue: string;
          switch (mimeType.toLowerCase()) {
            case "jpg":
            case "jpeg":
              mimeTypeValue = "image/jpeg";
              break;
            case "png":
              mimeTypeValue = "image/png";
              break;
            case "gif":
              mimeTypeValue = "image/gif";
              break;
            default:
              throw new Error("Invalid image url");
          }
          return `data:${mimeTypeValue};base64,${blob}`;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Load the kyc document
  loadKycDocument: protectedProcedure
    .input(
      z.object({
        url: z.string()
      })
    )
    .query(async ({ ctx, input: { url } }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.media.getBase64EncodedMediaWithUrl(url, tenant)
        .then((blob) => {
          //Get the mime type by splitting the image url and then getting the last value
          const mimeType = url.split(".").pop();
          if (mimeType === null || mimeType === undefined) {
            throw new Error("Invalid image url");
          }
          let mimeTypeValue: string;
          switch (mimeType.toLowerCase()) {
            case "jpg":
            case "jpeg":
              mimeTypeValue = "image/jpeg";
              break;
            case "png":
              mimeTypeValue = "image/png";
              break;
            case "gif":
              mimeTypeValue = "image/gif";
              break;
            case "pdf":
              mimeTypeValue = "application/pdf";
              break;
            default:
              throw new Error("Invalid image url");
          }
          return `data:${mimeTypeValue};base64,${blob}`;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Delete a kyc document for a sub account - Also generic
  deleteKycDocument: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: documentId }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.kycDocument.deleteKycDocument(documentId, tenant)
        .then((result: TransactionResponse) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Update a kyc document for a sub account - Also generic
  updateKycDocument: protectedProcedure
    .input(z.object({
      documentId: z.string(),
      requestBody: kycDocumentRequestSchema
    }))
    .mutation(async ({ ctx, input: { documentId, requestBody } }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.kycDocument.updateKycDocument(documentId, tenant, requestBody)
        .then((result: KycDocument) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new kyc document for a sub account - Also generic
  createKycDocument: protectedProcedure
    .input(kycDocumentRequestSchema)
    .mutation(async ({ ctx, input }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.kycDocument.createKycDocument(tenant, input)
        .then((result: KycDocument) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // List the various advisor groups - Also generic
  getKycDocumentsForClient: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.kycDocument.getKycDocumentsForClient(input, tenant)
        .then((result: KycDocument[]) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    })
});
