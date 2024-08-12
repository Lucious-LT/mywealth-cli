import { Dialog as MDialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { FormikState } from 'formik';
import React, { SetStateAction } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs';
import { FixedDepositProduct, InvestmentAccount } from '~/server/api/models/investing';
import { NumberFormatter } from '../util/number-formatter';


type Props = {
  open: boolean
  handleModal: () => void
  setConfirmFixedDeposit: (value: SetStateAction<boolean>) => void
  selectedFixedDepositProduct: FixedDepositProduct
  setSelectedFixedDepositProduct: (value: SetStateAction<FixedDepositProduct | undefined>) => void
  setFixedDepositProduct: (value: SetStateAction<FixedDepositProduct | undefined>) => void
  resetForm: (nextState?: Partial<FormikState<any> | undefined>) => void
  values: { amount: string, account: string, tenor: number }
  getFixedDepositAccount: (account: string) => InvestmentAccount | undefined
}


const ConfirmFixedDepositModal = ({ open, resetForm, handleModal, setFixedDepositProduct, setConfirmFixedDeposit, values, selectedFixedDepositProduct, getFixedDepositAccount }: Props) => {

  return (
    <MDialog
      placeholder={""}
      open={open}
      size={"md"}
      handler={handleModal}
      // className="min-w-screen max-w-screen m-0 h-full max-h-screen min-h-screen w-screen bg-gray-100"
      className="bg-gray-100"
    >
      <DialogHeader className="relative font-nun" placeholder={""}>
        <button
          className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          onClick={() => {
            resetForm();
            setFixedDepositProduct(undefined)
            setConfirmFixedDeposit(false)
          }}
        >
          x
        </button>
      </DialogHeader>
      <DialogBody className="m-8 h-full font-nun" placeholder={""}>
        <div className="mx-10 grid place-items-center space-y-4">
          {/* <div className="flex flex-col"> */}
          <BsCheckCircleFill className="text-5xl font-bold text-success" />
          <span className="text-5xl font-bold">Success</span>
          <div className="text-center text-sm leading-5 tracking-wide">
            You have successfully invested
            <span className="font-semibold">{` ${selectedFixedDepositProduct?.currency + NumberFormatter(+values.amount)
              } `}</span>
            in
            <span className="font-semibold">{` ${selectedFixedDepositProduct?.label}(${selectedFixedDepositProduct?.code}) `}</span>
            for
            <span className="font-semibold">{` ${values.tenor} `}</span>{" "}
            days using your
            <span className="font-semibold">{` ${getFixedDepositAccount(values.account)?.accountLabel}(${getFixedDepositAccount(values.account)?.accountNo}) `}</span>
            account.
          </div>
        </div>
        {/* </div> */}
      </DialogBody>
    </MDialog>
  )
}

export default ConfirmFixedDepositModal
