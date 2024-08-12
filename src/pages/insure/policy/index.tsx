import { Dialog, Tab, Transition } from "@headlessui/react";
import {
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useState, useEffect } from "react";
import { PolicyAccordion } from "~/pages/insure/policy/policy-accordion";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import InsureLayout from "~/components/layout/page/insure-layout";
import {
  coverageType,
  paymentTerms,
} from "~/components/data/insurance-data";

import {
  CurrencyFormatter,
} from "~/components/util/currency-formatter";
import { NumberFormatter } from "~/components/util/number-formatter";
import CardHeader from "~/components/layout/card-header";
import SlideOver from "~/components/navigation/slide-over";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Branch,
  Claim as ClaimAccount,
  InsuranceProduct,
  Partner,
  Payment,
  Policy as PolicyAccount,
  Quote as QuoteAccount
} from "~/server/api/models/insurance";
import { LoadingSpinner } from "~/components/util/spinner";
import { QuoteRequestType } from "~/server/api/routers/insure";
import { formatErrorMssg } from "~/utils/format";
import {
  ErrorDisplay,
  SuccessDisplay
} from "~/components/ui/error-display";
import { CurrencyCode } from "~/server/api/models/accounting";
import { HiArrowNarrowRight, HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";
import { BsSliders2 } from "react-icons/bs";
import { PolicyCardSlideOver } from "~/components/navigation/policy-card-slide-over";

const Policy = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  const [currentIndex, setCurrentIndex] = useState(-1);

  // fetch policies data
  const { data: policiesData, isLoading: loadingPolicies } =
    api.insurance.getPoliciesForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  const [policies, setPolicies] = useState<PolicyAccount[]>(policiesData ?? []);

  const toggle = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };

  // fetch payments for client policies
  const { data: paymentsData, isLoading: loadingPayment } =
    api.insurance.getPaymentForCLient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    })
  const payments: Payment[] = paymentsData ?? [];

  const [openPaymentSchedule, setOpenPaymentSchedule] = useState(false);
  const [paymentSchedule, setPaymentSchedule] = useState(payments);

  const handleOpenPaymentSchedule = (index: number, id: string) => {
    setOpenPaymentSchedule(true);
    const res = payments.filter((obj) => obj.policyId === id);
    setPaymentSchedule(res);
  };

  useEffect(() => {
    if (policiesData) {
      setPolicies(policiesData);
    }
  }, [policiesData]);

  const [policyItem, setPolicyItem] = useState<PolicyAccount>();
  // open policy details card slider
  const [policyDetailsCardOpen, setPolicyDetailsCardOpen] = useState(false);

  // @ts-ignore 
  return (
    <>
      <PolicyCardSlideOver
        setItem={setPolicyItem}
        detailsCardOpen={policyDetailsCardOpen}
        setDetailsCardOpen={setPolicyDetailsCardOpen}
        item={policyItem}
      />
      <div className="mb-8 relative">
        <div className="flex items-center ">
          <CardHeader title="My Policies" />
        </div>
        <div className="absolute right-0 top-0 flex justify-between">
          <div className="relative">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="secondary-btn flex items-center">
                    <BsSliders2 />
                    <span className="ml-2">Filter</span>
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      as={motion.div}
                      initial={{ height: "0", opacity: "0" }}
                      animate={{ height: "auto", opacity: "1" }}
                      transition={{ duration: "0.15" }}
                      className="absolute right-0 z-10 mt-2 divide-y-1 divide-gray-200 rounded-sm bg-gray-50 text-center text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                    >
                      {/* {statusFilter &&
                        statusFilter.map((status, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                className={`${active ? "text-primary" : ""
                                  } block whitespace-nowrap px-2 py-2`}
                                value={status.value}
                                onClick={handleFixedDepositStatusFilter}
                              >
                                {capitalize(status.name.replaceAll("-", " "))}
                              </button>
                            )}
                          </Menu.Item>
                        ))} */}
                    </Menu.Items>
                  )}
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <div className={`${loadingPolicies && `items-center`} flex flex-col space-y-4 overflow-hidden`}>
        {loadingPolicies ?
          <LoadingSpinner size="lg" label="Loading Policies" lookup /> : policies && policies.length < 1 ?
            <div className="flex justify-center items-center text-xl">No Record</div> :
            policies?.length == 0 ?
              <div className="flex justify-center items-center text-xl">No Record Found</div> :
              policies?.map((policy, index) => (
                <div
                  className="relative cursor-default rounded-md  bg-gray-50 px-6 py-8 hover:shadow"
                  key={policy?.id}
                >
                  <div className="flex items-center capitalize mb-2">
                    <span
                      className={classNames(
                        policy?.status === "APPROVED" ? "pills-success" :
                          policy?.status === "ACTIVE" ? "pills-success"
                            : policy?.status === "PENDING"
                              ? "pills-secondary"
                              : policy?.status === "CANCELLED"
                                ? "pills-primary"
                                : "pills-error",
                        "pills"
                      )}
                    >
                      {policy?.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <div className="flex flex-auto flex-col space-y-1 text-sm font-bold">
                        <span
                          onClick={() => {
                            setPolicyItem(policy);
                            setPolicyDetailsCardOpen(!policyDetailsCardOpen);
                          }}
                          className="cursor-pointer text-primary hover:text-opacity-70 w-fit"
                        >
                          {`${policy?.policyLabel} - ${policy?.policyNo}`}
                        </span>
                        <span className="text-xs flex">
                          <span className="sub-header">Premium - {" "}</span>
                          <span className="flex">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(policy?.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(policy?.premium as number)}
                            </span>
                          </span>
                        </span>
                        <span className="text-xs">
                          <span className="sub-header">Description - {" "}</span>
                          {policy?.notes}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-4">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {policy?.productType}
                            </span>
                            <span className="sub-header">Product Type</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(policy?.startDate as string)}
                          </span>
                          <span className="sub-header">Start Date</span>
                        </div>
                        <div className="flex items-center font-normal text-gray-600">
                          <HiArrowNarrowRight />
                        </div>
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {policy?.refPolicyNo ? policy?.refPolicyNo : "-"}
                            </span>
                            <span className="sub-header">Reference #</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(policy?.endDate)}
                          </span>
                          <span className="sub-header">End Date</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-16">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex items-center text-gray-900">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(policy?.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(policy?.scheduledAmount as number)}
                            </span>
                          </div>
                          <span className="sub-header">Scheduled Amount</span>
                          <div className="flex flex-col text-sm ">
                            <span className="font-semibold text-sm">
                              {`${DateToStringFormatter(policy?.updatedAt.split("T")[0] as unknown as Date)} ${policy?.updatedAt.split("T")[1]?.split(".")[0] as string}`}
                            </span>
                            <span className="sub-header">Last updated</span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-around h-full text-sm ">
                          <div className="mb-5">
                            <div className="flex items-center text-gray-900">
                              <span className="text-base font-extrabold">
                                {CurrencyFormatter(policy?.currency)}
                              </span>
                              <span className="font-semibold">
                                {NumberFormatter(policy?.sumInsured as number)}
                              </span>
                            </div>
                            <span className="sub-header">Sum Insurred</span>
                          </div>
                          <button
                            className="tertiary-btn"
                            onClick={() =>
                              handleOpenPaymentSchedule(index, policy.id)
                            }
                          >
                            See payment schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
        }
      </div>
      {/* Card slide over - quote details  */}
      <SlideOver
        open={openPaymentSchedule}
        setOpen={setOpenPaymentSchedule}
        title={undefined}
        size="md"
      >
        <div className="space-y-8 overflow-auto">
          <div className="space-y-2">
            <div className="truncate text-xl font-bold leading-6 tracking-tight">
              {paymentSchedule[0]?.policyLabel}
            </div>

            <span className="rounded-xl bg-blue-200 px-2 py-0.5 text-xs text-primary">
              {paymentSchedule[0]?.status}
            </span>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <ul className="divide-y-1 divide-gray-300 text-xs">
              <li className="flex justify-between py-2 pl-2">
                <span className="text-gray-600">Policy #</span>
                <span className="font-semibold text-gray-900">
                  {paymentSchedule[0]?.policyNo}
                </span>
              </li>
              <li className="flex justify-between py-2 pl-2">
                <span className="text-gray-600">Product Type</span>
                <span className="font-semibold capitalize text-gray-900">
                  {paymentSchedule[0]?.productType}
                </span>
              </li>
              <li className="flex justify-between py-2 pl-2">
                <span className="text-gray-600">Payment Terms</span>
                <span className="font-semibold capitalize text-gray-900">
                  {paymentSchedule[0]?.paymentTerms}
                </span>
              </li>
            </ul>
          </div>
          <div className="">
            <div className="mb-4 truncate text-sm font-semibold leading-6 tracking-tight">
              Schedule
            </div>
            <div className="min-w-screen min-h-screenflex items-center justify-center overflow-hidden rounded-xl">
              <div className="w-full space-y-4">
                {paymentSchedule.map((payment) => (
                  <div className="bg-gray-50 p-4" key={payment.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-2 ">
                        <span className="text-xs font-semibold">
                          {payment.label}
                        </span>
                        <span className="text-[10px] font-bold tracking-wide text-error">
                          Due date: {DateToStringFormatter(payment.dueDate ?? "00")}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-gray-900">
                          <span className="text-sm font-extrabold">
                            {CurrencyFormatter(payment.currency)}
                          </span>
                          <span className="text-xs font-semibold">
                            {NumberFormatter(payment.amount)}
                          </span>
                        </div>
                        <span className="rounded-xl px-2 py-0.5 text-xs font-bold text-primary">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SlideOver>
    </>
  );
};

Policy.getLayout = function (page: any) {
  return <InsureLayout>{page}</InsureLayout>;
};

export default Policy;
