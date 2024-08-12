import {
  Dialog as MDialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import {
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  CashTransactionRequest,
  InvestmentAccount,
} from "~/server/api/models/investing";
import { api } from "~/utils/api";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { Branch } from "~/server/api/models/banking";

type Props = {
  account: InvestmentAccount;
  openModal: boolean;
  closeModal: () => void | null;
  setFundResponseMessage: React.Dispatch<React.SetStateAction<{
    error: string, success: string
  }>>
};


const FundAccountModal = ({ account, openModal, closeModal, setFundResponseMessage }: Props) => {

  const [requestError, setRequestError] = useState({
    message: "",
  });
  const [branch, setBranch] = useState<Branch | null>(null);

  let branchList: Branch[] | null = null;

  const { data: branchesData } = api.banking.getBranches.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (branchesData) branchList = branchesData?.content!;

  useEffect(() => {
    if (branchList && branchList[0]) setBranch(branchList[0]);
  }, [branchList]);

  const handleCashRequestSubmit = ({
    amount,
    reference,
    valueDate: { startDate },
    notes,
  }: FormikValues) => {
    const transactionContent: CashTransactionRequest = {
      accountId: account.id,
      branchId: branch?.id!,
      channel: CashTransactionRequest.channel.CASH,
      type: CashTransactionRequest.type.DEPOSIT,
      amount,
      currency: account.currency,
      reference,
      notes,
      valueDate: startDate,
      autoApprove: true,
    };
    addCashTransaction({ requestBody: transactionContent });
  };

  const today = new Date().toISOString().split("T")[0];

  const initialFundValues = {
    reference: "",
    amount: "",
    valueDate: { startDate: today, endDate: today } as DateValueType,
    // autoApprove: true,
    notes: "",
  };

  const validateFundSchema = yup.object().shape({
    reference: yup.string().required("Required"),
    amount: yup
      .number()
      .moreThan(0, "Amount must be greater 0")
      .required("Required"),
    valueDate: yup.object(),
    notes: yup.string(),
    // autoApprove: yup.boolean(),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialFundValues,
    validationSchema: validateFundSchema,
    onSubmit: handleCashRequestSubmit,
  });

  const { mutate: addCashTransaction } =
    api.invest.addCashTransaction.useMutation({
      onSuccess: () => {
        resetForm();
        closeModal();
        setRequestError({ message: "" });
        setFundResponseMessage({ error: "", success: "Account fund sent successfully" });
      },
      onError: (error) =>
        setRequestError({ message: error.message.replaceAll(/[\{\}]/g, "") }),
    });

  return (
    <>
      <MDialog
        placeholder="Dialog"
        open={openModal}
        size={"md"}
        handler={closeModal}
        className="min-w-screen max-w-screen z-0 m-0 w-screen bg-gray-100 p-5"
      >
        <DialogHeader className="relative font-nun"
          placeholder="Dialog header"
        >
          <span>Cash Fund Transaction</span>
          <button
            className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
            onClick={closeModal}
          >
            x
          </button>
        </DialogHeader>

        <DialogBody className="bg-inherit p-4 font-nun" placeholder="">
          <form onSubmit={handleSubmit}>
            <div className="grid flex-auto grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <Input
                  label="Reference"
                  crossOrigin={true}
                  className="outline-none focus:ring-0 focus:ring-offset-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="reference"
                  error={!!touched.reference && !!errors.reference}
                  value={values.reference}
                />
                <span className="text-xs text-red-400">
                  {touched.reference && errors.reference}
                </span>
              </div>
              <div>
                <Input
                  label="Amount"
                  placeholder={"0.00"}
                  crossOrigin={true}
                  type="number"
                  className="outline-none focus:ring-0 focus:ring-offset-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="amount"
                  error={!!touched.amount && !!errors.amount}
                  value={values.amount}
                />
                <span className="text-xs text-red-400">
                  {touched.amount && errors.amount}
                </span>
              </div>
              <div>
                <Datepicker
                  asSingle
                  useRange={false}
                  value={values.valueDate}
                  placeholder="Value Date"
                  onChange={(e) => {
                    setFieldValue("valueDate", e, true);
                  }}
                  inputClassName={
                    !!touched.valueDate && !!errors.valueDate
                      ? "w-full rounded-md border-red-400"
                      : "w-full rounded-md border-grey-200"
                  }
                />
                <span className="text-xs text-red-400">
                  {touched.valueDate && errors.valueDate}
                </span>
              </div>
              <div>
                <Input
                  label="Notes"
                  crossOrigin={true}
                  className="outline-none focus:ring-0 focus:ring-offset-0"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="notes"
                  error={!!touched.notes && !!errors.notes}
                  value={values.notes}
                />
                <span className="text-xs text-red-400">
                  {touched.notes && errors.notes}
                </span>
              </div>
              {/* <div>
                <Switch
                  label="Auto approve"
                  checked={values.autoApprove}
                  onChange={handleChange}
                  name="autoApprove"
                />
              </div> */}
            </div>
            <hr className="my-4" />
            {requestError.message && (
              <div className="my-2 flex flex-col place-items-center rounded-md bg-gray-50 py-2">
                <span className="mb-2 text-center text-sm text-red-400">
                  {requestError.message.replaceAll(/[\{\}]/g, "")}
                </span>
              </div>
            )}
            <button
              // onClick={() => {
              //   handleFlutterPayment({
              //     callback: (response) => {
              //        console.log(response);
              //         closePaymentModal() // this will close the modal programmatically
              //     },
              //     onClose: () => {},
              //   });
              // }}
              type="submit"
              className="float-right mx-2 flex items-center rounded-lg bg-transparent px-5 py-3 text-xs font-bold uppercase text-primary hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-200"
            >
              Fund Account
            </button>
          </form>
        </DialogBody>
      </MDialog>
    </>
  );
};

export default FundAccountModal;
