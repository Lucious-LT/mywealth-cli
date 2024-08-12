import React, { useContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Head from "next/head";
import Navbar from "~/components/layout/navbar";
import Back from "~/components/layout/back";
import Footer from "~/components/layout/footer";
import { TbChartCandle } from "react-icons/tb";
import {
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineClipboardCheck,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { ThemeContext, type themeContextType } from "~/context/theme-context";

export default function InvestLayout({ children }: { children: any }) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext) as themeContextType;

  const data = [
    {
      label: "Overview",
      value: "overview",
      path: "/",
      icon: <HiOutlineChartPie />,
    },
    {
      label: "Accounts",
      value: "accounts",
      path: "/accounts",
      icon: <HiOutlineClipboardCheck />,
    },
    {
      label: "Fixed Income",
      value: "fixed-income",
      path: "/fixed-income",
      icon: <HiOutlineTrendingUp />,
    },
    {
      label: "Trading",
      value: "trading",
      path: "/trading",
      icon: <HiOutlineChartBar />,
    },
    {
      label: "Market Data",
      value: "marketdata",
      path: "/market-data",
      icon: <TbChartCandle />,
    },
  ];

  const recentTab = () => {
    if (router.pathname === "/invest") return "overview";
    else if (router.pathname === "/invest/accounts") return "accounts";
    else if (router.pathname === "/invest/fixed-income") return "fixed-income";
    else if (router.pathname === "/invest/trading") return "trading";
    else if (router.pathname === "/invest/market-data") return "market-data";
  };

  const [currentTab, setCurrentTab] = useState(recentTab);

  const changeTab = (tab: React.SetStateAction<string | undefined>) => {
    setCurrentTab(tab);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    void router.push(`/invest${tab}`);
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

        <div className={theme == "light" ? "max-w-11xl relative mx-auto bg-gray-100 dark:bg-gray-600 px-5 py-10 font-nun sm:px-10 lg:px-8" : "max-w-11xl relative mx-auto dark:bg-gray-600 px-5 py-10 font-nun sm:px-10 lg:px-8"}>
          <div className=" absolute right-0 top-0 py-3 pr-5">
            <Back />
          </div>
          <Tabs value={currentTab} className="flex items-start">
            <TabsHeader
              placeholder={currentTab}
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
                  placeholder={value}
                  onClick={() => changeTab(path)}
                  className={theme == "light" ? "flex justify-start py-3 pl-3 pr-10 text-left text-xs leading-6 tracking-wide hover:rounded-md hover:text-primary" : "flex justify-start py-3 pl-3 pr-10 text-left text-white text-xs leading-6 tracking-wide hover:rounded-md hover:text-primary"}
                >
                  <div className="flex items-center justify-start p-0">
                    <span className="mr-2">{icon}</span>
                    <span>{label}</span>
                  </div>
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody className="py-4"
              placeholder={currentTab}
            >
              <div data-theme={theme} className="min-h-[75vh] rounded-2xl px-10 py-10 dark:bg-black dark:bg-opacity-5 md:border-y-2 md:border-r-2 md:border-dashed md:border-gray-300">
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
