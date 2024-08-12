import React from "react";
import dynamic from "next/dynamic";
import { type NextPageWithLayout } from "../_app";
import CaseManagementLayout from "~/components/layout/page/case-management-layout";

const CaseManagement: NextPageWithLayout = () => {
  const CaseManagement = dynamic(() => import("./case-management"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <CaseManagement />
      </main>
    </>
  );
};

//TODO Fix Layout to have settings as a tab
CaseManagement.getLayout = function(page) {
  return <CaseManagementLayout>{page}</CaseManagementLayout>;
};
export default CaseManagement;
