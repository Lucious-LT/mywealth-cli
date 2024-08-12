import dynamic from "next/dynamic";
import { NextPageWithLayout } from "~/pages/_app";
import InvestLayout from "~/components/layout/page/invest-layout";

const Accounts: NextPageWithLayout = () => {
  const Accounts = dynamic(() => import("./accounts"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* @ts-ignore */}
        <Accounts />
      </main>
    </>
  );
};

Accounts.getLayout = function(page: any) {
  return <InvestLayout>{page}</InvestLayout>;
};
export default Accounts;
