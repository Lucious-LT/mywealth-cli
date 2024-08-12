import React, {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { DepositAccount, type Institution } from "~/server/api/models/banking";
import FrequentTransactions from "~/pages/bank/transfer/frequent-transactions";
import { v4 as uuidv4 } from "uuid";
import { today, todayAsString } from "~/components/util/today";
import { type TransferRequestType } from "~/server/api/routers/banking";
import {
  Input,
  Option,
  Select,
  Switch,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HiArrowNarrowRight, HiArrowSmRight } from "react-icons/hi";
import { NumberFormatter } from "~/components/util/number-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  ErrorDisplay,
  ErrorDisplayOnConfirm,
  FormatErrorMsg,
} from "~/components/ui/error-display";
import { LoadingSpinner } from "~/components/ui/spinner";
import classNames from "classnames";
// import useTimer from "~/pages/components/util/custom-hooks/useTimer";
import { ErrorMessage } from "~/components/models/error";
import Modal from "~/components/navigation/modal";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import * as yup from "yup";

export default function NewTransferTransaction({
  open,
  setOpen,
  confirm,
  setConfirm,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}) {
  const utils = api.useUtils()
  const [internalAcct, setInternalAcct] = useState(false);

  const handleConfirmModal = () => {
    setOpen(!open);
    setConfirm(!confirm);
  };

  // Load the accounts
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";
  // const userId = sessionData?.user.id ?? "";

  const { data: accounts } = api.banking.getDepositAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  // The idem key will be initialized when the form loads and only reset if we complete a request
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());

  // This is the logged in user's deposit accounts
  const [fromAccount, setFromAccount] = useState(accounts?.[0]);

  const handleFromAccount = (index: number) => {
    setFromAccount(accounts?.[index]);
  };

  const [externalDestinationAccountNo, setExternalDestinationAccountNo] =
    useState("");
  const [externalDestinationAccountLabel, setExternalDestinationAccountLabel] =
    useState("");

  const [internalDestinationAccountNo, setInternalDestinationAccountNo] =
    useState("");
  const [internalDestinationAccountLabel, setInternalDestinationAccountLabel] =
    useState("");

  // Load the institutions
  const [bankOptions, setBankOptions] = useState<Institution>();

  const { data: institutions } =
    api.banking.getActiveFinancialInstitutions.useQuery(undefined, {
      onSuccess: (data) => {
        setBankOptions(data?.content?.[0]);
      },
    });

  // This filters out institutions on query
  const [bankQuery, setBankQuery] = useState("");

  const filteredBank =
    bankQuery === ""
      ? institutions?.content
      : institutions?.content.filter((bank) =>
        bank.label
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(bankQuery.toLowerCase().replace(/\s+/g, ""))
      );


  const { mutate: lookupTransferAcct, isLoading: processingLookup } =
    api.banking.lookupTransferAccount.useMutation();

  // Get error message
  const [lookupErrorMsg, setLookupErrorMsg] = useState<string>();
  const [isLookupError, setIsLookupError] = useState(false);

  const handleLookupTransferAcct = (
    accountNo: string,
    transferType: "INTERNAL" | "EXTERNAL",
    institutionCode: string,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();

    // setLookup(!lookup);
    lookupTransferAcct(
      {
        institutionCode: institutionCode,
        destAccountNo: accountNo,
        type: transferType,
      },
      {
        onSuccess: (data) => {
          setIsLookupError(false);
          data.type == "INTERNAL"
            ? setInternalDestinationAccountLabel(data.destAccountLabel)
            : setExternalDestinationAccountLabel(data.destAccountLabel);
          data.type == "INTERNAL"
            ? setInternalDestinationAccountNo(data.destAccountNo)
            : setExternalDestinationAccountNo(data.destAccountNo);
        },
        onError: (error) => {
          setIsLookupError(true);
          setLookupErrorMsg(error.message);
        },
      }
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLookupError(false);
      setLookupErrorMsg(undefined);
      // setAuthorize?.(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLookupError]);
  // Clear look up error message
  // useTimer(isLookupError, setIsLookupError, setLookupErrorMsg);

  // const handleCloseLookup = () => {
  //   internalAcct
  //     ? setInternalDestinationAccountLabel("")
  //     : beneficiaryValue.state
  //     ? setBeneficiaryValue((beneficiaryValue) => ({
  //         ...beneficiaryValue,
  //         state: false,
  //       }))
  //     : setExternalDestinationAccountLabel("");

  //   setLookup(!lookup);
  // };

  // Populate beneficiary details to transfer form
  const [beneficiaryValue, setBeneficiaryValue] = useState({
    state: false,
    destAccountNo: "",
    destAccountLabel: "",
    institutionId: "",
    institutionCode: "",
    institutionLabel: "",
  });

  const getData = (data: any) => {
    setBeneficiaryValue({
      state: true,
      destAccountLabel: data.destAccountLabel,
      destAccountNo: data.destAccountNo,
      institutionId: data.institutionId,
      institutionCode: data.institutionCode,
      institutionLabel: data.institutionlabel,
      ...data,
    });
  };

  const freqTransactions = useMemo(
    () => <FrequentTransactions getData={getData} />,
    []
  );


  //Begin process to Create and Post transfer data
  const { mutate: addTransfer, isLoading: processingTransfer } =
    api.banking.addTransfer.useMutation({
      onSuccess: () => utils.banking.getDepositAccountsForClient.invalidate()
    });

  const [transferResponse, setTransferResponse] = useState({
    institutionLabel: "",
    reference: "",
    srcAccountNo: "",
    srcAccountLabel: "",
    destAccountNo: "",
    destAccountLabel: "",
    currency: "USD",
    amount: 0,
    fees: 0,
    responseCode: "",
    responseMessage: "" as string | JSX.Element,
    status: "SUCCESS" as any,
  });

  const getSelectedAccount = (id: string): DepositAccount | undefined => {
    return accounts?.find(account => account.id == id)
  }

  // Create and post transfer
  const submitTransferForm = ({
    transferType,
    sourceAccount,
    destinationAccount,
    saveBeneficiary,
    destinationAccountNo,
    narration,
    amount,
  }: FormikValues, { resetForm }: FormikHelpers<any>) => {
    const transferFormData = {
      idempotencyKey: idempotencyKey,
      srcAccountNo: getSelectedAccount(sourceAccount)?.accountNo ?? "",
      srcAccountLabel: getSelectedAccount(sourceAccount)?.accountLabel ?? "",
      destAccountNo: transferType == "self" ? getSelectedAccount(destinationAccount)?.accountNo
        : destinationAccountNo ?? "",
      destAccountLabel: transferType == "self" ? getSelectedAccount(destinationAccount)?.accountLabel
        : transferType == "internal"
          ? internalDestinationAccountLabel
          : beneficiaryValue.state
            ? beneficiaryValue.destAccountLabel
            : externalDestinationAccountLabel ?? "",
      destinationType: transferType == "external" ? "EXTERNAL" : "INTERNAL",
      currency: getSelectedAccount(sourceAccount)?.currency ?? "",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Type 'string' is not assignable to type '"SAVINGS" | "CURRENT" | "LOAN" | "INVESTMENT" | "INSURANCE"'
      srcAccountType: getSelectedAccount(sourceAccount)?.accountType ?? "CURRENT",
      institutionId:
        transferType !== "external"
          ? "9aad3a71-8237-46df-82b8-31627ef62313" //todosaveBeneficiary
          : beneficiaryValue.state
            ? beneficiaryValue.institutionId
            : bankOptions?.id ?? "", //todo
      institutionLabel:
        transferType !== "external"
          ? "MyWealth" //todo
          : beneficiaryValue.state
            ? beneficiaryValue.institutionLabel
            : bankOptions?.label ?? "",
      institutionCode:
        transferType !== "external"
          ? "004" //todo
          : beneficiaryValue.state
            ? beneficiaryValue.institutionCode
            : bankOptions?.code ?? "",
      transactionDate: today.toISOString(),
      amount,
      description: narration,
      saveBeneficiary,
      reference:
        (transferType != "external"
          ? `001/` //todo
          : beneficiaryValue.state
            ? beneficiaryValue.institutionCode
            : bankOptions?.code ?? "") +
        `${today.toISOString().split(" ")[0]}/${Math.random()
          .toString()
          .slice(2, 11)}`,
    };

    addTransfer(
      {
        ...transferFormData,
      } as TransferRequestType,
      {
        onSuccess: (data) => {
          // setIsTransferError(false);
          setTransferResponse({
            institutionLabel: data?.institutionLabel as string,
            reference: data?.reference as string,
            srcAccountNo: data?.srcAccountNo as string,
            srcAccountLabel: data?.srcAccountLabel as string,
            destAccountNo: data?.destAccountNo as string,
            destAccountLabel: data?.destAccountLabel as string,
            currency: data?.currency as string,
            amount: data?.amount as number,
            fees: data?.fees as number,
            responseCode: data?.responseCode as string,
            responseMessage: data?.responseMessage as string,
            status: data?.status as any,
          });

          setOpen(false);
          resetForm();
          setConfirm(!confirm);
        },
        onError: (error, variables) => {
          // setIsTransferError(true);
          const errorArr: Array<ErrorMessage> = JSON.parse(error.message);

          setTransferResponse({
            institutionLabel: variables.institutionLabel,
            reference: "no-reference",
            srcAccountNo: variables.srcAccountNo,
            srcAccountLabel: variables.srcAccountLabel,
            destAccountNo: variables.destAccountNo,
            destAccountLabel: variables.destAccountLabel,
            currency: variables.currency,
            amount: variables.amount,
            fees: 0,
            responseCode: "99",
            responseMessage: (
              <>
                {errorArr.map((item, index) => {
                  return (
                    <p key={index}>
                      {/* Format error message from TRPC to be human readable */}
                      {FormatErrorMsg(item.path?.[0] as string, item.message)}
                    </p>
                  );
                })}
              </>
            ),
            status: undefined,
          });
        },
      }
    );
  };

  // Clear transfer error message
  // useTimer(isTransferError, setIsTransferError, setTransferResponse);


  const initialTransferValues = {
    sourceAccount: "",
    transferType: "",
    amount: "",
    destinationAccount: "",
    destinationAccountNo: "",
    destinationBank: institutions?.content?.[0] as Institution ?? "",
    narration: "",
    saveBeneficiary: false,
  }

  const validateTransferSchema = yup.object().shape({
    sourceAccount: yup.string().required("Required"),
    transferType: yup.string().required("Required"),
    amount: yup.string().required("Required"),
    destinationAccount: yup.string()
      .when("transferType", ([transferType], schema) =>
        transferType == "self" ? schema.required("Required")
          : schema.notRequired()),
    destinationAccountNo: yup.number()
      .when("transferType", ([transferType], schema) =>
        (transferType == "internal" || transferType == "external")
          ? schema.required("Required")
          : schema.notRequired()
      ),
    destinationBank: yup.object(),
    narration: yup.string(),
    saveBeneficiary: yup.boolean()
  })

  const {
    values,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    touched,
    errors
  } = useFormik({
    initialValues: initialTransferValues,
    validationSchema: validateTransferSchema,
    onSubmit: submitTransferForm
  })

  //Reset transfer form data after when dialog is closed
  const resetTransferForm = () => {
    resetForm()
    setConfirm(false);
    setIdempotencyKey(uuidv4());
    setFromAccount(accounts?.[0]);
    setInternalDestinationAccountNo("");
    setInternalDestinationAccountLabel("");
    setExternalDestinationAccountNo("");
    setExternalDestinationAccountLabel("");
    setBeneficiaryValue({
      state: false,
      destAccountNo: "",
      destAccountLabel: "",
      institutionId: "",
      institutionCode: "",
      institutionLabel: "",
    });
    setBankOptions(institutions?.content?.[0]);
    setInternalAcct(false);
    setOpen(false);
  };

  return (
    <>
      {/* Transfer Modal */}
      <>
        <Modal
          open={open}
          size="lg"
          handler={() => {
            resetForm()
            setOpen(!open)
          }
          }
          reset={resetTransferForm}
          title="Transfer Funds"
        >
          <>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-5 gap-10">

                <div className="col-span-3 space-y-10">
                  <>
                    <div className="grid md:grid-cols-2 md:gap-x-7 md:gap-y-4">
                      <Select
                        placeholder=""
                        label="Source Account"
                        name="sourceAccount"
                        onBlur={handleBlur}
                        value={values.sourceAccount}
                        onChange={(value) => setFieldValue("sourceAccount", value)}
                        error={!!touched.sourceAccount && !!errors.sourceAccount}
                        className="text-xs"
                      >
                        {accounts?.map((account, index: number) =>
                          account.status === "ACTIVE" ? (
                            <Option
                              value={account.id}
                              key={account.id}
                              className="option"
                              onClick={() => handleFromAccount(index)}
                            >
                              {account.accountNo}
                            </Option>
                          ) : (
                            <Option
                              value={account.id}
                              key={account.id}
                              className="option"
                              // onClick={() => handleFromAccount(index)}
                              disabled
                            >
                              {account.accountNo}
                            </Option>
                          )
                        )}
                      </Select>
                      <Select
                        placeholder=""
                        name="transferType"
                        value={values.transferType}
                        label="Transfer type"
                        className="text-xs"
                        onBlur={handleBlur}
                        onChange={(choice) => setFieldValue("transferType", choice!)}
                        error={!!touched.transferType && !!errors.transferType}
                        aria-required
                      >
                        <Option
                          value="self"
                          className="option"
                        >
                          Self
                        </Option>
                        <Option
                          value="internal"
                          className="option"
                        >
                          Internal
                        </Option>
                        <Option
                          value="external"
                          className="option"
                        >
                          External
                        </Option>
                      </Select>
                      <Input
                        crossOrigin='true'
                        size="md"
                        label="Amount"
                        name="amount"
                        type="number"
                        value={values.amount}
                        className="text-xs focus:ring-0"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.amount && !!errors.amount}
                        maxLength={19}
                      />
                      {/* Change : Refactored components to only change states based on transfertype instead of rendering different components  */}
                      {values.transferType == "self" && (
                        <Select
                          placeholder=""
                          label="Destination Account"
                          name="destinationAccount"
                          value={values.destinationAccount}
                          onChange={(choice) => setFieldValue("destinationAccount", choice)}
                          onBlur={handleBlur}
                          error={!!touched.destinationAccount && !!errors.destinationAccount}
                          className="text-xs"
                        >
                          {accounts?.map((account) =>
                            account.status === "ACTIVE" &&
                              account.accountNo != fromAccount?.accountNo &&
                              account.currency === fromAccount?.currency ? (
                              <Option
                                value={account.id}
                                key={account.id}
                                className="option"
                              >
                                {account.accountNo}
                              </Option>
                            ) : (
                              <Option
                                value={account.id}
                                key={account.id}
                                className="option"
                                disabled
                              >
                                {account.accountNo}
                              </Option>
                            )
                          )}
                        </Select>
                      )}
                      {(values.transferType == "internal" || values.transferType == "external") && (
                        <>
                          <div className="relative">
                            <Input
                              crossOrigin="true"
                              size="md"
                              label="Destination Account No."
                              name="destinationAccountNo"
                              type="number"
                              value={values.destinationAccountNo}
                              className="text-xs outline-none ring-0 focus:outline-none focus:ring-0"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={!!touched.destinationAccountNo && !!errors.destinationAccountNo}
                            />
                            {beneficiaryValue.state == false &&
                              (internalDestinationAccountNo.length >= 10 ||
                                externalDestinationAccountNo.length >= 10) && (
                                <>
                                  {/* Look up destination account  */}
                                  <div className="absolute right-1 top-1 ">
                                    {processingLookup ? (
                                      <LoadingSpinner size="sm" lookup />
                                    ) : (
                                      <Tooltip
                                        content="Lookup account"
                                        placement="bottom-start"
                                        animate={{
                                          mount: { scale: 1, y: 0 },
                                          unmount: { scale: 0, y: 25 },
                                        }}
                                        className="bg-gray-600 text-xs"
                                      >
                                        <button
                                          className="rounded-lg bg-blue-gray-50 px-3 py-2 text-lg font-semibold transition duration-700 ease-out hover:scale-110 hover:shadow"
                                          onClick={(e) =>
                                            handleLookupTransferAcct(
                                              values.transferType == "internal"
                                                ? internalDestinationAccountNo
                                                : externalDestinationAccountNo,
                                              values.transferType == "internal"
                                                ? "INTERNAL"
                                                : "EXTERNAL",
                                              values.transferType == "internal"
                                                ? "001"
                                                : (bankOptions?.code as string),
                                              e
                                            )
                                          }
                                        >
                                          <HiArrowSmRight />
                                        </button>
                                      </Tooltip>
                                    )}
                                  </div>
                                  {/* Show look up error message  */}
                                  {isLookupError && (
                                    <span className="inline-error">
                                      {lookupErrorMsg}
                                    </span>
                                  )}
                                </>
                              )}
                          </div>
                        </>
                      )}
                      {/* Transfer Type:External -> SelectOption financial institution */}
                      {values.transferType == "external" && (
                        <Combobox value={values.destinationBank} name="destinationBank" onChange={(value) => setFieldValue("destinationBank", value)}>
                          <div className="relative mt-1 h-full ">
                            <div className="relative cursor-default bg-white text-left focus:outline-none focus:ring-0 sm:text-sm">
                              <div className="relative mt-2">
                                <Combobox.Input
                                  id="account"
                                  className="peer w-full border-0 border-b border-blue-gray-200 bg-gray-100 py-2 pl-2 pr-10 text-xs font-semibold leading-5 text-blue-gray-900 placeholder-transparent transition-colors focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0"
                                  displayValue={(bank: Institution) =>
                                    beneficiaryValue.state
                                      ? beneficiaryValue.institutionLabel
                                      : bank.label
                                  }
                                  placeholder=""
                                />
                                <label
                                  htmlFor="account"
                                  className="absolute -top-4 left-0 bg-transparent text-[10px] transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-blue-gray-800  peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary"
                                >
                                  Destination bank
                                </label>
                              </div>

                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Combobox.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              afterLeave={() => setBankQuery("")}
                            >
                              <Combobox.Options className=" absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md border-1 border-gray-300 bg-white p-4 text-base  shadow-lg sm:text-sm ">
                                {filteredBank &&
                                  filteredBank.length === 0 &&
                                  bankQuery !== "" ? (
                                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                  </div>
                                ) : (
                                  filteredBank?.map((bank, index) => (
                                    <Combobox.Option
                                      key={index}
                                      className={({ active }) =>
                                        `my-1 cursor-default select-none rounded-lg py-1 pl-2 text-xs text-blue-gray-500 ${active
                                          ? "bg-blue-gray-50 text-gray-900"
                                          : "text-gray-900"
                                        }`
                                      }
                                      value={
                                        beneficiaryValue.state
                                          ? beneficiaryValue
                                          : bank
                                      }
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${selected
                                              ? "font-medium"
                                              : "font-normal"
                                              }`}
                                          >
                                            {bank.label}
                                          </span>
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))
                                )}
                              </Combobox.Options>
                            </Transition>
                          </div>
                        </Combobox>
                      )}

                      {/* Display look up account */}
                      {
                        //lookup &&
                        ((externalDestinationAccountLabel != "" &&
                          externalDestinationAccountLabel != undefined) ||
                          (internalDestinationAccountLabel != "" &&
                            internalDestinationAccountLabel != undefined) ||
                          beneficiaryValue.state) && (
                          <div className="relative w-full rounded-xl bg-blue-gray-50  p-4   text-center align-middle font-semibold text-blue-gray-500">
                            <p className="text-xs uppercase">
                              {internalAcct
                                ? internalDestinationAccountLabel
                                : beneficiaryValue.state
                                  ? beneficiaryValue.destAccountLabel
                                  : externalDestinationAccountLabel}
                            </p>
                            <p
                              className=" absolute right-1 top-1  h-7 w-7 cursor-pointer rounded-full bg-transparent text-center text-xs hover:text-blue-gray-900 hover:shadow-blue-gray-200"
                              onClick={() =>
                                internalAcct
                                  ? setInternalDestinationAccountLabel("")
                                  : beneficiaryValue.state
                                    ? setBeneficiaryValue((beneficiaryValue) => ({
                                      ...beneficiaryValue,
                                      state: false,
                                    }))
                                    : setExternalDestinationAccountLabel("")
                              }
                            >
                              x
                            </p>
                          </div>
                        )
                      }
                    </div>
                    {/* Transfer narration */}
                    <Textarea
                      label="Narration"
                      name="narration"
                      value={values.narration}
                      className="text-xs focus:ring-0"
                      onChange={handleChange}
                      error={!!touched.narration && !!errors.narration}
                    />
                    {/* Save beneficiary switch */}
                    {(values.transferType == "internal" ||
                      (values.transferType == "external" && beneficiaryValue.state == false)) && (
                        <Switch
                          crossOrigin="true"
                          checked={values.saveBeneficiary}
                          name="saveBeneficiary"
                          onChange={handleChange}
                          label="save as beneficiary"
                        />
                      )}
                    <div className="mt-2 grid place-items-center">
                      {processingTransfer ? (
                        <LoadingSpinner label="Processing ..." size="md" />
                      ) : (
                        <button className="primary-btn" type="submit">
                          <span>Confirm & proceed</span>
                          <span className="ml-2">
                            <HiArrowNarrowRight />
                          </span>
                        </button>
                      )}
                    </div>
                  </>
                  {/* Show transfer error message */}
                  {transferResponse != undefined &&
                    transferResponse.status == undefined && (
                      <ErrorDisplay>
                        <div>{transferResponse.responseMessage}</div>
                      </ErrorDisplay>
                    )}
                </div>

                {/* Side card - Transfer Details  */}
                <div className="col-span-2 rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
                  <div className="text-md mb-5 font-semibold leading-6">
                    Your transfer details
                  </div>
                  <div className="text-xs font-medium">
                    <>
                      <ul className="space-y-4">
                        <li className="flex justify-between">
                          <span className="text-gray-500">Transfer type</span>
                          <span className="capitalize">{values.transferType}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">
                            Source Account Type
                          </span>
                          <span>{getSelectedAccount(values.sourceAccount)?.accountType ?? ""}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">
                            Source Account Product
                          </span>
                          <span>{getSelectedAccount(values.sourceAccount)?.productType ?? ""}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">Source Account</span>
                          <span>{getSelectedAccount(values.sourceAccount)?.accountNo ?? ""}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">
                            Source Account Label
                          </span>
                          <span>{getSelectedAccount(values.sourceAccount)?.accountLabel ?? ""}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">Currency</span>
                          <span>{getSelectedAccount(values.sourceAccount)?.currency ?? ""}</span>
                        </li>

                        <li className="flex justify-between">
                          <span className="text-gray-500">
                            Destination Account
                          </span>
                          <span>
                            {values.transferType == "self"
                              ? getSelectedAccount(values.destinationAccount)?.accountNo
                              : beneficiaryValue.state
                                ? beneficiaryValue.destAccountNo
                                : values.destinationAccountNo}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">
                            Destination Account Label
                          </span>
                          <span>
                            {values.transferType == "self"
                              ? getSelectedAccount(values.destinationAccount)?.accountLabel
                              : internalAcct
                                ? internalDestinationAccountLabel
                                : beneficiaryValue.state
                                  ? beneficiaryValue.destAccountLabel
                                  : externalDestinationAccountLabel}
                          </span>
                        </li>
                        {values.transferType == "external" && (
                          <li className="flex justify-between">
                            <span className="text-gray-500">
                              Destination Bank
                            </span>
                            <span>
                              {values.destinationBank.label ?? bankOptions?.label}
                            </span>
                          </li>
                        )}

                        <li className="flex justify-between">
                          <span className="text-gray-500">Date</span>
                          <span>{DateToStringFormatter(todayAsString)}</span>
                        </li>
                      </ul>
                      <hr className="my-4" />
                      <ul className="space-y-4">
                        <li className="flex justify-between">
                          <span className="text-gray-500">Current Balance</span>
                          <span>
                            {NumberFormatter(getSelectedAccount(values.sourceAccount)?.balance ?? 0.0)}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">Amount</span>
                          <span>{NumberFormatter(+values.amount)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">New Balance</span>
                          <span
                            className={classNames(
                              (getSelectedAccount(values.sourceAccount)?.balance as number) - +values.amount < 0
                                ? "text-error"
                                : "",
                              "font-bold"
                            )}
                          >
                            {NumberFormatter(
                              (getSelectedAccount(values.sourceAccount)?.balance ?? 0.0) - +values.amount
                            )}
                          </span>
                        </li>
                      </ul>

                      <hr className="my-4" />
                      <li className="flex justify-between">
                        <span className="text-gray-500">Narration</span>
                        <span>{values.narration}</span>
                      </li>
                    </>
                  </div>
                </div>
              </div>
            </form>

            {/* Show Saved Beneficiaries and Recent Transfers only for internal or external transfers */}
            {(values.transferType == "internal" || values.transferType == "external") && (
              <div className=" mt-10 transition duration-500 ease-in-out">
                {freqTransactions}
              </div>
            )}
          </>
        </Modal>

        <Modal
          open={confirm}
          size="md"
          handler={handleConfirmModal}
          reset={resetTransferForm}
        >
          <div className="mx-10 grid place-items-center space-y-4">
            {transferResponse != undefined &&
              (transferResponse.status === "SUCCESS" ? (
                <>
                  <BsCheckCircleFill className="text-5xl font-bold text-success" />
                  <span className="text-5xl font-bold">Success</span>
                  <div className="text-center text-sm leading-5 tracking-wide">
                    Your transfer of
                    <span className="font-semibold">{` ${NumberFormatter(
                      transferResponse.amount
                    )} `}</span>
                    to
                    <span className="font-semibold">{` ${transferResponse.destAccountLabel}(${transferResponse.destAccountNo} - ${transferResponse.institutionLabel}) has been submitted.`}</span>
                  </div>
                </>
              ) : (
                transferResponse.status != undefined && (
                  <>
                    <ErrorDisplayOnConfirm>
                      <div className="text-center text-sm leading-5 tracking-wide">
                        <p className="font-semibold">{`Transaction ${transferResponse.status}`}</p>
                        <p className="font-semibold">
                          {transferResponse.responseMessage as string}
                        </p>
                      </div>
                    </ErrorDisplayOnConfirm>
                  </>
                )
              ))}
          </div>
        </Modal>
      </>
    </>
  );
}
