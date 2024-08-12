import dynamic from "next/dynamic";
import InsureLayout from "~/components/layout/page/insure-layout";
import { NextPageWithLayout } from "../_app";

const Insure: NextPageWithLayout = () => {
  const Overview = dynamic(() => import("./overview"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* @ts-ignore */}
        <Overview />
      </main>
    </>
  );
};

Insure.getLayout = function(page) {
  return <InsureLayout>{page}</InsureLayout>;
};
export default Insure;
