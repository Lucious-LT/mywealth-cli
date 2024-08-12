import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  Input,
  Select,
  Option,
  Tooltip,
} from "@material-tailwind/react";
import { capitalize, capitalizeWords, formatMoney } from "~/utils/format";
import { HiArrowNarrowUp, HiInformationCircle } from "react-icons/hi";
import { FixedDepositTransaction, FixedDepositTransactionRequest } from "~/server/api/models/investing";
import { api } from "~/utils/api";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { ErrorDisplay, SuccessDisplay } from "../ui/error-display";
import classNames from "classnames";
import ConfirmTerminateModal from "../modals/confirm-terminate";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NumberFormatter } from "../util/number-formatter";
import { CurrencyFormatter } from "../util/currency-formatter";
import { AnyProcedureBuilderDef } from "@trpc/server/dist/core/internals/procedureBuilder";
import { DateToStringFormatter } from "~/components/util/date-formatter";

export const PolicyCardSlideOver = ({
  setItem, detailsCardOpen, setDetailsCardOpen, item
}: {
  detailsCardOpen: any,
  setItem: any
  item: any
  setDetailsCardOpen: any
}) => {
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const [update, setUpdate] = useState(false);
  const clientId = sessionData?.user.clientId ?? "";

  return (
    <Transition.Root show={detailsCardOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={(e) => {
          setDetailsCardOpen(e)
          setUpdate(e)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-3xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className=" rounded-full bg-gray-800 p-1 text-xs font-medium text-white shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300 focus:outline-none"
                        onClick={() => setDetailsCardOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll rounded-l-xl bg-white py-12 font-nun shadow-xl">
                    <div className=" mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}
                      {item && <>
                        <div className="space-y-8 overflow-auto">
                          <div className="space-y-2">
                            <div className="truncate text-xl font-semibold leading-6 tracking-tight">
                              {`${item.policyLabel} - ${item?.policyNo}`}
                            </div>
                            <div className="space-x-2 text-xs">
                              <span
                                className={classNames(
                                  item?.status === "APPROVED" ? "pills-success" :
                                    item?.status === "ACTIVE" ? "pills-success"
                                      : item?.status === "PENDING"
                                        ? "pills-secondary"
                                        : item?.status === "CANCELLED"
                                          ? "pills-primary"
                                          : "pills-error",
                                  "pills"
                                )}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4">
                            <div className="grid grid-cols-5 gap-1">
                              <div className="col-span-3 ">
                                <div className="mt-3 flex items-start space-x-4">
                                  <div className="flex flex-col ">
                                    <div className="mb-1 text-lg font-semibold leading-tight tracking-tight">
                                      <span className="font-semibold">
                                        {item.paymentTerms}
                                      </span>
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Payment Terms</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col"></div>
                                </div>
                              </div>
                              <div className="flex flex-auto col-span-2 flex-col ">
                                <div className="mt-3 flex items-end space-x-4">
                                  <div className="flex flex-col ">
                                    <div className="mb-1 text-lg font-semibold leading-tight tracking-tight">
                                      <span className="font-semibold">
                                        {item.partnerLabel}
                                      </span>
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Carrier</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-4 text-xs">
                              <ul className="divide-y-1 divide-gray-300">
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">Scheduled Amount</span>
                                  <div className="flex items-center text-gray-900">
                                    <span className="text-base font-extrabold">
                                      {CurrencyFormatter(item?.currency)}
                                    </span>
                                    <span className="font-semibold">
                                      {NumberFormatter(item?.scheduledAmount as number)}
                                    </span>
                                  </div>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Tax
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {item.tax}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Start Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {item.startDate}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    End Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {item.endDate}
                                  </span>
                                </li>
                              </ul>
                              <ul className="divide-y-1 divide-gray-300">
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Sum Insurred
                                  </span>
                                  <div className="flex items-center text-gray-900">
                                    <span className="text-base font-extrabold">
                                      {CurrencyFormatter(item?.currency)}
                                    </span>
                                    <span className="font-semibold">
                                      {NumberFormatter(item?.sumInsured as number)}
                                    </span>
                                  </div>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Premium
                                  </span>
                                  <div className="flex items-center text-gray-900">
                                    <span className="text-base font-extrabold">
                                      {CurrencyFormatter(item?.currency)}
                                    </span>
                                    <span className="font-semibold">
                                      {NumberFormatter(item?.premium as number)}
                                    </span>
                                  </div>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Risk Type
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {item.riskType}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Last Updated
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${DateToStringFormatter(item?.updatedAt.split("T")[0] as unknown as Date)} ${item?.updatedAt.split("T")[1]?.split(".")[0] as string}`}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="mt-8 flex">
                              <div className="flex flex-col">
                                <div className="mb-1 text-lg font-semibold leading-tight tracking-tight">
                                  <span className="font-semibold">Description</span>
                                </div>
                                <div className="leading-none tracking-wide text-gray-600">
                                  <span className="">{item.notes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
