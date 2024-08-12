/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type GetServerSidePropsContext } from "next";
import { type DefaultSession, getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { CrmService } from "~/utils/service";
import { type Client } from "~/server/api/models/crm";
import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

const DEFAULT_REALM = "mywealth";

// https://next-auth.js.org/configuration/options

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    tenant: string;
    clientId: string;
    clientCode: string;
    clientLabel: string;
    email?: string | undefined;
    // ...other properties
    // role: UserRole;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

}

// @ts-ignore
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const useSecureCookies = env.NEXTAUTH_URL.startsWith('https://')
const hostName = new URL(env.NEXTAUTH_URL).hostname;

export const authOptions: NextAuthOptions = {
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
         httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName === 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
      }
    }
  },
  callbacks: {

    // eslint-disable-next-line @typescript-eslint/require-await
    session: async ({ session, token }) => {
      //Forward the tenant & other attributes to the session so that they can be used in the UI & APIs
      if (token.tenant) {
        // @ts-ignore
        session.user.id = token.userId;
        // @ts-ignore
        session.user.tenant = token.tenant;
        // @ts-ignore
        session.user.clientId = token.clientId;
        // @ts-ignore
        session.user.clientCode = token.clientCode;
        // @ts-ignore
        session.user.clientLabel = token.clientLabel;
        // @ts-ignore
        session.user.email = token.email;
        

        
      }
      return session;
    },
    


    jwt: ({ token, user }) => {
      // Add the tenant & other attributes to the JWT token
      if (user) {
        return {
          ...token,
          userId: user.id,
          tenant: user.tenant,
          clientId: user.clientId,
          clientCode: user.clientCode,
          clientLabel: user.clientLabel,
          email: user.email
        };
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/require-await
    async signIn({ user, account }) {

      //Validate the account and stop the login if the account is not valid
      if (user === null || account === null || account.providerAccountId === null) return false;

      //Return true to allow the login to proceed
      return user.tenant !== undefined && user.tenant !== null && user.tenant !== "";
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    redirect: async ({url, baseUrl}) => {
      //Modify the call back url to include the tenant Id when running on the server .
      const hostName = new URL(env.NEXTAUTH_URL).hostname;
      if(hostName === 'localhost') return url;
      return  url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  //adapter: MyAdapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 // 60 minutes
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`
    // maxAge: 60 * 60 * 24 * 30
    maxAge: 60 * 60 // 60 minutes
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "MyWealth",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore
      async authorize(credentials, req) {

        if (credentials === undefined ||
          credentials.username === undefined ||
          credentials.password === undefined) return null;

        const { username, password } = credentials;

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const host: string = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "";

        // Log a warning and exit it we cannot determine the origin url
        if (!host) {
          console.log("Could not determine the host from the headers property");
          console.log(req.headers);
          return null;
        }

        // The request url will be something like https://*.portal.dev.mywealthcare.io
        // We will get the realm from the url by splitting the url by "." and getting the first value
        // If the first value is "localhost" we will return the default realm
        let tenant: string = DEFAULT_REALM;
        if (!host.startsWith("localhost")) { // @ts-ignore
          tenant = host.split(".")[0];
        }

        const apiService = await CrmService.getInstance().getApiService(tenant);
        const client: Client | null = await apiService.client.validateContactCredentials(
          tenant,
          {
            username,
            password
          }
        ).then((client) => {
          return client;
        }).catch((error) => {
          console.log(error);
          return null;
        });

        if (client === null) return null;

        //Get the contact from the client object filtering by the username
        const contact = client.contact.find((contact) => {
          return contact.username === username;
        });

        if (contact === null || contact === undefined) return null;

        //Check if we have a user with the same username
        const user = await prisma.user.findUnique({
          where: {
            username: username
          }
        });

        if (user === null || user === undefined) {
          //Create the user
          await prisma.user.create({
            data: {
              name: contact.label,
              tenant: tenant,
              username: username,
              email: contact.email,
              image: client.pictureUrl,
              clientId: client.id,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              clientCode: client.code,
              clientLabel: client.label,
              contactId: contact.id
            }
          });
        } else {
          //Update the user
          await prisma.user.update({
            where: {
              id: user.id
            },
            data: {
              name: contact.label,
              tenant: tenant,
              username: username,
              email: contact.email,
              image: client.pictureUrl,
              clientId: client.id,
              clientCode: client.code,
              clientLabel: client.label,
              contactId: contact.id
            }
          });
        }

        //Return the user info
        return {
          id: user?.id,
          name: contact.label,
          email: contact.email,
          image: client.pictureUrl,
          tenant: tenant,
          clientId: client.id,
          clientCode: client.code,
          clientLabel: client.label
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
     
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
