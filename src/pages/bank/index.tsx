import { type NextPage } from "next";

import React from "react";
import dynamic from "next/dynamic";

const Bank: NextPage = () => {
  //We need to disable server side rendering for the dashboard component
  const Banking = dynamic(() => import("./banking"), {
    ssr: false,
  });
  return (
    <>
      <main>
        {/* @ts-ignore */}
        <Banking />
      </main>
    </>
  );
};

export default Bank;
