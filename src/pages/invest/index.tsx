import React from "react";
import dynamic from "next/dynamic";
import { type NextPageWithLayout } from "../_app";
import InvestLayout from "~/components/layout/page/invest-layout";

const Invest: NextPageWithLayout = () => {
  const Overview = dynamic(() => import("./overview"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Overview />
      </main>
    </>
  );
};

Invest.getLayout = function(page) {
  return <InvestLayout>{page}</InvestLayout>;
};
export default Invest;
