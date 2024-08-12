import { type Prisma, type PrismaClient } from "@prisma/client";
import { type AxiosError } from "axios";
import { type User } from "next-auth";
import { type AppMessage } from "~/server/api/models/banking";
import { assert } from "~/utils/service";

export function getApiErrorMessage(err: AxiosError): AppMessage {
  if (err.response?.data) {
    return err.response?.data as AppMessage;
  } else {
    return {
      code: err.status?.toString() ?? "500",
      timestamp: Date.now().toLocaleString(),
      summary: err.message,
      details: "An unknown error occurred.",
      fields: []
    }
  }

}

export const getTenant = (ctx: {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never
  >;
  session: {
    user: User & {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
    expires: string;
  };
}) => {
  //Get the tenant from the session
  const tenant: string = ctx.session?.user.tenant;
  assert(tenant !== undefined, "Tenant is undefined");
  return tenant;
};
