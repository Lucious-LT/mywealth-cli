import dynamic from "next/dynamic";
import { NextPageWithLayout } from "~/pages/_app";
import InvestLayout from "~/components/layout/page/invest-layout";

const FixedIncome: NextPageWithLayout = () => {
  const FixedIncome = dynamic(() => import("./fixed-income"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* @ts-ignore */}
        <FixedIncome />
      </main>
    </>
  );
};

FixedIncome.getLayout = function(page: any) {
  return <InvestLayout>{page}</InvestLayout>;
};
export default FixedIncome;
