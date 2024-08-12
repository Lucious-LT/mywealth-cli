import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  // AUTH_TRUST_HOST: z.string().optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string().min(1) : z.string().url()
  ),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  KEYCLOAK_CLIENT_ID: z.string().min(1),
  KEYCLOAK_CLIENT_SECRET: z.string().min(1),
  KEYCLOAK_BASE_URL: z.string().url().min(1),

  CRM_SERVICE_URL: z.string().url().min(1),
  BANKING_SERVICE_URL: z.string().url().min(1),
  ACCOUNTING_SERVICE_URL: z.string().url().min(1),
  REPORTS_SERVICE_URL: z.string().url().min(1),
  POSITION_SERVICE_URL: z.string().url().min(1),
  INVESTING_SERVICE_URL: z.string().url().min(1),
  INSURANCE_SERVICE_URL: z.string().url().min(1),
  ADMINISTRATION_SERVICE_URL: z.string().url().min(1),
  COMMUNICATION_SERVICE_URL: z.string().url().min(1),
  EMAIL_FROM_ADDRESS: z.string().email(),

});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  // AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL,

  // Services used by the server side
  CRM_SERVICE_URL: process.env.CRM_SERVICE_URL,
  BANKING_SERVICE_URL: process.env.BANKING_SERVICE_URL,
  ACCOUNTING_SERVICE_URL: process.env.ACCOUNTING_SERVICE_URL,
  REPORTS_SERVICE_URL: process.env.REPORTS_SERVICE_URL,
  INVESTING_SERVICE_URL: process.env.INVESTING_SERVICE_URL,
  INSURANCE_SERVICE_URL: process.env.INSURANCE_SERVICE_URL,
  POSITION_SERVICE_URL: process.env.POSITION_SERVICE_URL,
  ADMINISTRATION_SERVICE_URL: process.env.ADMINISTRATION_SERVICE_URL,
  COMMUNICATION_SERVICE_URL: process.env.COMMUNICATION_SERVICE_URL,
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    }
  });
}

export { env };
