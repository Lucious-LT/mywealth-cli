import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Head from "next/head";
import Navbar from "~/components/layout/navbar";
import Back from "~/components/layout/back";
import Footer from "~/components/layout/footer";
import {
  TbAnalyze,
  TbBrandGoogleAnalytics,
  TbChartPie,
  TbClipboardCheck,
  TbMoneybag,
} from "react-icons/tb";

export default function InsureLayout({ children }: { children: any }) {
  let router = useRouter();

  const data = [
    {
      label: "Overview",
      value: "overview",
      path: "/",
      icon: <TbChartPie />,
    },
    {
      label: "Policy",
      value: "policy",
      path: "/policy",
      icon: <TbClipboardCheck />,
    },
    {
      label: "Claims",
      value: "claims",
      path: "/claims",
      icon: <TbMoneybag />,
    },
    {
      label: "Payments",
      value: "payments",
      path: "/payments",
      icon: <TbBrandGoogleAnalytics />,
    },
    {
      label: "Statistics",
      value: "stats",
      path: "/stats",
      icon: <TbBrandGoogleAnalytics />,
    },
  ];

  const recentTab = () => {
    if (router.pathname === "/insurance") return "overview";
    else if (router.pathname === "/insurance/policy") return "policy";
    else if (router.pathname === "/insurance/claims") return "claims";
    else if (router.pathname === "/insurance/payments") return "payments";
    else if (router.pathname === "/insurance/stats") return "stats";
  };

  const [currentTab, setCurrentTab] = useState(recentTab);

  const changeTab = (tab: any) => {
    setCurrentTab(tab);
    router.push(`/insure${tab}`);
  };

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

        <div className="max-w-11xl relative mx-auto bg-gray-100 px-5 py-10 font-nun sm:px-10 lg:px-8">
          <div className=" absolute top-0 right-0 py-3 pr-5">
            <Back />
          </div>
          <Tabs value={currentTab} className="flex items-start ">
            <TabsHeader
              placeholder="Search"
              className="mx-0 mt-10 inline-block w-full space-y-6 rounded-none bg-transparent p-0 shadow-none"
              indicatorProps={{
                className:
                  "bg-transparent shadow-none border-r-2 border-primary rounded-none",
                // "bg-transparent shadow-none border-r-2 border-primary rounded-none border-y-2 border-l-2 border-dashed border-gray-300",
              }}
            >
              {data.map(({ label, value, path, icon }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => changeTab(path)}
                  placeholder={label}
                  className="place-content-start py-3 pl-3  pr-10 text-left text-xs leading-6 tracking-wider hover:rounded-md hover:text-primary"
                >
                  <div className="flex items-center p-0">
                    <span className="mr-2">{icon}</span>
                    <span>{label}</span>
                  </div>
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody
              className="py-4"
              placeholder="Search"
            >
              <div className="min-h-screen rounded-2xl bg-white px-10 py-10 dark:bg-black dark:bg-opacity-5 md:border-y-2 md:border-r-2 md:border-dashed md:border-gray-300">
                {children}
              </div>
            </TabsBody>
          </Tabs>
        </div>
        <div className="sticky top-[100vh] my-5">
          <Footer />
        </div>
      </div>
    </>
  );
}
