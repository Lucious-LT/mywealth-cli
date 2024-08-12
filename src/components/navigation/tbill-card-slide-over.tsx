import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  Input,
  Select,
  Option,
  Tooltip,
} from "@material-tailwind/react";
import { capitalize, formatMoney } from "~/utils/format";
import { HiArrowNarrowUp, HiInformationCircle } from "react-icons/hi";
import { FixedDepositTransaction, FixedDepositTransactionRequest, MoneyMarketTransaction, MoneyMarketTransactionRequest } from "~/server/api/models/investing";
import { api } from "~/utils/api";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { ErrorDisplay, SuccessDisplay } from "../ui/error-display";
import classNames from "classnames";
import { CurrencyFormatter } from "../util/currency-formatter";
import { NumberFormatter } from "../util/number-formatter";

export const TBillsCardSlideOver = ({
  tbillsDetailscardOpen, settbillsDetailsCardOpen, tbillDetails, setTbillDetails
}: {
  tbillsDetailscardOpen: boolean,
  settbillsDetailsCardOpen: Dispatch<SetStateAction<boolean>>;
  tbillDetails: MoneyMarketTransaction
  setTbillDetails: Dispatch<SetStateAction<MoneyMarketTransaction | undefined>>
}) => {
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const [update, setUpdate] = useState(false)

  const { data: userAccounts } = api.invest.getAccountsForClient.useQuery(sessionData?.user.clientId!)
  const { mutate: updateMoneyMarketTransaction, isLoading: isUpdating } = api.invest.updateMoneyMarketTransaction.useMutation()
  const { data: selectedMoneyMarketProduct } = api.invest.getMoneyMarketProductById.useQuery({ productId: tbillDetails?.productId }, { enabled: tbillDetails?.productId !== undefined })
  const { data: updatedMoneyMarketTransaction, refetch } = api.invest.findMoneyMarketTransactionById.useQuery({ transactionId: tbillDetails?.id! }, { enabled: tbillDetails?.productId !== undefined })

  useEffect(() => {
    setTbillDetails(updatedMoneyMarketTransaction!)
  }, [updatedMoneyMarketTransaction])

  function getInvestmentAccount(account: string) {
    return userAccounts?.find(userAccount => userAccount.id! == account)
  }

  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

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

  const handleMoneyMarketInvestmentSubmit = ({ account, interestType, amount }: FormikValues) => {
    const updateMoneyMarketValues: MoneyMarketTransactionRequest = {
      accountId: getInvestmentAccount(account)?.id!,
      interestType,
      productId: tbillDetails?.productId,
      currency: tbillDetails?.currency,
      faceValue: amount,
      startDate: tbillDetails.startDate,
      tenor: tbillDetails?.tenor,
      refCode: tbillDetails?.refCode,
      positionTransferDate: tbillDetails.createdAt,
      notes: tbillDetails?.notes,
      discountRate: tbillDetails?.discountRate,
    }
    updateMoneyMarketTransaction({ requestBody: updateMoneyMarketValues, transactionId: tbillDetails?.id }, {
      onSuccess: () => {
        setResponseMessage({ success: "Transaction updated successfully" })
        refetch()
        setUpdate(!update)
        utils.invest.listClientMoneyMarketTransactions.invalidate()
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
      account: tbillDetails?.accountId,
      interestType: tbillDetails?.interestType,
      amount: tbillDetails?.faceValue
    },
    validationSchema: yup.object().shape({
      account: yup.string().required("Required"),
      interestType: yup.string().required("Required"),
      amount: yup.number().required("Required")
    }),
    enableReinitialize: true,
    onSubmit: handleMoneyMarketInvestmentSubmit
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
                  <div className="flex h-full flex-col overflow-y-scroll rounded-l-xl bg-white py-12 font-nun shadow-xl">
                    <div className=" mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}
                      {tbillDetails && <>
                        <div className="space-y-8 overflow-auto">
                          <div className="space-y-2">
                            <div className="truncate text-xl font-semibold leading-6 tracking-tight">
                              {`${tbillDetails.productLabel} - ${formatMoney(tbillDetails.discountRate)}% for ${tbillDetails.tenor} days`}
                            </div>
                            <div className="space-x-2 text-xs">
                              <span className="font-semibold text-gray-600">
                                {tbillDetails.productCode}
                              </span>
                              <span className="font-semibold text-black">
                                {"- " + tbillDetails.orderNo}
                              </span>
                              <span
                                className={classNames(
                                  tbillDetails.status === FixedDepositTransaction.status.RUNNING ? "pills-success"
                                    : tbillDetails.status === FixedDepositTransaction.status.PENDING
                                      ? "pills-secondary"
                                      : tbillDetails.status === FixedDepositTransaction.status.APPROVED
                                        ? "pills-primary"
                                        : "pills-error",
                                  "pills"
                                )}
                              >
                                {tbillDetails.status}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-xl bg-gray-50 p-4">
                            <div className="grid grid-cols-5 gap-1">
                              <div className="col-span-3 ">
                                <div className="mt-3 flex items-start space-x-4">
                                  <div className="flex flex-col ">
                                    <div className="mb-1 text-lg font-semibold leading-tight tracking-tight">
                                      <span className="mr-1">{` ${tbillDetails.currency}`}</span>
                                      {formatMoney(tbillDetails.discountedValue)}
                                    </div>
                                    <div className="whitespace-nowrap text-xs leading-none tracking-wide text-gray-600">
                                      <span>Invested Amount</span>
                                    </div>
                                  </div>
                                  <div className="text-md font-medium leading-tight tracking-tight text-gray-600">
                                    +
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="mb-1 flex items-center gap-2 text-lg font-semibold leading-tight tracking-tight">
                                      <span>
                                        {formatMoney(tbillDetails.interestAmount)}
                                      </span>
                                      <div className="flex gap-1 text-xs leading-none tracking-wide text-success">
                                        <HiArrowNarrowUp />
                                        <span>{formatMoney(tbillDetails.yield)}%</span>
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
                                        {formatMoney(tbillDetails?.discountedValue + tbillDetails?.interestAmount - tbillDetails?.totalFees)}
                                      </span>
                                      <span className="flex gap-2 text-xs leading-none tracking-wide text-error">
                                        - {formatMoney(tbillDetails?.commission)}
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
                                    {tbillDetails.tenor} days
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Start Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {tbillDetails.startDate}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    End Date
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {tbillDetails.maturityDate}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Interest Basis
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {tbillDetails.interestBasis}
                                  </span>
                                </li>
                              </ul>
                              <ul className="divide-y-1 divide-gray-300">
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Face Value
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney(tbillDetails.faceValue)}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Commision
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney((tbillDetails.commission))}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Fees
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${formatMoney(tbillDetails.fees)}`}
                                  </span>
                                </li>
                                <li className="flex justify-between py-2 pl-2">
                                  <span className="text-gray-600">
                                    Interest Type
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {`${capitalize(tbillDetails.interestType as string)}`}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="">
                            <div className="min-w-screen flex items-center justify-center overflow-hidden rounded-xl">
                              <div className="w-full">
                                {!update ? (<div className=" bg-gray-50 ">
                                  {/* <table className="w-full min-w-max table-auto"> */}
                                  {/*   <thead> */}
                                  {/*     <tr className="bg-gray-200 text-xs uppercase leading-normal tracking-wider text-gray-600 "> */}
                                  {/*       <th className="px-6 py-3 text-left"> */}
                                  {/*         Tran type */}
                                  {/*       </th> */}
                                  {/*       <th className="px-6 py-3 text-left"> */}
                                  {/*         Date */}
                                  {/*       </th> */}
                                  {/*       <th className="px-6 py-3 text-right"> */}
                                  {/*         Amount */}
                                  {/*       </th> */}
                                  {/*     </tr> */}
                                  {/*   </thead> */}
                                  {/*   <tbody className="text-xs font-light text-gray-600"> */}
                                  {/*     <tr className="border-b border-gray-200 hover:bg-gray-100"> */}
                                  {/*       <td className="whitespace-nowrap px-6 py-3 text-left"> */}
                                  {/*         <span className="font-medium"> */}
                                  {/*           Interest - 5.43% */}
                                  {/*         </span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-left"> */}
                                  {/*         <span>Mar 16, 2023</span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-right"> */}
                                  {/*         + 134.00 */}
                                  {/*       </td> */}
                                  {/*     </tr> */}
                                  {/*     <tr className="border-b border-gray-200 hover:bg-gray-100"> */}
                                  {/*       <td className="whitespace-nowrap px-6 py-3 text-left"> */}
                                  {/*         <span className="font-medium"> */}
                                  {/*           Interest - 5.43% */}
                                  {/*         </span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-left"> */}
                                  {/*         <span>Mar 15, 2023</span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-right"> */}
                                  {/*         + 134.00 */}
                                  {/*       </td> */}
                                  {/*     </tr> */}
                                  {/*     <tr className="border-b border-gray-200 hover:bg-gray-100"> */}
                                  {/*       <td className="whitespace-nowrap px-6 py-3 text-left"> */}
                                  {/*         <span className="font-medium"> */}
                                  {/*           Initial Investment */}
                                  {/*         </span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-left"> */}
                                  {/*         <span>Mar 14, 2023</span> */}
                                  {/*       </td> */}
                                  {/*       <td className="px-6 py-3 text-right"> */}
                                  {/*         + 17,663.00 */}
                                  {/*       </td> */}
                                  {/*     </tr> */}
                                  {/*   </tbody> */}
                                  {/* </table> */}
                                </div>) : (<form onSubmit={handleSubmit} className={`relative gap-3 grid grid-cols-2 px-3 pt-1.5 overflow-visible ${(responseMessage.error || responseMessage.success) ? `pb-12` : `pb-28`}`}>
                                  <Select
                                    placeholder=""
                                    name="account"
                                    value={values.account}
                                    label="Account"
                                    size="md"
                                    onChange={(choice) => setFieldValue("account", choice!)}
                                    onBlur={handleBlur}
                                    error={!!touched.account && !!errors.account}
                                  >
                                    {userAccounts?.map((account) => (
                                      <Option value={account.id} key={account.id}>
                                        {`${account.accountLabel} - ${account.accountNo} (${account.currency})`}
                                      </Option>
                                    ))}
                                  </Select>
                                  <Select
                                    placeholder=""
                                    name="interestType"
                                    value={values.interestType}
                                    label="Interest Type"
                                    className="text-sm text-gray-600"
                                    size="md"
                                    onChange={(choice) => setFieldValue("interestType", choice!)}
                                    onBlur={handleBlur}
                                    error={!!touched.interestType && !!errors.interestType}
                                  >
                                    {(
                                      Object.keys(MoneyMarketTransactionRequest.interestType) as Array<
                                        keyof typeof MoneyMarketTransactionRequest.interestType
                                      >
                                    ).map((option, index) => (
                                      <Option key={index} value={option}>
                                        {capitalize(option.replaceAll("_", " + "))}
                                      </Option>
                                    ))}
                                  </Select>
                                  <div className="space-y-1" >
                                    <div className="relative flex w-full">
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

                                      <div className="!absolute right-1 top-1 rounded bg-gray-200 px-3 py-2 text-lg font-semibold">
                                        {CurrencyFormatter(selectedMoneyMarketProduct?.currency)}
                                      </div>
                                    </div>
                                    {(!!touched.amount && (Number(values.amount) < selectedMoneyMarketProduct?.minFaceValueAmount!)) ? (
                                      <div className="text-xs font-semibold italic text-error">
                                        Minimum investment amount is{" "}
                                        <span className="font-extrabold">
                                          {NumberFormatter(selectedMoneyMarketProduct?.minFaceValueAmount!)}
                                        </span>
                                      </div>
                                    ) : (!!touched.amount && (Number(values.amount) > selectedMoneyMarketProduct?.maxFaceValueAmount!)) ? (
                                      <div className="text-xs font-semibold italic text-error">
                                        Maximum investment amount is{" "}
                                        <span className="font-extrabold">
                                          {NumberFormatter(selectedMoneyMarketProduct?.maxFaceValueAmount!)}
                                        </span>
                                      </div>
                                    ) : ""
                                    }
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
                                    <button type="submit" disabled={isUpdating} className="float-right disabled:bg-gray-300 disabled:cursor-auto disabled:text-black secondary-btn">Update</button>
                                    <button type="submit" onClick={() => setUpdate(!update)} disabled={isUpdating} className="float-left disabled:bg-gray-300 disabled:cursor-auto disabled:text-black secondary-btn">Close</button>
                                  </div>

                                </form>)}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {(tbillDetails.status == FixedDepositTransaction.status.PENDING && !update) && <button onClick={() => setUpdate(!update)} className="secondary-btn">Update</button>}
                            {tbillDetails.status == FixedDepositTransaction.status.RUNNING && <button onClick={() => { }} className="secondary-btn">Terminate</button>
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
