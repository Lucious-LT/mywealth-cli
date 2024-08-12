/* eslint-disable */
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import {
  Address,
  type AppMessage,
  type Client,
  ClientGroup,
  ClientGroupRequest,
  ClientRequest,
  ContactRequest,
  KycDocumentRequest,
  type Lead,
  LeadRequest,
  type TransactionResponse,
  Ticket,
  TicketRequest
} from "~/server/api/models/crm";
import { getTenant } from "./util";
import { AdministrationService, CommunicationService, CrmService } from "~/utils/service";
import { analyzeError } from "~/utils/analyzeError";
import { z } from "zod";
import { type BooleanResponse, type EmailRequest } from "~/server/api/models/communication";
import { TRPCError } from "@trpc/server";
import { Direction, PageTemplatePickList, PickListSort } from "../models/administration";

const AddressSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(Address.type),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postCode: z.string(),
  country: z.string()
});

export const SignUpRequestSchema = z.object({
  tenant: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  mobileNo: z.string(),
  officeNo: z.string().optional(),
  organization: z.string().optional(),
  clientType: z.nativeEnum(ClientRequest.clientType)
});

export const SignUpVerifyTokenSchema = z.object({
  tenant: z.string(),
  email: z.string(),
  token: z.string().min(6).max(6)
});

export const ContactRequestSchema = z.object({
  id: z.string().optional(),
  role: z.nativeEnum(ContactRequest.role),
  maritalStatus: z.nativeEnum(ContactRequest.maritalStatus),
  gender: z.nativeEnum(ContactRequest.gender),
  refCode: z.string().optional(),
  label: z.string().optional(),
  title: z.nativeEnum(ContactRequest.title),
  notes: z.string().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string(),
  mobileNo: z.string(),
  officeNo: z.string().optional(),
  address: AddressSchema,
  username: z.string().optional(),
  grantLoginAccess: z.boolean(),
  password: z.string().optional(),
  birthDate: z.string(),
  idNo: z.string().optional(),
  finIdNo: z.string().optional(),
  idType: z.nativeEnum(ContactRequest.idType).optional(),
  idExpDate: z.string().optional(),
  profession: z.string().optional(),
  nationality: z.string().optional(),
  networthTotalRange: z.nativeEnum(ContactRequest.networthTotalRange).optional().nullable(),
  annualIncomeRange: z.nativeEnum(ContactRequest.annualIncomeRange).optional().nullable(),
  networthLiquidRange: z.nativeEnum(ContactRequest.networthLiquidRange).optional().nullable(),
  sourceOfWealth: z.nativeEnum(ContactRequest.sourceOfWealth).optional().nullable(),
  investmentExperience: z.nativeEnum(ContactRequest.investmentExperience).optional().nullable(),
  riskTolerance: z.nativeEnum(ContactRequest.riskTolerance).optional().nullable(),
  employerName: z.string().optional().nullable(),
  employerAddress: z.string().optional().nullable(),
  investmentObj: z.nativeEnum(ContactRequest.investmentObj).optional().nullable(),
  moneyLaunderingRisk: z.boolean().optional(),
  politicallyExposed: z.boolean().optional(),
  criminalConviction: z.boolean().optional(),
  pictureUrl: z.string().optional(),
  signatureUrl: z.string().optional()
});

export const ClientRequestSchema = z.object({
  clientType: z.nativeEnum(ClientRequest.clientType),
  businessStructure: z.nativeEnum(ClientRequest.businessStructure).optional(),
  refCode: z.string().optional(),
  label: z.string().optional(),
  notes: z.string().optional(),
  email: z.string(),
  notificationEmail: z.string().optional(),
  mobileNo: z.string(),
  officeNo: z.string().optional(),
  valuationCurrency: z.string(),
  groupId: z.string(),
  advisorGroupId: z.string().optional(),
  address: z.array(AddressSchema),
  contact: z.array(ContactRequestSchema),
  picture: z.string().optional(),
  businessIncCode: z.string().optional(),
  autoApprove: z.boolean().optional(),
  relationshipStartDate: z.string().optional()
});

