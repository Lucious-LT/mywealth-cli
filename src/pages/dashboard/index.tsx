import { type NextPage } from "next";

import React from "react";
import dynamic from "next/dynamic";

const Dashboard: NextPage = () => {
  //We need to disable server side rendering for the dashboard component
  const Dashboard = dynamic(() => import('./dashboard'), {
    ssr: false,
  })

  return (
    <>
      <main>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Dashboard />
      </main>
    </>
  );
};

export default Dashboard;
