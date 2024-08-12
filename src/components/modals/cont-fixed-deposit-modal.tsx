import {
  Dialog as MDialog,
  DialogHeader,
  DialogBody,
  Input,
  Select,
  Option
} from '@material-tailwind/react'
import React, { Dispatch, SetStateAction } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FixedDepositProduct, FixedDepositTransactionRequest, InvestmentAccount } from '~/server/api/models/investing'
import { capitalize } from '~/utils/format'
import { DateToStringFormatter, getEndDate } from '../date-formatter'
import { ErrorDisplay, SuccessDisplay } from '../ui/error-display'
import { CurrencyFormatter } from '../util/currency-formatter'
import investmentInterest, { expectedInterest } from '../util/interest'
import { NumberFormatter } from '../util/number-formatter'
import { todayAsString } from '../util/today'
import * as yup from 'yup'
import { FormikValues, useFormik } from 'formik'
import { api } from '~/utils/api'
import ConfirmFixedDepositModal from './confirm-fixed-deposit'
import { FaRegCalendarAlt } from "react-icons/fa";

type Props = {
  open: boolean
  handleModal: () => void
  handleConfirmModal: () => void
  setContFixedDeposit: (value: SetStateAction<boolean>) => void
  setResponseMessage: Dispatch<SetStateAction<{ success?: string, error?: string }>>
  responseMessage: { success?: string, error?: string }
  selectedFixedDepositProduct: FixedDepositProduct
  setSelectedFixedDepositProduct: (value: SetStateAction<FixedDepositProduct | undefined>) => void
  setFixedDepositProduct: (value: SetStateAction<FixedDepositProduct | undefined>) => void
  userAccounts: InvestmentAccount[]
  setConfirmFixedDeposit: (value: SetStateAction<boolean>) => void
  confirmFixedDeposit: boolean
}

