// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // Currently this does not include the static assets (e.g. images) in the output folder
  // output: 'standalone',

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "latest";
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/health/liveness",
        destination: "/api/healthz",
      },
    ];
  },

  headers: async () => {
    return [
      {
        source: "/api/auth/session",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },

  // pageExtensions: ["page.tsx"]
};

export default config;
