import { Menu } from "@headlessui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { type Props } from "react-apexcharts";
import { type NextPage } from "next";
import Image from "next/image";
import positionImage from "../../../public/images/positions2.png";
import { GoTriangleUp } from "react-icons/go";
import { type ApexOptions } from "apexcharts";
import { HiDotsVertical } from "react-icons/hi";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import { formatMoneyWithSymbol } from "~/utils/format";
import { useSession } from "next-auth/react";

// const isSSR = () => typeof window === "undefined";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const NetAssetCost: React.FC<Props> = ({ }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      curve: "straight"
    },
    fill: {
      opacity: 0.3
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      min: 0
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    colors: ["#60A5FA"]
  };

  const series = [
    {
      name: "NAC",
      data: [73, 22, 43, 12, 33, 44, 32, 42, 53, 62, 53, 84],
    },
  ];
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={80}
      cl
    />
  );
};

const NetAssetValue: React.FC<Props> = ({ }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      curve: "straight"
    },
    fill: {
      opacity: 0.3
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      min: 0
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    colors: ["#C084FC"]
  };

  const series = [
    {
      name: "NAV",
      data: [53, 32, 33, 52, 13, 44, 32, 42, 43, 52, 53, 64],
    },
  ];
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={80}
      cl
    />
  );
};

const Valuation: React.FC<Props> = ({ }) => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const { data: report } = api.reports.getClientCenterValuationReport.useQuery({ clientId: clientId })
  const options: ApexOptions = {
    chart: {},
    plotOptions: {
      radialBar: {
        offsetY: 0,
        // startAngle: 0,
        // endAngle: 270,
        hollow: {
          margin: 1,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: "'Nunito Sans', sans-serif",
            offsetY: 3
          },
          value: {
            show: true,
            fontSize: "8px",
            fontFamily: "'Nunito Sans', sans-serif",
            offsetY: 5
          }
        }
      }
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: report?.assetAllocationByCategory["this-week"]?.labels ?? [],
    legend: {
      show: true,
      position: "bottom",
      containerMargin: {
        left: 0
      },
      fontSize: "11px",
      fontFamily: "'Nunito Sans', sans-serif",
      fontWeight: "500"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  };
  const series = report?.assetAllocationByCategory["this-week"]?.value.map((val) => val / 100) ?? [];
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="radialBar"
      options={options}
      series={series}
      height={300}
    />
  );
};

const PortfolioCompare: React.FC<Props> = ({ data }) => {
  console.log(data)
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%"
      }
    },

    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      // categories: ["001", "002", "003", "004", "005"],
      categories: data["this-week"].map((item: any) => item.name),
      labels: {
        style: {
          fontSize: "8px"
        }
      }
    },
    yaxis: {
      // title: {
      //   text: "$ (thousands)"
      // },
      labels: {
        style: {
          fontSize: "8px"
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          return "$ " + val + " thousands";
        }
      }
    },
    legend: {
      fontSize: "10px",
      offsetY: 10
    }
  };
  const series = [
    {
      name: "Portfolio History",
      data: data["this-week"].map((item: { name: string, data: number[] }) => item.data.reduce((prev: number, current: number) => prev + current, 0)),
    },
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart type="bar" options={options} series={series} height={255} />
  );
};

const Profit: React.FC<Props> = ({ }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
    tooltip: {
      x: {
        // format: "dd/MM/yy HH:mm",
      }
    },
    colors: ["#3B82F6", "#A78BFA"]
  };

  const series = [
    {
      name: "Principal",
      data: [11, 32, 45, 32, 34, 52, 41, 52, 45, 32, 34, 52]
    },
    {
      name: "Current Value",
      data: [31, 40, 28, 51, 109, 100, 140, 128, 151, 142, 159, 200]
    }
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={300}
    />
  );
};

