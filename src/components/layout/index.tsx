import Footer from "~/components/layout/footer";
import Head from "next/head";
import React from "react";
import Navbar from "~/components/layout/navbar";
import Back from "~/components/layout/back";
export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title>MyWealth - Client Portal</title>
        <meta name="description" content="MyWealth Client Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex-row">
        <div>
          <Navbar currentView={children.type.name} />
        </div>

        <div className="max-w-11xl relative mx-auto bg-gray-100 px-5 py-16 font-nun sm:px-10 lg:px-8">
          <div className=" absolute top-0 right-0 py-3 pr-5">
            {/* <NewBreadcrumbs currentView={children.type.name} /> */}
            <Back />
          </div>
          <div className="rounded-2xl bg-white p-5 dark:bg-black dark:bg-opacity-5 md:border-2 md:border-dashed md:border-gray-300 lg:p-20">
            <main>{children}</main>
          </div>
        </div>
        <div className="sticky top-[100vh] my-5">
          <Footer />
        </div>
      </div>
    </>
  );
}
