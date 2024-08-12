import { RadioGroup } from '@headlessui/react'
import {
  Dialog as MDialog,
  DialogHeader,
  DialogBody,
  Select,
  Option,
  Input,
  Textarea
} from '@material-tailwind/react'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { ClaimRequestType } from "~/server/api/routers/insure";
import { FixedDepositProduct } from '~/server/api/models/investing';
import { formatMoney } from '~/utils/format';
import {
  ErrorDisplay,
  SuccessDisplay
} from "~/components/ui/error-display";
import { LoadingSpinner } from '../util/spinner'
import { formatErrorMssg } from "~/utils/format";
import { api } from "~/utils/api";

type Props = {
  newClaim: boolean
  handleNewClaim: () => void
  policies: any[]
  currencies: any[]
  setClaims: any
  claims: any[]
  refetchClaims: any
}

const NewClaimModal = ({ newClaim, handleNewClaim, policies, currencies, setClaims, claims, refetchClaims }: Props) => {
  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimDescr, setClaimDescr] = useState("");
  const [currency, setCurrency] = useState("");

  // add new claim
  const { mutate: addClaim, isLoading: loadingAddingClaim } =
    api.insurance.addClaim.useMutation();

  const submitClaim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const newClaim = {
      claimLabel: claimDescr,
      currency: currency,
      claimAmount: +claimAmount,
      claimDate: formattedDate,
      policyId: selectedPolicy,
      refClaimNo: ""
    }

    addClaim({ ...newClaim } as ClaimRequestType, {
      onSuccess: (data: any) => {
        setClaims([...claims, data]);
        setResponseMessage({ success: "Claim added!" });
        setClaimDescr("");
        setClaimAmount("");
        setCurrency("");
        setSelectedPolicy("");

        setTimeout(() => {
          handleNewClaim();
        }, 3000)
      },
      onError: (error) => {
        if (error.message) {
          const errorDetails = JSON.parse(error.message);
          const formattedMessage = errorDetails.map((err: any) => formatErrorMssg(err.message)).join(', ');
          setResponseMessage({ error: formattedMessage });
        } else {
          setResponseMessage({ error: formatErrorMssg("An error occured!") });
        }
      },
      onSettled: () => {
        refetchClaims();
      }
    });
  };

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

  return (
    <MDialog
      placeholder={""}
      open={newClaim}
      size={"lg"}
      handler={handleNewClaim}
      className=" bg-gray-100 "
    >
      <DialogHeader className="relative font-nun" placeholder={""}>
        <div className="flex flex-col">
          <span className=" font-bold">Make a Claim</span>
        </div>

        <button
          className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          onClick={handleNewClaim}
        >
          x
        </button>
      </DialogHeader>
      <DialogBody className="h-full p-4 font-nun" placeholder={""}>
        <div className="flex flex-col">
          <div className="col-span-2 pl-8">
            <div className="mx-auto flex w-1/2 items-center justify-center text-center">
              {responseMessage.error ? (
                <ErrorDisplay>{responseMessage.error}</ErrorDisplay>
              ) : responseMessage.success ? (
                <SuccessDisplay>{responseMessage.success}</SuccessDisplay>
              ) : null}
            </div>
            <form className="pt-8" onSubmit={(e) => submitClaim(e)}>
              <div className="grid grid-flow-row grid-cols-2 gap-x-10 gap-y-8">
                <Select
                  label="Policy"
                  className="text-xs"
                  placeholder={""}
                  value={selectedPolicy}
                  onChange={(value: any) => setSelectedPolicy(value)}
                >
                  {policies?.map((policy) => (
                    <Option
                      className="option"
                      value={policy.id}
                      key={policy.id}
                    >
                      {policy.policyLabel}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Currency"
                  className="text-xs"
                  placeholder={""}
                  value={currency}
                  onChange={(value: any) => setCurrency(value)}
                >
                  {currencies?.map(currency => (
                    <Option
                      className="option"
                      value={currency.code}
                      key={currency.id}
                    >{currency.label}</Option>
                  ))}
                </Select>
                <Input
                  label="Claim Amount"
                  className="text-xs"
                  crossOrigin={true}
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                />
                <Textarea
                  label="Claim Descr"
                  className="text-xs"

                  value={claimDescr}
                  onChange={(e) => setClaimDescr(e.target.value)}
                />
              </div>
              <div className="mt-8 grid place-items-end">
                <button className="secondary-btn" disabled={loadingAddingClaim}>
                  {loadingAddingClaim ? <LoadingSpinner label="loading" size="sm" lookup /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogBody>
    </MDialog>
  )
}

export default NewClaimModal;
