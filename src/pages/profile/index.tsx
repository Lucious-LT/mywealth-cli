

import React from "react";
import dynamic from "next/dynamic";
import { type NextPageWithLayout } from "../_app";
import ProfileLayout from "~/components/layout/page/account-setting-layout";

const Profile: NextPageWithLayout = () => {
  const Overview = dynamic(() => import("./profile"), {
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

Profile.getLayout = function(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
export default Profile;
