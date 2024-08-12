import React, { Dispatch, SetStateAction, useId, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  BillSchedulePaymentFrequency,
  LocalDate,
  BillScheduleStatus,
} from "~/server/api/models/banking";
import { Label } from "~/components/util/control-label";
import Select, { components } from "react-select";
import { customSelectStyles } from "~/components/util/custom-select-style";
import {
  Input,
  Option,
  Select as MSelect,
  Tooltip,
} from "@material-tailwind/react";
import { NumberFormatter } from "~/components/util/number-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import { today, todayAsString } from "~/components/util/today";
import { HiArrowNarrowRight, HiArrowSmRight } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import { accountView, BillerView, ScheduleRequestType } from "~/server/api/routers/banking";
import classNames from "classnames";
import { LoadingSpinner } from "~/components/ui/spinner";
import {
  ErrorDisplay,
  ErrorDisplayOnConfirm,
  FormatErrorMsg,
} from "~/components/ui/error-display";
import useMapper from "~/components/util/custom-hooks/use-mapper";
import Modal from "~/components/navigation/modal";

export default function PayBills({
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
  // Load the accounts
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  const { data: accounts } = api.banking.getAccountsForClient.useQuery(
    clientId,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const [biller, setBiller] = useState<BillerView>();
  const [index, setIndex] = useState(0);

  const [billType, setBillType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [account, setAccount] = useState<accountView | undefined>(accounts?.[0]);
  const [billAccountNo, setBillAccountNo] = useState("");
  const [billAccountLabel, setBillAccountLabel] = useState("");

  //Set selected deposit account
  const handleAccount = (index: number) => {
    setAccount(accounts?.[index]);
  };

  // Set selected bill type
  const handleBillerType = (index: number, value: string) => {
    setBillType(value);
    setIndex(index);
  };

  const billTypes: {
    billers: { value: string; label: string }[];
    value: string;
    label: string;
  }[] = [];

  const { isLoading: isBillerLoading, data: billers } =
    api.banking.getActiveBillers.useQuery(undefined, {
      onSuccess: (billerType) => {
        return billerType;
      },
    });

  //Create a map of all the billers based on the  type
  const billerMap = new Map<string, [{ value: string; label: string }]>();
  billers?.forEach((biller) => {
    if (billerMap.has(biller.type)) {
      const billers = billerMap.get(biller.type);
      billers?.push({ value: biller.id, label: biller.label });
    } else {
      billerMap.set(biller.type, [{ value: biller.id, label: biller.label }]);
    }
  });

  //Create the billTypes array from the map
  billerMap.forEach((value, key) => {
    billTypes.push({
      value: key,
      label:
        key.charAt(0).toUpperCase() +
        key.toLowerCase().slice(1).replaceAll("_", ""),
      billers: value,
    });
  });

  // Populate biller dropdown from selected bill type
  const SelectBiller = ({ index }: { index: number }) => {
    const updatedBillers = billTypes[index]?.billers.map(({ value, label }) => {
      return { value: value, label: label };
    });

    const handleBillerSelect = (choice: { value: string; label: string }) => {
      setBiller(billers?.find((biller) => biller.id === choice.value));
    };

    const Control = (props: any) => {
      return (
        <>
          <Label
            isFloating={props.isFocused || props.hasValue}
            className=" text-blue-gray-400"
          >
            Biller
          </Label>
          <components.Control {...props} />
        </>
      );
    };

    return (
      <Select
        name="select"
        // @ts-ignore
        options={updatedBillers}
        placeholder=""
        components={{ Control }}
        value={biller}
        instanceId={useId()}
        // @ts-ignore
        onChange={handleBillerSelect}
        isSearchable={true}
        classNamePrefix="select"
        styles={customSelectStyles}
        className="mt-1.5"
        menuPlacement="auto"
        classNames={{
          option: (state) =>
            state
              ? "text-blue-gray-500 hover:bg-blue-gray-50 hover:rounded-lg hover:text-blue-gray-900 hover:bg-opacity-80 my-1 py-1 text-xs"
              : "bg-blue-gray-500 option",
        }}
      />
    );
  };

  const handleBillConfirmModal = () => {
    setOpen(!open);
    setConfirm(!confirm);
  };

  const [lookupErrorMsg, setLookupErrorMsg] = useState<JSX.Element>();
  const [isLookupError, setIsLookupError] = useState(false);

  const { mutate: lookupBillAcct, isLoading: processingLookup } =
    api.banking.lookupBillAccount.useMutation();

  const handleLookupBillAcct = (
    accountNo: string,
    billerCode: string,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();

    lookupBillAcct(
      { billerCode: billerCode, billAccountNo: accountNo },
      {
        onSuccess: (data) => {
          setIsLookupError(false);
          setBillAccountNo(data.billerAccountNo);
          setBillAccountLabel(data.billerAccountLabel);
        },
        onError: (error) => {
          setIsLookupError(true);
          const errorArr: Array<{}> = JSON.parse(error.message);
          setLookupErrorMsg(
            <>
              {errorArr.map((item, index) => {
                return (
                  <p key={index}>
                    {/* Format error message from TRPC to be human readable */}
                    {/* @ts-ignore */}
                    {FormatErrorMsg(item.path[0], item.message)}
                  </p>
                );
              })}
            </>
          );
        },
      }
    );
  };

  // Clear look up error message
  // useTimer(setLookupErrorMsg, isLookupError, setIsLookupError);

  const { mutate: addBillSchedule, isLoading: processingSchedule } =
    api.banking.addBillSchedule.useMutation();

  const billFormData = {
    accountId: account?.id ?? "",
    currency: account?.currency ?? "",
    billerId: biller?.id ?? "",
    billAccountNo: billAccountNo ?? "",
    startDate: today.toISOString(),
    billAmount: +billAmount,
    paymentFrequency: frequency as "ONCE" | "MONTHLY" | "QUARTERLY" | "YEARLY",
    label: `${account?.accountLabel} - Bill - ${biller?.label}`,
    autoApprove: true,
  };

  const [isScheduleError, setIsScheduleError] = useState(false);

  const [billScheduleResponse, setBillScheduleResponse] = useState({
    code: null as null | string,
    billAmount: 0,
    currency: "",
    label: "",
    status: "PENDING" as BillScheduleStatus | string | undefined,
    paymentFrequency: "ONCE" as BillSchedulePaymentFrequency | string,
    startDate: "" as LocalDate | null,
    endDate: "" as LocalDate | null,
    errorMsg: "" as string | JSX.Element,
  });

  const submitBillSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addBillSchedule(
      {
        ...billFormData,
      } as ScheduleRequestType,
      {
        onSuccess: (data) => {
          setIsScheduleError(false);
          setBillScheduleResponse({
            code: data.code,
            billAmount: data.billAmount,
            currency: data.currency,
            label: data.label,
            status: data.status,
            paymentFrequency: data.paymentFrequency,
            startDate: data.startDate,
            endDate: data.endDate,
            errorMsg: "",
          });
          setOpen(false);
          setConfirm(!confirm);
        },
        onError: (error, variables) => {
          setIsScheduleError(true);
          const errorArr: Array<{}> = JSON.parse(error.message);

          setBillScheduleResponse({
            code: null,
            billAmount: variables.billAmount,
            currency: variables.currency,
            label: "",
            status: undefined,
            paymentFrequency: frequency,
            startDate: null,
            endDate: null,
            errorMsg: (
              <>
                {errorArr.map((item, index) => {
                  return (
                    <p key={index}>
                      {/* Format error message from TRPC to be human readable */}
                      {/* @ts-ignore */}
                      {FormatErrorMsg(item.path[0], item.message)}
                    </p>
                  );
                })}
              </>
            ),
          });
        },
      }
    );
  };

  // Clear up error message
  // useTimer(setBillScheduleResponse, isScheduleError, setIsScheduleError);

  const resetScheduleForm = () => {
    setAccount(accounts?.[0]);
    setBillAmount("");
    setFrequency("");
    setBillType("");
    setBiller(undefined);
    setBillAccountNo("");
    setBillAccountLabel("");
    setConfirm(false);
    setOpen(false);
  };

  return (
    <>
      {/* Pay Bills Modal */}
      <>
        <Modal
          open={open}
          size="lg"
          handler={() => setOpen(!open)}
          reset={resetScheduleForm}
          title="Pay Bills"
        >
          <form onSubmit={(e) => submitBillSchedule(e)}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-3 space-y-10">
                <div className="grid grid-cols-2 gap-7">
                  <MSelect label="Account" className="text-xs" placeholder="">
                    {accounts?.map((account, index) =>
                      account.status === "ACTIVE" ? (
                        <Option
                          value={account.id}
                          key={account.id}
                          className="option"
                          onClick={() => handleAccount(index)}
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
                  </MSelect>
                  <MSelect label="Bill Type" className="text-xs" placeholder="">
                    {!isBillerLoading &&
                      billTypes?.map((options, index) => (
                        <Option
                          value={options.value}
                          key={index}
                          onClick={() => handleBillerType(index, options.value)}
                          className="option"
                        >
                          {options.label}
                        </Option>
                      ))}
                  </MSelect>
                  <MSelect
                    label="Frequency"
                    className="text-xs"
                    placeholder={"SelectOption frequency"}
                    onChange={(choice) => setFrequency(choice ?? "")}
                  >
                    {useMapper(BillSchedulePaymentFrequency).map(
                      (option, index) => (
                        <Option
                          value={option as string}
                          key={index}
                          className="option"
                        >
                          {option as string}
                        </Option>
                      )
                    )}
                  </MSelect>
                  {/* SelectOption Biller  */}
                  {billType != "" && <SelectBiller index={index} />}

                  <Input
                    crossOrigin={true}
                    size="lg"
                    label="Amount"
                    className="text-xs"
                    onChange={(e) => setBillAmount(e.target.value)}
                    required
                  />
                  <div className="relative">
                    <Input
                      crossOrigin={true}
                      size="lg"
                      label="Biller Account"
                      className="text-xs"
                      onChange={(e) => setBillAccountNo(e.target.value)}
                      required
                      aria-required
                    />
                    {/* Look up biller account */}
                    <div className="absolute right-1 top-1 ">
                      {processingLookup ? (
                        <LoadingSpinner size="sm" lookup />
                      ) : (
                        <Tooltip
                          content="Lookup account"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                          className="bg-gray-600 text-xs"
                          placeholder="left"
                        >
                          <button
                            className="rounded-lg bg-blue-gray-50 px-3 py-2 text-lg font-semibold transition duration-700 ease-out hover:scale-110 hover:shadow"
                            onClick={(e) =>
                              handleLookupBillAcct(
                                billAccountNo,
                                biller?.code as string,
                                e
                              )
                            }
                          >
                            <HiArrowSmRight />
                          </button>
                        </Tooltip>
                      )}
                    </div>
                    {/* Show look up error message */}
                    {lookupErrorMsg != undefined && isLookupError && (
                      <span className="inline-error">{lookupErrorMsg}</span>
                    )}
                  </div>
                  {billAccountLabel != "" && (
                    <div className="relative w-full rounded-xl bg-blue-gray-50 p-4 text-center align-middle font-semibold text-blue-gray-500">
                      <p className="text-xs uppercase">{billAccountLabel}</p>
                      <p
                        className=" absolute right-1 top-1  h-7 w-7 cursor-pointer rounded-full bg-transparent text-center text-xs hover:text-blue-gray-900 hover:shadow-blue-gray-200"
                        onClick={() => setBillAccountLabel("")}
                      >
                        x
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-8 grid place-items-center">
                  {processingSchedule ? (
                    <LoadingSpinner size="md" label="Processing ..." />
                  ) : (
                    <button className="primary-btn" type="submit">
                      <span>Confirm & proceed</span>
                      <span className="ml-2">
                        <HiArrowNarrowRight />
                      </span>
                    </button>
                  )}
                </div>
                {billScheduleResponse != undefined &&
                  billScheduleResponse.status === undefined && (
                    <ErrorDisplay>
                      <div>{billScheduleResponse.errorMsg}</div>
                    </ErrorDisplay>
                  )}
              </div>
              <div className="col-span-2 rounded-xl bg-gray-50 p-4 text-gray-700 shadow">
                <div className="text-md mb-5 font-semibold leading-6">
                  Your transaction details
                </div>
                <div className="text-xs font-medium">
                  <>
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Account No</span>
                        <span className="capitalize">{account?.accountNo}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Account Label</span>
                        <span className="capitalize">
                          {account?.accountLabel}
                        </span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-gray-500">Bill Type</span>
                        <span>{billType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Biller</span>
                        <span>{biller?.label}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Frequency</span>
                        <span>{frequency}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Bill Account No</span>
                        <span>{billAccountNo}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">
                          Bill Account Label
                        </span>
                        <span>{billAccountLabel}</span>
                      </li>

                      <li className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span>{DateToStringFormatter(todayAsString)}</span>
                      </li>
                    </ul>
                    <hr className="my-4" />
                    <ul className="space-y-4">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Current Balance</span>
                        <span>{NumberFormatter(account?.balance ?? 0.0)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span>{NumberFormatter(+billAmount)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">New Balance</span>
                        <span
                          className={classNames(
                            (account?.balance as number) - +billAmount < 0
                              ? "text-error"
                              : "",
                            "font-bold"
                          )}
                        >
                          {NumberFormatter(
                            (account?.balance ?? 0.0) - +billAmount
                          )}
                        </span>
                      </li>
                    </ul>
                  </>
                </div>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          open={confirm}
          size="md"
          handler={handleBillConfirmModal}
          reset={resetScheduleForm}
        >
          <div className="mx-10 grid place-items-center space-y-4">
            {billScheduleResponse != undefined &&
              // (billScheduleResponse.status == "PENDING" ||
              // billScheduleResponse.status == "IN_PROGRESS"  ? (
              (billScheduleResponse.status != undefined ||
                billScheduleResponse.status != null ||
                billScheduleResponse.status != "" ? (
                <>
                  <BsCheckCircleFill className="text-5xl font-bold text-success" />
                  <span className="text-5xl font-bold">Success</span>
                  <div className="text-center text-sm leading-5 tracking-wide">
                    Your bill
                    <span className="font-semibold">{` ${billScheduleResponse.label} `}</span>
                    of
                    <span className="font-semibold">{` ${billScheduleResponse.currency
                      }${NumberFormatter(
                        +billScheduleResponse.billAmount
                      )} `}</span>
                    has been created successfully.
                  </div>
                  <div className=" text-sm">
                    Current status:
                    <span className="font-semibold">{` ${billScheduleResponse.status}`}</span>
                  </div>
                </>
              ) : (
                // billScheduleResponse != undefined &&
                // (
                <>
                  <ErrorDisplayOnConfirm>
                    <div className="text-center text-sm leading-5 tracking-wide">
                      <p className="font-semibold">{`Transaction ${billScheduleResponse.status}`}</p>
                      <p className="font-semibold">
                        {billScheduleResponse.errorMsg as string}
                      </p>
                    </div>
                  </ErrorDisplayOnConfirm>
                </>
                // )
              ))}
          </div>
        </Modal>
      </>
    </>
  );
}
