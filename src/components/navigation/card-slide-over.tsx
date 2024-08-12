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

export const CardSlideOver = ({
  tbillsDetailscardOpen, settbillsDetailsCardOpen, fixedDeposit, setFixedDepositItem
}: {
  tbillsDetailscardOpen: boolean,
  settbillsDetailsCardOpen: Dispatch<SetStateAction<boolean>>;
  fixedDeposit: FixedDepositTransaction
  setFixedDepositItem: Dispatch<SetStateAction<FixedDepositTransaction | undefined>>
}) => {
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const [update, setUpdate] = useState(false)
  // const [tbillDetails, setTbillDetails] = useState<FixedDepositTransaction | undefined>(tbillDetail ?? undefined)
  const [confirmTerminate, setConfirmTerminate] = useState({ open: false, transactionId: "" })

  const { data: userAccounts } = api.invest.getAccountsForClient.useQuery(sessionData?.user.clientId!)
  const { mutate: updateFixedDeposit, isLoading: isUpdating } = api.invest.updateFixedDepositInvestment.useMutation()

  function getFixedDepositAccount(account: string) {
    return userAccounts?.find(userAccount => userAccount.id! == account)
  }

  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

  const { data: updatedTransaction, refetch } = api.invest.findFixedDepositTransactionById.useQuery({ transactionId: fixedDeposit?.id }, { enabled: responseMessage.success != "" })

  useEffect(() => {
    setFixedDepositItem(updatedTransaction!)
  }, [updatedTransaction])

  let responseMessageTimeout: NodeJS.Timeout;

  // Set timeout for error or success messages
  useEffect(() => {
    if (responseMessage.error || responseMessage.success) {
      responseMessageTimeout = setTimeout(
        () => setResponseMessage({ error: "", success: "" }),
        8000
      );
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
    };
  }, [responseMessage]);

  const handleFixedDepositUpdateSubmit = ({ account, rollOverRule, tenor, amount }: FormikValues) => {
    const fixedDepositContent: FixedDepositTransactionRequest = {
      accountId: getFixedDepositAccount(account)?.id!,
      rolloverRule: rollOverRule,
      productId: fixedDeposit?.productId,
      currency: fixedDeposit?.currency,
      principal: amount,
      startDate: fixedDeposit.startDate,
      tenor: tenor,
      refCode: "",
      interestRate: fixedDeposit.interestRate,
      positionTransferDate: "",
      notes: ""
    }
    updateFixedDeposit({ requestBody: fixedDepositContent, transactionId: fixedDeposit?.id }, {
      onSuccess: () => {
        setResponseMessage({ success: "Transaction updated successfully" })
        refetch();
        utils.invest.listClientFixedDepositTransactions.invalidate()
      },
      onError(error) {
        setResponseMessage({ error: error.message != "" ? error.message : capitalize(error?.data?.code.replaceAll("_", " ")!) })
      },
    })
  }

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      account: fixedDeposit?.accountId,
      rollOverRule: fixedDeposit?.rolloverRule,
      tenor: fixedDeposit?.tenor,
      amount: fixedDeposit?.principal
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      account: yup.string().required("Required"),
      rollOverRule: yup.string().required("Required"),
      tenor: yup.string().required("Required"),
      amount: yup.number().required("Required")
    }),
    onSubmit: handleFixedDepositUpdateSubmit
  })

  return (
    <Transition.Root show={tbillsDetailscardOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={(e) => {
          settbillsDetailsCardOpen(e)
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
                        onClick={() => settbillsDetailsCardOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <ConfirmTerminateModal modal={confirmTerminate} setModal={setConfirmTerminate} />
                  <div className="flex h-full flex-col overflow-y-scroll rounded-l-xl bg-white py-12 font-nun shadow-xl">
                    <div className=" mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}
                      {fixedDeposit && <>
                        <div className="space-y-8 overflow-auto">
                          <div className="space-y-2">
                            <div className="truncate text-xl font-semibold leading-6 tracking-tight">
                              {`${fixedDeposit.productLabel} - ${formatMoney(fixedDeposit.interestRate)}% for ${fixedDeposit.tenor} days`}
                            </div>
                            <div className="space-x-2 text-xs">
                              <span className="font-semibold text-gray-600">
                                {fixedDeposit.productCode}
                              </span>
                              <span className="font-semibold text-black">
                                {"- " + fixedDeposit.orderNo}
                              </span>
                              <span
                                className={classNames(
                                  fixedDeposit.status === FixedDepositTransaction.status.RUNNING ? "pills-success"
                                    : fixedDeposit.status === FixedDepositTransaction.status.PENDING
                                      ? "pills-secondary"
                                      : fixedDeposit.status === FixedDepositTransaction.status.APPROVED
                                        ? "pills-primary"
                                        : "pills-error",
                                  "pills"
                                )}
                              >
                                {fixedDeposit.status}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4">
                            <div className="grid grid-cols-5 gap-1">
                              <div className="col-span-3 ">
                                <div className="mt-3 flex items-start space-x-4">
                                  <div className="flex flex-col ">
                                    <div className="mb-1 text-lg font-semibold leading-tight tracking-tight">
                                      <span className="mr-1">{` ${fixedDeposit.currency}`}</span>
                                      {formatMoney(fixedDeposit.principal)}
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Principal</span>
                                    </div>
                                  </div>
                                  <div className="text-md font-medium leading-tight tracking-tight text-gray-600">
                                    +
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="mb-1 flex items-center gap-2 text-lg font-semibold leading-tight tracking-tight">
                                      <span>
                                        {formatMoney(fixedDeposit.expectedInterest)}
                                      </span>
                                      <div className="flex gap-1 text-xs leading-none tracking-wide text-success">
                                        <HiArrowNarrowUp />
                                        <span>{formatMoney(fixedDeposit?.effectiveRate ?? 0.00)}%</span>
                                      </div>
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Expected Interest</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col"></div>
                                </div>
                              </div>
                              <div className="flex flex-auto col-span-2 flex-col ">
                                <div className="mt-3 flex items-end space-x-4">
                                  <div className="flex flex-col ">
                                    <div className="mb-1 flex items-center gap-2 text-lg  font-semibold leading-tight tracking-tight">
                                      <span>
                                        {formatMoney(fixedDeposit.principal + fixedDeposit.expectedInterest - fixedDeposit.totalFees)}
                                        {/* <span className="text-sm">{` ${tbillDetails.currency}`}</span> */}
                                      </span>
                                      <span className="flex gap-2 text-xs leading-none tracking-wide text-error">
                                        - {formatMoney(fixedDeposit.commission)}
                                      </span>
                                      <Tooltip
                                        content="Commission + Fees"
                                        placement="top-start"
                                        animate={{
                                          mount: { scale: 1, y: 0 },
                                          unmount: { scale: 0, y: 25 },
                                        }}
                                        className="bg-gray-600 text-xs"
                                      >
                                        <span className="text-xs leading-none tracking-wide">
                                          <HiInformationCircle />
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Maturity Value</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-4 text-xs">
                              <ul className="divide-y-1 divide-gray-300">
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">Tenor</span>
                                  <span className="font-semibold text-gray-900">
                                    {fixedDeposit.tenor} days
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Start Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {fixedDeposit.startDate}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    End Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {fixedDeposit.maturityDate}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Interest Basis
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {fixedDeposit.interestBasis}
                                  </span>
                                </li>
                              </ul>
                              <ul className="divide-y-1 divide-gray-300">
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Principal Balance
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney(fixedDeposit?.principalBalance ?? 0.00)}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Commission
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney((fixedDeposit.commission))}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Fees
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney(fixedDeposit.fees)}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Roll Over
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${capitalize(fixedDeposit.rolloverRule?.replaceAll("_", " + ") as string)}`}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="">
                            <div className="min-w-screen flex items-center justify-center overflow-hidden rounded-xl">
                              <div className="w-full">
                                {(!update && fixedDeposit.transactionTranches.length > 0) ? (<div className=" bg-gray-50 ">
                                  <table className="w-full min-w-max table-auto">
                                    <thead>
                                      <tr className="bg-gray-200 text-xs uppercase leading-normal tracking-wider text-gray-600 ">
                                        <th className="px-6 py-3 text-left">
                                          Type
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                          Rate
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                          Date
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                          Status
                                        </th>
                                        <th className="px-6 py-3 text-right">
                                          Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="text-xs font-light text-gray-600">
                                      {
                                        fixedDeposit.transactionTranches.map((tranche, index) => (
                                          <>
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100" id={tranche.id}>
                                              <td className="whitespace-nowrap px-6 py-3 text-left">
                                                <span className="font-medium">
                                                  {capitalizeWords(tranche.transactionType)}
                                                </span>
                                              </td>
                                              <td className="px-6 py-3 text-left">
                                                <span>{formatMoney(tranche.interestRate)}</span>
                                              </td>
                                              <td className="px-6 py-3 text-left">
                                                {tranche.startDate}
                                              </td>
                                              <td className="px-6 py-3 text-left">
                                                {capitalizeWords(tranche.status)}
                                              </td>
                                              <td className="px-6 py-3 text-right">
                                                {formatMoney(tranche.totalAmount)}
                                              </td>
                                            </tr>

                                          </>
                                        ))
                                      }
                                    </tbody>
                                  </table>
                                </div>) : update ? (<form onSubmit={handleSubmit} className={`relative gap-3 grid grid-cols-2 px-3 pt-1.5 overflow-visible ${(responseMessage.error || responseMessage.success) ? `pb-12` : `pb-28`}`}>
                                  <Select
                                    placeholder=""
                                    name="account"
                                    value={values.account}
                                    label="Portfolio"
                                    size="md"
                                    onChange={(choice) => setFieldValue("account", choice!)}
                                    onBlur={handleBlur}
                                    error={!!touched.account && !!errors.account}
                                  >
                                    {userAccounts?.map((account) => (
                                      <Option value={account.id} key={account.id}>
                                        {`${account.accountLabel} - ${account.accountNo}`}
                                      </Option>
                                    ))}
                                  </Select>
                                  <Select
                                    placeholder=""
                                    name="rollOverRule"
                                    value={values.rollOverRule}
                                    label="Roll-Over"
                                    className="text-sm text-gray-600"
                                    size="md"
                                    onChange={(choice) => setFieldValue("rollOverRule", choice!)}
                                    onBlur={handleBlur}
                                    error={!!touched.rollOverRule && !!errors.rollOverRule}
                                  >
                                    {(
                                      Object.keys(FixedDepositTransactionRequest.rolloverRule) as Array<
                                        keyof typeof FixedDepositTransactionRequest.rolloverRule
                                      >
                                    ).map((option, index) => (
                                      <Option key={index} value={option}>
                                        {capitalize(option.replaceAll("_", " + "))}
                                      </Option>
                                    ))}
                                  </Select>
                                  <div className="relative flex w-full">
                                    <Input
                                      crossOrigin="true"
                                      name="tenor"
                                      value={values.tenor}
                                      type="number"
                                      size="md"
                                      label="Tenor"
                                      className="focus:ring-0"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={!!touched.tenor && !!errors.tenor}
                                    />

                                    <div className="!absolute right-1 top-1 rounded bg-gray-200 px-3 py-2 text-lg font-semibold">
                                      <FaRegCalendarAlt />
                                    </div>
                                  </div>
                                  {/* {(!!touched.tenor && (Number(values.tenor) < selectedFixedDepositProduct?.minTenor!)) ? ( */}
                                  {/*   <div className="text-xs font-semibold italic text-error"> */}
                                  {/*     Minimum investment tenor is{" "} */}
                                  {/*     <span className="font-extrabold"> */}
                                  {/*       {NumberFormatter(selectedFixedDepositProduct?.minTenor!)} */}
                                  {/*     </span> */}
                                  {/*   </div> */}
                                  {/* ) : (!!touched.tenor && (Number(values.tenor) > selectedFixedDepositProduct?.maxTenor!)) ? ( */}
                                  {/*   <div className="text-xs font-semibold italic text-error"> */}
                                  {/*     Maximun investment tenor is{" "} */}
                                  {/*     <span className="font-extrabold"> */}
                                  {/*       {NumberFormatter(selectedFixedDepositProduct?.maxTenor!)} */}
                                  {/*     </span> */}
                                  {/*   </div> */}
                                  {/* ) : ""} */}
                                  <div className="relative">
                                    <Input
                                      crossOrigin="true"
                                      name="amount"
                                      value={values.amount}
                                      type="number"
                                      size="md"
                                      label="Investment Amount"
                                      className="focus:ring-0"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={!!touched.amount && !!errors.amount}
                                    />

                                    <div className="!absolute right-0.5 top-1 rounded bg-gray-200 px-3 py-2 text-lg font-semibold">
                                      {CurrencyFormatter(fixedDeposit?.currency)}
                                    </div>
                                  </div>
                                  <div className="col-span-2 w-full text-center">
                                    {responseMessage.error ? (
                                      <ErrorDisplay>{responseMessage.error}</ErrorDisplay>
                                    ) : responseMessage.success ? (
                                      <SuccessDisplay>{responseMessage.success}</SuccessDisplay>
                                    )
                                      : null
                                    }
                                  </div>
                                  <div className="col-span-2 w-full absolute bottom-0 right-0">
                                    <button type="button" onClick={() => setUpdate(!update)} className="secondary-btn float-left disabled:bg-gray-300 disabled:cursor-auto disabled:text-black ">Close</button>
                                    <button type="submit" disabled={isUpdating} className="float-right disabled:bg-gray-300 disabled:cursor-auto disabled:text-black secondary-btn">Update</button>
                                  </div>

                                </form>) : ""}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {(fixedDeposit.status == FixedDepositTransaction.status.PENDING && !update) && <button onClick={() => setUpdate(!update)} className="secondary-btn">Update</button>}
                            {fixedDeposit.status == FixedDepositTransaction.status.RUNNING && <button onClick={() => setConfirmTerminate({ open: true, transactionId: fixedDeposit.id! })} className="secondary-btn">Terminate</button>
                            }
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