export const KycDocumentRequestSchema = z.object({
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

const TicketRequestSchema = z.object({
  subject: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  description: z.string().optional(),
  resolution: z.string().optional(),
  clientId: z.string(),
  contactId: z.string(),
  advisorGroupId: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.nativeEnum(TicketRequest.priority),
  channel: z.nativeEnum(TicketRequest.channel),
  advisorId: z.string().optional()
})

export const crmRouter = createTRPCRouter({
  convertLeadToClient: publicProcedure
    .input(z.object({ tenantId: z.string(), contact: ContactRequestSchema }))
    .mutation(async ({ ctx, input: { tenantId, contact } }) => {

      //Retrieve the lead using the email and ensure that it has been setup
      // Check if the email is a duplicate and if not we will create a new lead and then email the token
      const leadRecord = await ctx.prisma.lead.findUnique({
        where: {
          email: contact.email,
          tenant: tenantId
        }
      });

      if (leadRecord === null || leadRecord === undefined) {
        throw new TRPCError({
          message: "Invalid email address",
          code: "NOT_FOUND"
        });
      }

      if (leadRecord.leadId === null || leadRecord.leadId === undefined) {
        throw new TRPCError({
          message: "Invalid lead verification status",
          code: "BAD_REQUEST"
        });
      }

      //If the leadRecord.clientId is not null or undefined then we have already completed this and will return a 400
      if (leadRecord.clientId !== null && leadRecord.clientId !== undefined) {
        throw new TRPCError({
          message: "Client already exists",
          code: "BAD_REQUEST"
        });
      }

      //Look for a client group called "WEB_PORTAL" and if not found we will create it.
      const crmService = await CrmService.getInstance().getApiService(tenantId);

      //Resolve the client group for the client
      // @ts-ignore
      let clientGroup: ClientGroup = undefined;
      await crmService.clientGroup.findClientGroupByCode(`WEB_PORTAL_${leadRecord.clientType}`, tenantId).then(
        (result: ClientGroup) => {
          clientGroup = result;
        }
      ).catch(async (error) => {
        if (error.body?.code === '404') {
          console.log(`Creating the client group for ${leadRecord.clientType} clients`);
          //Create the client group
          const adminService = await AdministrationService.getInstance().getApiService(tenantId);
          const stmtConfig = await adminService.tenant.findTenantStatementConfig(tenantId, tenantId);
          const clientGroupRequest: ClientGroupRequest = {
            type: leadRecord.clientType as ClientGroupRequest.type,
            code: `WEB_PORTAL_${leadRecord.clientType}`,
            label: `Web Portal Clients - ${leadRecord.clientType}`,
            notes: "Clients that were created from the web portal",
            active: true,
            valuationCurrency: stmtConfig.defaultCurrency ?? "USD"
          };
          clientGroup = await crmService.clientGroup.addClientGroup(tenantId, clientGroupRequest);
        } else {
          const { details } = analyzeError(error) as AppMessage;
          throw new TRPCError({
            message: details,
            code: "INTERNAL_SERVER_ERROR"
          });
        }
      });

      if (clientGroup === null || clientGroup === undefined) {
        throw new TRPCError({
          message: "Could not resolve the client group",
          code: "INTERNAL_SERVER_ERROR"
        });
      }

      //Convert the lead to a client
      const convertedLead = await crmService.lead.convertLead(leadRecord.leadId, tenantId, clientGroup.id);









      
      // Retrieve the client and update the client details
      // @ts-ignore
      const newClient = await crmService.client.findByClientId(convertedLead.clientId, tenantId);
      newClient.contact.forEach((cv) => {
        cv.gender = contact.gender;
        cv.maritalStatus = contact.maritalStatus;
        cv.birthDate = contact.birthDate;
        cv.idNo = contact.idNo;
        cv.finIdNo = contact.finIdNo;
        cv.idType = contact.idType;
        cv.idExpDate = contact.idExpDate;
        cv.profession = contact.profession;
        cv.nationality = contact.nationality;
        cv.networthTotalRange = contact.networthTotalRange ?? undefined;
        cv.annualIncomeRange = contact.annualIncomeRange ?? undefined;
        cv.networthLiquidRange = contact.networthLiquidRange ?? undefined;
        cv.sourceOfWealth = contact.sourceOfWealth ?? undefined;
        cv.investmentExperience = contact.investmentExperience ?? undefined;
        cv.riskTolerance = contact.riskTolerance ?? undefined;
        cv.employerName = contact.employerName ?? undefined;
        cv.employerAddress = contact.employerAddress ?? undefined;
        cv.investmentObj = contact.investmentObj ?? undefined;
        cv.moneyLaunderingRisk = contact.moneyLaunderingRisk;
        cv.politicallyExposed = contact.politicallyExposed;
        cv.criminalConviction = contact.criminalConviction;
        cv.pictureUrl = contact.pictureUrl;
        cv.signatureUrl = contact.signatureUrl;

        //Update the contact address
        cv.address.addressLine1 = contact.address.addressLine1;
        cv.address.addressLine2 = contact.address.addressLine2;
        cv.address.city = contact.address.city;
        cv.address.state = contact.address.state;
        cv.address.postCode = contact.address.postCode;
        cv.address.country = contact.address.country;
      });

      //Update the client address
      newClient.address?.forEach((cv) => {
        cv.addressLine1 = contact.address.addressLine1;
        cv.addressLine2 = contact.address.addressLine2;
        cv.city = contact.address.city;
        cv.state = contact.address.state;
        cv.postCode = contact.address.postCode;
        cv.country = contact.address.country;
      });

      //Update the password and then remove the local copy
      if (leadRecord.password !== null && leadRecord.password !== undefined) {
        const password = Buffer.from(leadRecord.password, "base64").toString("utf-8");
        for (const cc of newClient.contact) {
          await crmService.client.changeContactPassword(tenantId, {
            username: cc.username,
            newPassword: password
          });
        }
      }

      // @ts-ignore
      const clientRequest: ClientRequest = {
        ...newClient, groupId: newClient.group?.id as string
      };

      const updatedClient = await crmService.client.updateClient(newClient.id, tenantId, clientRequest)
        .then((result: Client) => {
          //Update the lead record
          ctx.prisma.lead.update({
            data: {
              clientId: result.id,
              password: Buffer.from("**********").toString("base64")
            },
            where: {
              id: leadRecord.id
            }
          })
            .then(() => {
              return result;
            })
            .catch((error) => {
              const { details } = analyzeError(error) as AppMessage;
              throw new TRPCError({
                message: details,
                code: "INTERNAL_SERVER_ERROR"
              });
            });
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new TRPCError({
            message: details,
            code: "INTERNAL_SERVER_ERROR"
          });
        });

      const commService =
        await CommunicationService.getInstance().getApiService(tenantId);

      const adminService = await AdministrationService.getInstance().getApiService(tenantId);
      const stmtConfig = await adminService.tenant.findTenantStatementConfig(tenantId, tenantId);

      const emailRequest: EmailRequest = {
        from: stmtConfig.stmtMailFrom ?? process.env.EMAIL_FROM_ADDRESS as string,
        to: contact.email,
        subject: `${stmtConfig.stmtEntityName ?? "MyWealth"} - Account Created`,
        mimeType: "text/html",
        body: `
            <div>Dear ${updatedClient.label},</div>
            <br/>
            <div>We are delighted to welcome you to ${stmtConfig.stmtEntityName}, where we specialize in providing premier securities trading and investment services.</div>
             <br/>
            <div>Your account has been successfully created, and we are pleased to provide you with your login credentials:</div>
            <br/>
            <div>Username: <b>${updatedClient.contact[0]?.username}</b></div>
            <br/>
            <div>Please use the above username along with the password you selected during the registration process to access your account.</div>
            <br/>
            <div>Upon logging in, you will have the opportunity to complete your Know Your Customer (KYC) requirements and provide any additional necessary details through the profile menu.</div>
            <br/>
            <div>We appreciate your decision to entrust us with your financial needs. Should you have any questions or require assistance at any point, please do not hesitate to reach out to our dedicated support team.</div>
            <br/>
            <div>Thank you for choosing ${stmtConfig.stmtEntityName}. We eagerly anticipate the opportunity to serve you and assist you in achieving your financial goals.</div>
            <br/>
            <br/>
            <br/>
            <div>Best regards,</div>
            <br/>
            <div>Client Service Team</div>
        `
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return commService.communication.sendWorkflowEmail(tenantId, emailRequest)
        .then((result: BooleanResponse) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Validate the emailed token
  verifyEmailToken: publicProcedure
    .input(SignUpVerifyTokenSchema)
    .mutation(async ({ ctx, input: request }) => {

      // Check if the email is a duplicate and if not we will create a new lead and then email the token
      const leadRecord = await ctx.prisma.lead.findUnique({
        where: {
          email: request.email,
          tenant: request.tenant
        }
      });

      if (leadRecord === null || leadRecord === undefined) {
        throw new TRPCError({
          message: "Invalid email address",
          code: "NOT_FOUND"
        });
      }

      // If the token has expired then we will throw an error
      if (leadRecord.expires < new Date()) {
        throw new TRPCError({
          message: "Token has expired",
          code: "BAD_REQUEST"
        });
      }

      // Verify that the token is correct
      if (leadRecord.token !== request.token) {
        throw new TRPCError({
          message: "Invalid token",
          code: "BAD_REQUEST"
        });
      }

      //If the lead Id exists we will retrieve from crm and return the lead else create a new lead
      const crmService =
        await CrmService.getInstance().getApiService(request.tenant);

      if (leadRecord.leadId !== null) {
        return crmService.lead.findByLeadId(leadRecord.leadId, request.tenant)
          .then((result: Lead) => {
            return result;
          })
          .catch((error) => {
            const { details } = analyzeError(error) as AppMessage;
            throw new Error(details as string);
          });
      } else {
        const leadRequest: LeadRequest = {
          address: {
            addressLine1: "_NA_",
            city: "_NA_",
            state: "_NA_",
            postCode: "00000",
            country: "US",
            type: Address.type.PRIMARY
          },
          email: leadRecord.email,
          label: `${leadRecord.firstName} ${leadRecord.lastName}`,
          leadSource: "Client Portal",
          leadType: leadRecord.clientType as LeadRequest.leadType,
          mobileNo: leadRecord.mobileNo,
          notes: "Lead from sign up request on the web client portal",
          officeNo: leadRecord.officeNo as string,
          organization: leadRecord.organization as string,
          tags: [],
          firstName: leadRecord.firstName,
          lastName: leadRecord.lastName
        };

        return crmService.lead.addLead(request.tenant, leadRequest)
          .then((result: Lead) => {
            //Update the lead record
            ctx.prisma.lead.update({
              data: {
                leadId: result.id
              },
              where: {
                email_tenant: {
                  email: request.email,
                  tenant: request.tenant
                }
              }
            })
              .then(() => {
                return result;
              })
              .catch((error) => {
                const { details } = analyzeError(error) as AppMessage;
                throw new Error(details as string);
              });
            return result;
          })
          .catch((error) => {
            const { details } = analyzeError(error) as AppMessage;
            throw new Error(details as string);
          });
      }
    }),

  // Save the client details and email the client to verify the email
  validateSignUpRequest: publicProcedure
    .input(SignUpRequestSchema)
    .mutation(async ({ ctx, input: request }) => {

      //Create the request with a token that expires in 10 minutes and generate a token
      const token = Math.floor(100000 + Math.random() * 900000);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 10);

      //Check if the email is a duplicate and if not we will create a new request and then email the token
      const oldRequest = await ctx.prisma.lead.findUnique({
        where: {
          email: request.email,
          tenant: request.tenant
        }
      });

      if (oldRequest === null || oldRequest === undefined) {
        await ctx.prisma.lead.create({
          data: {
            ...request,
            expires: expires,
            token: String(token),
            password: Buffer.from(request.password).toString("base64")
          }
        });
      } else {
        //Update the record
        await ctx.prisma.lead.update({
          data: {
            ...request,
            expires: expires,
            token: String(token),
            password: Buffer.from(request.password).toString("base64")
          },
          where: {
            email_tenant: {
              email: request.email,
              tenant: request.tenant
            }
          }
        });
      }

      const commService =
        await CommunicationService.getInstance().getApiService(request.tenant);

      const adminService = await AdministrationService.getInstance().getApiService(request.tenant);
      const stmtConfig = await adminService.tenant.findTenantStatementConfig(request.tenant, request.tenant);

      const emailRequest: EmailRequest = {
        from: stmtConfig.stmtMailFrom ?? process.env.EMAIL_FROM_ADDRESS as string,
        to: request.email,
        subject: `${stmtConfig.stmtEntityName ?? "MyWealth"} - Email Verification`,
        mimeType: "text/html",
        body: `
            <div>Your verifcation code is <b>${token}</b></div>
            <div>Please enter this code into the cofirmation box to continue</div>
            <div>This code will expire at ${expires.toUTCString()}</div>
        `
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return commService.communication.sendWorkflowEmail(request.tenant, emailRequest)
        .then((result: BooleanResponse) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new orders for a sub account - Also generic
  updateClient: protectedProcedure
    .input(z.object({ clientId: z.string(), requestBody: ClientRequestSchema }))
    .mutation(async ({ ctx, input: { clientId, requestBody } }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      // @ts-ignore
      return crmService.client.updateClient(clientId, tenant, requestBody)
        .then((result: Client) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new orders for a sub account - Also generic
  changeContactPassword: protectedProcedure
    .input(z.object({ username: z.string(), oldPassword: z.string().optional(), newPassword: z.string() }))
    .mutation(async ({ ctx, input }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      return crmService.client.changeContactPassword(tenant, input)
        .then((result: TransactionResponse) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Send reset password email to client
  resetPassword: publicProcedure
    .input(z.object({ requestBody: z.object({ email: z.string(), tenantUrl: z.string() }), tenantId: z.string() }))
    .mutation(async ({ ctx, input: { requestBody, tenantId } }) => {

      const adminService = await AdministrationService.getInstance().getApiService(tenantId);

      return adminService.user.generatePasswordRecoveryEmail(tenantId, requestBody)
        .then((result: void) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // List the various advisor groups - Also generic
  listPickList: protectedProcedure
    .query(async ({ ctx }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const adminService = await AdministrationService.getInstance().getApiService(tenant);

      return adminService.pickList.listPickList(Direction.ASC, PickListSort.LABEL, tenant, 0, 10)
        .then((result: PageTemplatePickList) => {
          return result.content;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // List the various advisor groups - Also generic
  getTicketForClient: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input: { clientId } }) => {

      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService = await CrmService.getInstance().getApiService(tenant);

      return crmService.ticket.getTicketsForClient(clientId, tenant)
        .then((result: Ticket[]) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),

  // Add a new orders for a sub account - Also generic
  createTicket: protectedProcedure
    .input(z.object({ requestBody: TicketRequestSchema }))
    .mutation(async ({ ctx, input: { requestBody } }) => {
      //Get the tenant from the session
      const tenant = getTenant(ctx);

      const crmService =
        await CrmService.getInstance().getApiService(tenant);

      // @ts-ignore
      return crmService.ticket.createTicket( tenant, requestBody)
        .then((result: Ticket) => {
          return result;
        })
        .catch((error) => {
          const { details } = analyzeError(error) as AppMessage;
          throw new Error(details as string);
        });
    }),
});

