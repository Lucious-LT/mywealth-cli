import { Menu } from "@headlessui/react";
import { ApexOptions } from "apexcharts";
import { motion } from "framer-motion";
import { NextPage } from "next";

import {
  HiArrowRight,
  HiDotsVertical,
} from "react-icons/hi";
import { TbCar, TbFirstAidKit, TbHeartbeat, TbHome, TbMoneybag, TbWaterpolo } from "react-icons/tb";
import { Props } from "react-select";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Claim, Policy as PolicyAccount } from "~/server/api/models/insurance";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PolicyStats: React.FC<Props> = ({ }) => {
  const options: ApexOptions = {
    chart: {},
    plotOptions: {
      radialBar: {
        offsetY: 0,
        // startAngle: 0,
        // endAngle: 270,
        hollow: {
          margin: 1,
          size: "10%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "30px",
            fontWeight: "600",
            fontFamily: "'Nunito Sans', sans-serif",
            offsetY: 5
          },
          value: {
            show: true,
            fontSize: "20px",
            fontFamily: "'Nunito Sans', sans-serif",
            offsetY: 5
          }
        }
      }
    },
    colors: ["#3b82f6cc", "#ff5724cc", "#22c55ecc", "#37cdbecc", "#ff9900", "#3d4451"],
    labels: ["Health Insurance", "Life Insurance", "Auto Insurance", "Property Insurance", "Loan Insurance", "Marine Insurance"],
    legend: {
      show: true,
      position: "left",
      containerMargin: {
        left: 0
      },
      fontSize: "15px",
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
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="radialBar"
      options={options}
      series={series}
      height={700}
    />
  );
};

let series = [0, 0, 0, 0, 0, 0];

const Overview: NextPage = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  const [policies, setPolicies] = useState<PolicyAccount[]>([]);

  // fetch policies
  const { data: policiesData, isLoading: loadingPolicies } =
    api.insurance.getPoliciesForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  useEffect(() => {
    if (policiesData) {
      setPolicies(policiesData);
    }
  }, [policiesData])

  // set the policy stat data
  const productLabelsToCount = [
    "Health Insurance",
    "Life Insurance",
    "Auto Insurance",
    "Property Insurance",
    "Loan Insurance",
    "Marine Insurance"
  ];
  // Count occurrences of each unique productLabel
  const productCounts = productLabelsToCount.reduce((counts:any, label:any) => {
    const count = policies.filter(policy => policy.productLabel === label).length;
    counts[label] = count;
    return counts;
  }, {});
  // Convert productCounts object to an array of counts in format in the policy stat
  series = Object.values(productCounts);

  // fetch overwiew data
  const { data: overviewData, isLoading: loading } =
    api.insurance.getOverviewData.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  // todo - the currency
  const autoInsurance = overviewData?.find(d => d.productLabel === "Auto Insurance") ?? 0;
  const lifeInsurance = overviewData?.find(d => d.productLabel === "Life Insurance") ?? 0;
  const healthInsurance = overviewData?.find(d => d.productLabel === "Health Insurance") ?? 0.00;
  const propertyInsurance = overviewData?.find(d => d.productLabel === "Property Insurance") ?? 0.00;
  const loanInsurance = overviewData?.find(d => d.productLabel === "Loan Insurance") ?? 0.00;
  const marineInsurance = overviewData?.find(d => d.productLabel === "Marine Insurance") ?? 0.00;

  // fetch cliams
  const { data: claimsData, isLoading: loadingClaimsData } =
    api.insurance.getClaimsForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  const [claims, setClaims] = useState<Claim[]>(claimsData ?? []);
  const loggedClaim = claims.filter(claim => claim.status === 'PAID').length;
  const openClaim = claims.filter(claim => claim.status === 'PENDING').length;
  const closeClaim = claims.filter(claim => claim.status === 'APPROVED').length;
  const deniedClaim = claims.filter(claim => claim.status === 'DENIED').length;

  function formattedAmount(amount: number) {
    return amount > 0 ? amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'NGN',
    }) : 0;
  }

  return (
    <>
      <div className="my-4 grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-primary">
                Health Insurance
              </span>
              <div className="rounded-full bg-primary bg-opacity-80 px-3 py-3 shadow-lg">
                <TbFirstAidKit className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(healthInsurance.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-error">
                Life Insurance
              </span>
              <div className="rounded-full bg-error bg-opacity-80 px-3 py-3 shadow-lg">
                <TbHeartbeat className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(lifeInsurance?.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-success">
                Auto Insurance
              </span>
              <div className="rounded-full bg-success bg-opacity-80 px-3 py-3 shadow-lg">
                <TbCar className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(autoInsurance?.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-accent">
                Property Insurance
              </span>
              <div className="rounded-full bg-accent bg-opacity-80 px-3 py-3 shadow-lg">
                <TbHome className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(propertyInsurance.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-accent">
                Loan Insurance
              </span>
              <div className="rounded-full bg-warning bg-opacity-80 px-3 py-3 shadow-lg">
                <TbMoneybag className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(loanInsurance.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="custom-card flex flex-auto flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-md truncate font-semibold leading-6 tracking-tight text-accent">
                Marine Insurance
              </span>
              <div className="rounded-full bg-neutral bg-opacity-80 px-3 py-3 shadow-lg">
                <TbWaterpolo className="text-3xl text-white" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <span className="header">Value Insured</span>
                <div className="text-2xl font-semibold leading-tight tracking-tight">
                  {formattedAmount(marineInsurance.sumInsured)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <div className="flex flex-auto flex-col p-4">
            <div className="flex items-center justify-between">
              <div className="text-md shadow-lgtruncate flex items-end space-x-2 font-semibold leading-6 ">
                <span className="text-5xl tracking-widest ">{loggedClaim}</span>
                <span className="header">Logged Claims</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-auto flex-col p-4">
            <div className="flex items-center justify-between">
              <div className="text-md shadow-lgtruncate flex items-end space-x-2 font-semibold leading-6 ">
                <span className="text-5xl tracking-widest ">{openClaim}</span>
                <span className="header">Open Claims</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-auto flex-col p-4">
            <div className="flex items-center justify-between">
              <div className="text-md shadow-lgtruncate flex items-end space-x-2 font-semibold leading-6 ">
                <span className="text-5xl tracking-widest ">{closeClaim}</span>
                <span className="header">Closed Claims</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="my-4 flex flex-auto flex-col">
          <button className="primary-btn">
            <HiArrowRight className="mr-2" />
            see all
          </button>
        </div> */}
      </div>
      {/* Portfolio policy stat */}
      <div className="custom-card my-4">
        <div className="flex items-center justify-between">
          <div className="text-md mb-4 truncate font-semibold leading-6 tracking-tight">
            Policies
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
        <PolicyStats />
      </div>
    </>
  );
};
export default Overview;