const Overview: NextPage = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  const { data: valuationData, isLoading: loadingValuation } = api.reports.getClientCenterValuationReport.useQuery({ clientId })
  const { data: accounts } = api.invest.getAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const { data: positionReport } = api.position.getPositionReport.useQuery(accounts?.[0]?.id!)
  const { data: orders } = api.invest.listAccountOrdersAndFundTransactions.useQuery({ accountId: accounts?.[0]?.id! })
  return (
    <>{!loadingValuation ? (<div className="overflow-hidden">
      {/* mini dashboard */}
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Net asset cost */}
            <div className="custom-card flex flex-auto flex-col overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="text-md truncate font-semibold leading-6 tracking-tight">
                  Net Asset Cost
                </div>
                <div className="relative">
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="ml-2 -mt-2 -mr-3 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                          <HiDotsVertical />
                        </Menu.Button>
                        {open && (
                          <Menu.Items
                            as={motion.div}
                            initial={{ height: "0", opacity: "0" }}
                            animate={{ height: "auto", opacity: "1" }}
                            transition={{ duration: "0.15" }}
                            className="absolute -right-0 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={`${active ? "bg-gray-200" : ""
                                    } block whitespace-nowrap px-3 py-4`}
                                  href="#"
                                >
                                  This week
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={`${active ? "bg-gray-200" : ""
                                    } block whitespace-nowrap px-3 py-4`}
                                  href="#"
                                >
                                  Last week
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        )}
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-col">
                  <div className="text-2xl font-semibold leading-tight tracking-tight">
                    {formatMoneyWithSymbol(valuationData?.reportCurrency!, valuationData?.assetAllocationByCategory["this-week"]?.totalCash!)}
                  </div>
                  <div className="">
                    {/* <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-medium leading-none"> */}
                    {/*   <HiTrendingDown className="text-error" /> */}
                    {/*   <span className="text-error">{valuationData.netAssetCost.percentChange}%</span> */}
                    {/*   <span>below projected</span> */}
                    {/* </div> */}
                  </div>
                </div>
                <div className="mt-5 flex flex-auto flex-col">
                  <NetAssetCost />
                </div>
              </div>
            </div>
            {/* Net asset value */}
            <div className="custom-card flex flex-auto flex-col overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="text-md truncate font-semibold leading-6 tracking-tight">
                  Net Asset Value
                </div>
                <div className="relative">
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="ml-2 -mt-2 -mr-3 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                          <HiDotsVertical />
                        </Menu.Button>
                        {open && (
                          <Menu.Items
                            as={motion.div}
                            initial={{ height: "0", opacity: "0" }}
                            animate={{ height: "auto", opacity: "1" }}
                            transition={{ duration: "0.15" }}
                            className="absolute -right-0 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={`${active ? "bg-gray-200" : ""
                                    } block whitespace-nowrap px-3 py-4`}
                                  href="#"
                                >
                                  This week
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={`${active ? "bg-gray-200" : ""
                                    } block whitespace-nowrap px-3 py-4`}
                                  href="#"
                                >
                                  Last week
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        )}
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-col">
                  <div className="text-2xl font-semibold leading-tight tracking-tight">
                    {formatMoneyWithSymbol(valuationData?.reportCurrency!, valuationData?.assetAllocationByCategory["this-week"]?.totalSecurities!)}
                  </div>
                  <div className="">
                    {/* <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-medium leading-none"> */}
                    {/*   <HiTrendingUp className="text-success" /> */}
                    {/*   <span className="text-success">{valuationData.netAssetValue.percentChange}%</span> */}
                    {/*   <span>below projected</span> */}
                    {/* </div> */}
                  </div>
                </div>
                <div className="mt-5 flex flex-auto flex-col">
                  <NetAssetValue />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Asset Allocation */}
            <div className="col-span-1">
              <div className="custom-card flex flex-auto flex-col overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="text-md truncate font-semibold leading-6 tracking-tight">
                    Asset Allocation
                  </div>
                  <div className="relative">
                    <Menu>
                      {({ open }) => (
                        <>
                          <Menu.Button className="ml-2 -mt-2 -mr-3 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                            <HiDotsVertical />
                          </Menu.Button>
                          {open && (
                            <Menu.Items
                              as={motion.div}
                              initial={{ height: "0", opacity: "0" }}
                              animate={{ height: "auto", opacity: "1" }}
                              transition={{ duration: "0.15" }}
                              className="absolute -right-0 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={`${active ? "bg-gray-200" : ""
                                      } block whitespace-nowrap px-3 py-4`}
                                    href="#"
                                  >
                                    This week
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={`${active ? "bg-gray-200" : ""
                                      } block whitespace-nowrap px-3 py-4`}
                                    href="#"
                                  >
                                    Last week
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          )}
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div>
                  <Valuation />
                </div>
              </div>
            </div>
            {/* Portfolio size */}
            <div className="col-span-1">
              <div className="custom-card flex flex-auto flex-col overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="text-md truncate font-semibold leading-6 tracking-tight">
                    Allocation History
                  </div>
                  <div className="relative">
                    <Menu>
                      {({ open }) => (
                        <>
                          <Menu.Button className="ml-2 -mt-2 -mr-3 cursor-pointer rounded-full p-2 text-gray-700 transition duration-500 ease-in-out hover:bg-gray-200 hover:shadow">
                            <HiDotsVertical />
                          </Menu.Button>
                          {open && (
                            <Menu.Items
                              as={motion.div}
                              initial={{ height: "0", opacity: "0" }}
                              animate={{ height: "auto", opacity: "1" }}
                              transition={{ duration: "0.15" }}
                              className="absolute -right-0 z-10 divide-y-2 divide-gray-200 rounded-sm bg-gray-50 text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={`${active ? "bg-gray-200" : ""
                                      } block whitespace-nowrap px-3 py-4`}
                                    href="#"
                                  >
                                    This week
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={`${active ? "bg-gray-200" : ""
                                      } block whitespace-nowrap px-3 py-4`}
                                    href="#"
                                  >
                                    Last week
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          )}
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div>
                  <PortfolioCompare data={valuationData?.allocationHistory} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Positions */}
        <div className="custom-card flex h-auto flex-auto flex-col overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="text-md truncate font-semibold leading-6 tracking-tight">
              Positions
            </div>
            <div className="relative">
              <Link
                href={`/invest/trading/market-data`}
                className="text-xs hover:text-primary"
              >
                See all
              </Link>
            </div>
          </div>
          <div className="overflow mt-4 space-y-2">
            {positionReport?.positionInstruments?.map((position, index) => (
              <div key={index} className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out hover:scale-105 hover:bg-transparent hover:shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={positionImage}
                      alt="position-image"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mx-4 flex flex-auto flex-col">
                      <span className="text-base font-bold">{position.secId}</span>
                      <span className="sub-header">{position.marketCode}</span>
                    </div>
                  </div>
                  <div className=" mx-4 flex flex-col">
                    <span className="text-base font-bold">{formatMoneyWithSymbol(position?.instrumentCurrency!, position.currentPrice)}</span>
                    <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success">
                      <GoTriangleUp className="" />
                      <div className="flex flex-col text-xs">
                        <span>{position.currentValue}</span>
                        <span>{position.currencyRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
      {/* Profit */}
      {/* <div className="custom-card my-4"> */}
      {/*   <div className="text-md mb-4 truncate font-semibold leading-6 tracking-tight"> */}
      {/*     Profit */}
      {/*   </div> */}
      {/*   <div className="mt-4 flex justify-start gap-12"> */}
      {/*     <div className="flex flex-col space-y-1"> */}
      {/*       <span className="text-xs font-bold text-gray-500"> */}
      {/*         Overall Invested */}
      {/*       </span> */}
      {/*       <div className="flex items-baseline space-x-2"> */}
      {/*         <span className="text-2xl font-bold leading-tight tracking-tight"> */}
      {/*           ${formatMoney(valuationData.profit.overallInvested.value)} */}
      {/*         </span> */}
      {/*         <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-medium leading-none"> */}
      {/*           <HiTrendingDown className="text-error" /> */}
      {/*           <span className="text-error">2%</span> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*     <div className="flex flex-col space-y-1"> */}
      {/*       <span className="text-xs font-bold text-gray-500">Average</span> */}
      {/*       <div className="flex items-baseline space-x-2"> */}
      {/*         <span className="text-2xl font-bold leading-tight tracking-tight"> */}
      {/*           {valuationData.profit.average.value}% */}
      {/*         </span> */}
      {/*         <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-medium leading-none"> */}
      {/*           <HiTrendingDown className="text-error" /> */}
      {/*           <span className="text-error">{valuationData.profit.average.percentChange}%</span> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*     <div className="flex flex-col space-y-1"> */}
      {/*       <span className="text-xs font-bold text-gray-500"> */}
      {/*         Overall Profit */}
      {/*       </span> */}
      {/*       <div className="flex items-baseline space-x-2"> */}
      {/*         <span className="text-2xl font-bold leading-tight tracking-tight"> */}
      {/*           ${formatMoney(valuationData.profit.overallProfit.value)} */}
      {/*         </span> */}
      {/*         <div className="flex items-center space-x-1 whitespace-nowrap text-xs font-medium leading-none"> */}
      {/*           <HiTrendingDown className="text-error" /> */}
      {/*           <span className="text-error">{valuationData.profit.overallProfit.percentChange}%</span> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </div> */}
      {/*   <Profit /> */}
      {/* </div> */}
      <div className="grid flex-auto grid-cols-3 gap-4">
        <div className="col-span-3 ">
          {/* Recent Transactions */}
          <div className="custom-card flex flex-auto flex-col overflow-x-auto">
            <div className="text-md truncate font-semibold leading-6 tracking-tight">
              Recent Transactions
            </div>
            <div className="mt-4 flex items-center justify-center overflow-hidden rounded-xl">
              <div className="w-full">
                <div className=" bg-gray-50 shadow-md">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className=" bg-gray-200 text-xs font-semibold capitalize leading-normal tracking-wide text-gray-500">
                        <th className="py-3 px-6 text-left">Order No.</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Market Code</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-left">Trans Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs h-40 font-light text-gray-600">
                      {
                        orders?.map((order, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                {order.orderNo}
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center">
                                {order.orderDesc}
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center">
                                {order.marketCode}
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="pills pills-primary">{order.orderStatus}</span>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span>{order.createdAt.split("T")[0]!}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Positions */}
        {/* <div className="custom-card flex flex-auto flex-col overflow-y-auto"> */}
        {/*   <div className="flex items-center justify-between"> */}
        {/*     <div className="text-md truncate font-semibold leading-6 tracking-tight"> */}
        {/*       Positions */}
        {/*     </div> */}
        {/*     <div className="relative"> */}
        {/*       <Link */}
        {/*         href={`/invest/trading/market-data`} */}
        {/*         className="text-xs hover:text-primary" */}
        {/*       > */}
        {/*         See all */}
        {/*       </Link> */}
        {/*     </div> */}
        {/*   </div> */}
        {/*   <div className="mt-4 space-y-2 overflow-y-auto"> */}
        {/*     <div className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out  hover:shadow"> */}
        {/*       <div className="flex items-center justify-between"> */}
        {/*         <div className="flex items-center"> */}
        {/*           <Image */}
        {/*             src={amazon} */}
        {/*             alt="amzn" */}
        {/*             className="h-12 w-12 rounded-full object-cover" */}
        {/*           /> */}
        {/*           <div className="mx-4 flex flex-auto flex-col"> */}
        {/*             <span className="text-base font-bold">Amazon</span> */}
        {/*             <div className="sub-header flex items-center space-x-4"> */}
        {/*               <span className="">amzn</span> */}
        {/*               <span>--</span> */}
        {/*               <span className="font-extrabold text-gray-900"> */}
        {/*                 25 units */}
        {/*               </span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*         <div className=" mx-4 flex flex-col justify-end"> */}
        {/*           <span className="text-base font-bold">$6393.97</span> */}
        {/**/}
        {/*           <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success"> */}
        {/*             <GoTriangleUp className="" /> */}
        {/**/}
        {/*             <div className="flex flex-col text-xs"> */}
        {/*               <span>4.45%</span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out hover:bg-transparent hover:shadow"> */}
        {/*       <div className="flex items-center justify-between"> */}
        {/*         <div className="flex items-center"> */}
        {/*           <Image */}
        {/*             src={apple} */}
        {/*             alt="amzn" */}
        {/*             className="h-12 w-12 rounded-full object-cover" */}
        {/*           /> */}
        {/*           <div className="mx-4 flex flex-auto flex-col"> */}
        {/*             <span className="text-base font-bold capitalize"> */}
        {/*               Apple */}
        {/*             </span> */}
        {/*             <div className="sub-header flex items-center space-x-4"> */}
        {/*               <span className="">appl</span> */}
        {/*               <span>--</span> */}
        {/*               <span className="font-extrabold text-gray-900"> */}
        {/*                 12 units */}
        {/*               </span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*         <div className=" mx-4 flex flex-col"> */}
        {/*           <span className="text-base font-bold">$2247.86</span> */}
        {/*           <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success"> */}
        {/*             <GoTriangleUp className="" /> */}
        {/*             <div className="flex flex-col text-xs"> */}
        {/*               <span>-1.41%</span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out hover:bg-transparent hover:shadow"> */}
        {/*       <div className="flex items-center justify-between"> */}
        {/*         <div className="flex items-center"> */}
        {/*           <Image */}
        {/*             src={tesla} */}
        {/*             alt="amzn" */}
        {/*             className="h-12 w-12 rounded-full object-cover" */}
        {/*           /> */}
        {/*           <div className="mx-4 flex flex-auto flex-col"> */}
        {/*             <span className="text-base font-bold capitalize"> */}
        {/*               tesla */}
        {/*             </span> */}
        {/*             <span className="sub-header">tsla</span> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*         <div className=" mx-4 flex flex-col"> */}
        {/*           <span className="text-base font-bold">$727.31</span> */}
        {/*           <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success"> */}
        {/*             <GoTriangleUp className="" /> */}
        {/*             <div className="flex flex-col text-xs"> */}
        {/*               <span>4.72%</span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out hover:bg-transparent hover:shadow"> */}
        {/*       <div className="flex items-center justify-between"> */}
        {/*         <div className="flex items-center"> */}
        {/*           <Image */}
        {/*             src={google} */}
        {/*             alt="amzn" */}
        {/*             className="h-12 w-12 rounded-full object-cover" */}
        {/*           /> */}
        {/*           <div className="mx-4 flex flex-auto flex-col"> */}
        {/*             <span className="text-base font-bold">Google</span> */}
        {/*             <span className="sub-header">googl</span> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*         <div className=" mx-4 flex flex-col"> */}
        {/*           <span className="text-base font-bold">$1805.64</span> */}
        {/*           <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success"> */}
        {/*             <div> */}
        {/*               <GoTriangleUp /> */}
        {/*             </div> */}
        {/*             <div className="flex flex-col text-xs"> */}
        {/*               <span>0.92%</span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="rounded-md bg-gray-200 p-2 transition duration-1000 ease-in-out hover:bg-transparent hover:shadow"> */}
        {/*       <div className="flex items-center justify-between"> */}
        {/*         <div className="flex items-center"> */}
        {/*           <Image */}
        {/*             src={chase} */}
        {/*             alt="amzn" */}
        {/*             className="h-12 w-12 rounded-full object-cover" */}
        {/*           /> */}
        {/*           <div className="mx-4 flex flex-auto flex-col"> */}
        {/*             <span className="text-base font-bold"> */}
        {/*               JPMorgan Chase & Co */}
        {/*             </span> */}
        {/*             <span className="sub-header">jpm</span> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*         <div className=" mx-4 flex flex-col"> */}
        {/*           <span className="text-base font-bold">$149.81</span> */}
        {/*           <div className="flex items-start justify-end space-x-1  font-bold uppercase tracking-wide text-success"> */}
        {/*             <GoTriangleUp className="" /> */}
        {/*             <div className="flex flex-col text-xs"> */}
        {/*               <span>0.94%</span> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </div> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>) : <div className="flex justify-center min-h-[70vh] items-center">Loading...</div>}</>
  );
};

export default Overview;
