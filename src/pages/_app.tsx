import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import NextNProgress from "nextjs-progressbar";
import "~/styles/globals.css";
import Layout from "~/components/layout";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "~/context/theme-context";
import ClientThemeWrapper from "~/context/client-theme-wrapper";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {

  const noLayoutRoutes = ["/auth/signin", "/auth/signup", "/auth/reset-password"]
  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname)
  const renderWithLayout = isNoLayoutRoute ?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(page: any) {
      return <>{page}</>;
    } :
    Component.getLayout ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function(page: any) {
      return <Layout>{page}</Layout>;
    };

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>
      <ThemeProvider>
        <ClientThemeWrapper>
          <Toaster position="top-right" />
          <NextNProgress color="#3C82F6" options={{ showSpinner: false }} />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {renderWithLayout(<Component {...pageProps} />)}
        </ClientThemeWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