const ContFixedDepositModal = ({ open, handleModal, handleConfirmModal, setContFixedDeposit, setResponseMessage, responseMessage, selectedFixedDepositProduct, setSelectedFixedDepositProduct, setFixedDepositProduct, userAccounts, setConfirmFixedDeposit, confirmFixedDeposit }: Props) => {

  const utils = api.useUtils()

  function getFixedDepositAccount(account: string) {
    return userAccounts?.find(userAccount => userAccount.id! == account)
  }

  const handleFixedDepositInvestmentSubmit = ({ account, rollOverRule, tenor, amount }: FormikValues) => {
    const fixedDepositContent: FixedDepositTransactionRequest = {
      accountId: getFixedDepositAccount(account)?.id!,
      rolloverRule: rollOverRule,
      productId: selectedFixedDepositProduct?.id!,
      currency: selectedFixedDepositProduct?.currency!,
      principal: amount,
      startDate: new Date().toISOString().split("T")[0]!,
      tenor,
      refCode: "",
      interestRate: selectedFixedDepositProduct?.interestConfig?.defaultRate,
      positionTransferDate: "",
      notes: ""
    }
    addFixedDepositInvestment(fixedDepositContent, {
      onSuccess: () => {
        handleConfirmModal()
        utils.invest.listClientFixedDepositTransactions.invalidate()
      },
      onError(error) {
        setResponseMessage({ error: error.message != "" ? error.message : capitalize(error?.data?.code.replaceAll("_", " ")!) })
      },
    })
  }

  const { mutate: addFixedDepositInvestment } = api.invest.addFixedDepositInvestment.useMutation()

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      account: "",
      rollOverRule: "",
      tenor: selectedFixedDepositProduct?.minTenor,
      amount: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      account: yup.string().required("Required"),
      rollOverRule: yup.string().required("Required"),
      tenor: yup.number().required("Required"),
      amount: yup.number().required("Required")
    }),
    onSubmit: handleFixedDepositInvestmentSubmit
  })

  return (
    <MDialog
      placeholder={""}
      open={open}
      size={"lg"}
      handler={handleModal}
      // className="min-w-screen max-w-screen m-0 h-full max-h-screen min-h-screen w-screen bg-gray-100"
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
            setContFixedDeposit(false)
            setSelectedFixedDepositProduct(undefined)
            setFixedDepositProduct(undefined)
            resetForm()
          }}
        >
          x
        </button>
      </DialogHeader>
      <DialogBody className="m-8 h-full font-nun" placeholder={""}>

        <ConfirmFixedDepositModal
          open={confirmFixedDeposit}
          resetForm={resetForm}
          handleModal={handleConfirmModal}
          setConfirmFixedDeposit={setConfirmFixedDeposit}
          setSelectedFixedDepositProduct={setSelectedFixedDepositProduct}
          setFixedDepositProduct={setFixedDepositProduct}
          selectedFixedDepositProduct={selectedFixedDepositProduct!}
          getFixedDepositAccount={getFixedDepositAccount!}
          values={values}
        />

        <>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-3 space-y-10">
                <div>
                  <span className="text-lg font-bold capitalize text-gray-900">{`${selectedFixedDepositProduct?.label}(${selectedFixedDepositProduct?.code})`}</span>
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
                  name="rollOverRule"
                  value={values.rollOverRule}
                  label="Rollover Instruction"
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
                <div className="space-y-1" >
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
                  {(!!touched.tenor && (Number(values.tenor) < selectedFixedDepositProduct?.minTenor!)) ? (
                    <div className="text-xs font-semibold italic text-error">
                      Minimum investment tenor is{" "}
                      <span className="font-extrabold">
                        {NumberFormatter(selectedFixedDepositProduct?.minTenor!)}
                      </span>
                    </div>
                  ) : (!!touched.tenor && (Number(values.tenor) > selectedFixedDepositProduct?.maxTenor!)) ? (
                    <div className="text-xs font-semibold italic text-error">
                      Maximun investment tenor is{" "}
                      <span className="font-extrabold">
                        {NumberFormatter(selectedFixedDepositProduct?.maxTenor!)}
                      </span>
                    </div>
                  ) : ""}
                </div>
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
                      {CurrencyFormatter(selectedFixedDepositProduct?.currency)}
                    </div>
                  </div>
                  {(!!touched.amount && (Number(values.amount) < selectedFixedDepositProduct?.minPrincipalAmount!)) ? (
                    <div className="text-xs font-semibold italic text-error">
                      Minimum investment amount is{" "}
                      <span className="font-extrabold">
                        {NumberFormatter(selectedFixedDepositProduct?.minPrincipalAmount!)}
                      </span>
                    </div>
                  ) : (!!touched.amount && (Number(values.amount) > selectedFixedDepositProduct?.maxPrincipalAmount!)) ? (
                    <div className="text-xs font-semibold italic text-error">
                      Maximun investment amount is{" "}
                      <span className="font-extrabold">
                        {NumberFormatter(selectedFixedDepositProduct?.maxPrincipalAmount!)}
                      </span>
                    </div>
                  ) : ""}
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
                      <span>{selectedFixedDepositProduct?.code}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Tenor(Days)</span>
                      <span>{selectedFixedDepositProduct?.minTenor + " - " + selectedFixedDepositProduct?.maxTenor}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Rollover Instr.
                      </span>
                      <span>{capitalize(values.rollOverRule.replaceAll("_", " + "))}</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Interest Rate
                      </span>
                      <span>{selectedFixedDepositProduct?.interestConfig?.defaultRate}%</span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">
                        Requested Tenor
                      </span>
                      <span>
                        {values.tenor}
                      </span>
                    </li>
                    <li className="flex flex-col space-y-0.5">
                      <span className="text-gray-500">Expected Interest</span>
                      <span>
                        {NumberFormatter(
                          expectedInterest(
                            +values.amount,
                            selectedFixedDepositProduct?.interestConfig?.defaultRate!,
                            values.tenor
                          )
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
                          getEndDate(values.tenor)
                        )}
                      </span>
                    </li>
                  </ul>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Account
                    </span>
                    <span>{getFixedDepositAccount(values.account)?.accountLabel}</span>
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
                        Commission + Fees
                      </span>
                      <span>0.00</span>
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

export default ContFixedDepositModal;
