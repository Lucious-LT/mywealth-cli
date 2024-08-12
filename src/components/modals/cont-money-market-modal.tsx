import {
  Dialog as MDialog,
  DialogHeader,
  DialogBody,
  Input,
  Select,
  Option
} from '@material-tailwind/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { InvestmentAccount, MoneyMarketProduct, MoneyMarketTransactionRequest } from '~/server/api/models/investing'
import { capitalize, formatMoney, formatNetProfit } from '~/utils/format'
import { DateToStringFormatter, getEndDate } from '../date-formatter'
import { ErrorDisplay, SuccessDisplay } from '../ui/error-display'
import { CurrencyFormatter } from '../util/currency-formatter'
import investmentInterest from '../util/interest'
import { NumberFormatter } from '../util/number-formatter'
import { todayAsString } from '../util/today'
import * as yup from 'yup'
import { FormikValues, useFormik } from 'formik'
import { api } from '~/utils/api'
import ConfirmMoneyMarketModal from './confirm-money-market-modal'


type Props = {
  open: boolean
  handleModal: () => void
  setContMoneyMarket: (value: SetStateAction<boolean>) => void
  selectedMoneyMarketProduct: MoneyMarketProduct
  setSelectedMoneyMarketProduct: (value: SetStateAction<MoneyMarketProduct | undefined>) => void
  // setMoneyMarketProduct: (value: SetStateAction<MoneyMarketProduct | undefined>) => void
  userAccounts: InvestmentAccount[]
}

const ContMoneyMarketModal = ({ open, handleModal, setContMoneyMarket, selectedMoneyMarketProduct, setSelectedMoneyMarketProduct, userAccounts }: Props) => {

  const utils = api.useUtils()

  const [confirmMoneyMarket, setConfirmMoneyMarket] = useState(false)

  const [responseMessage, setResponseMessage] = useState<{ success?: string, error?: string }>({ success: "", error: "" })

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

  const handleConfirmModal = () => setConfirmMoneyMarket(!confirmMoneyMarket)

  function getMoneyMarketAccount(account: string) {
    return userAccounts?.find(userAccount => userAccount.id! == account)
  }

  const handleMoneyMarketInvestmentSubmit = ({ account, interestType, amount }: FormikValues) => {
    const moneyMarketContent: MoneyMarketTransactionRequest = {
      accountId: getMoneyMarketAccount(account)?.id!,
      interestType,
      productId: selectedMoneyMarketProduct?.id!,
      currency: selectedMoneyMarketProduct?.currency!,
      faceValue: amount,
      startDate: new Date().toISOString().split("T")[0]!,
      tenor: 50,
      refCode: "",
      discountRate: selectedMoneyMarketProduct?.interestConfig?.defaultRate,
      positionTransferDate: "",
      notes: ""
    }
    addMoneyMarketInvestment(moneyMarketContent, {
      onSuccess: () => {
        handleConfirmModal()
        utils.invest.listClientMoneyMarketTransactions.invalidate()
      },
      onError(error) {
        setResponseMessage({ error: error.message != "" ? error.message : capitalize(error?.data?.code.replaceAll("_", " ")!) })
      },
    })
  }

  const { mutate: addMoneyMarketInvestment } = api.invest.addMoneyMarketInvestment.useMutation()

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      account: "",
      interestType: "",
      amount: ""
    },
    validationSchema: yup.object().shape({
      account: yup.string().required("Required"),
      interestType: yup.string().required("Required"),
      amount: yup.number().required("Required")
    }),
    onSubmit: handleMoneyMarketInvestmentSubmit
  })

  return (
    <MDialog
      placeholder={""}
      open={open}
      size={"lg"}
      handler={handleModal}
      className="bg-gray-100"
    >
      <DialogHeader className="relative font-nun" placeholder={""}>
        <div className="flex flex-col">
          <span className=" font-bold">Continue investing...</span>
          <span className="text-sm   text-gray-600">
            Enter investment details
          </span>
        </div>
        <button
          className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          onClick={() => {
            setContMoneyMarket(false)
            setSelectedMoneyMarketProduct(undefined)
            resetForm()
          }}
        >
          x
        </button>
      </DialogHeader>
      <DialogBody className="m-8 h-full font-nun" placeholder={""}>

        <ConfirmMoneyMarketModal
          open={confirmMoneyMarket}
          resetForm={resetForm}
          handleModal={handleConfirmModal}
          setConfirmMoneyMarket={setConfirmMoneyMarket}
          setSelectedMoneyMarketProduct={setSelectedMoneyMarketProduct}
          selectedMoneyMarketProduct={selectedMoneyMarketProduct!}
          getMoneyMarketAccount={getMoneyMarketAccount!}
          values={values}
        />

        <>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-3 space-y-10">
                <div>
                  <span className="text-lg font-bold capitalize text-gray-900">{`${selectedMoneyMarketProduct?.label}(${selectedMoneyMarketProduct?.code})`}</span>
                </div>

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
                {responseMessage.error ? (
                  <ErrorDisplay>{responseMessage.error}</ErrorDisplay>
                ) : responseMessage.success ? (
                  <SuccessDisplay>{responseMessage.success}</SuccessDisplay>
                )
                  : null
                }
                <div className="absolute bottom-5 left-5">
                  <button type="button" onClick={() => handleModal()} className="secondary-btn">Back</button>
                </div>
              </div>
              <div className="col-span-2 rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
                <div className="text-md mb-5 font-semibold leading-6">
                  Your investment details
                </div>
                <div className="text-xs font-medium">
                  <ul className="grid-flex-row grid grid-cols-2 gap-4 ">
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Product</span>
                      <span>{selectedMoneyMarketProduct?.code}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Maturity</span>
                      <span>{selectedMoneyMarketProduct?.maturityDate ?? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Interest Type
                      </span>
                      <span>{capitalize(values.interestType.replaceAll("_", " "))}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Discount Rate
                      </span>
                      <span>{selectedMoneyMarketProduct?.interestConfig?.defaultRate}%</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Interest Basis
                      </span>
                      <span>
                        {selectedMoneyMarketProduct?.interestBasis}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Net Profit</span>
                      <span>
                        {NumberFormatter(
                          formatNetProfit(selectedMoneyMarketProduct, Number(values.amount)).amount
                        )}
                      </span>
                    </li>

                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Start Date</span>
                      <span>
                        {DateToStringFormatter(todayAsString)}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">End Date</span>
                      <span>
                        {DateToStringFormatter(
                          getEndDate(Number(selectedMoneyMarketProduct?.maturityDate!))
                        )}
                      </span>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Account
                    </span>
                    <span>{getMoneyMarketAccount(values.account)?.accountLabel}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Investment Amount
                      </span>
                      <span>{NumberFormatter(+values.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Commission Fees
                      </span>
                      <span>{formatMoney(selectedMoneyMarketProduct?.commissionConfig?.fixedAmount! ?? 0)}</span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Total</span>
                    <span className="text-gray-900">
                      {NumberFormatter(+values.amount)}
                    </span>
                  </div>
                  <hr className="my-4" />
                  <div className="grid place-items-center">
                    <button
                      type="submit"
                      className="mx-2 flex cursor-pointer items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
                    >
                      <span>Confirm & proceed</span>
                      <span className="ml-2">
                        <HiArrowNarrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      </DialogBody>
    </MDialog>
  )
}

export default ContMoneyMarketModal;
