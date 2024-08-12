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
import { ClaimRequestType, QuoteRequestType } from "~/server/api/routers/insure";
import { InsuranceProduct } from "~/server/api/models/insurance";
import { FixedDepositProduct } from '~/server/api/models/investing';
import { formatMoney } from '~/utils/format';
import {
  ErrorDisplay,
  SuccessDisplay
} from "~/components/ui/error-display";
import { LoadingSpinner } from '../util/spinner'
import { formatErrorMssg } from "~/utils/format";
import { api } from "~/utils/api";
import {
  coverageType,
  paymentTerms,
} from "~/components/data/insurance-data";

type Props = {
  newQuote: boolean
  handleNewQuote: () => void
  currencies: any[]
  productCategories: any[]
  carriers: any[]
  branches: any[]
  setQuotes: any
  quotes: any[]
  refetchQuotes: any
  clientId: string
  sessionData: any
}

const NewQuoteModal = ({
  newQuote, handleNewQuote, currencies, productCategories, carriers, branches, setQuotes,
  quotes, refetchQuotes, clientId, sessionData }: Props) => {
  const [responseMessage, setResponseMessage] = useState<{
    success?: string;
    error?: string;
  }>({
    error: "",
    success: "",
  });

  const [selectedProductCategory, setSelectedProductCategory] = useState<InsuranceProduct | undefined>(undefined);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCoverage, setSelectedCoverage] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [currency, setCurrency] = useState("");
  const [sumIssured, setSumIssured] = useState("");

  // add new quote
  const { mutate: addQuote, isLoading: loadingAddingQuote } =
    api.insurance.addQuote.useMutation();

  const submitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const label = `${sessionData?.user.name} - Quote - ${quotes.length++}`;
    const newQuote = {
      productType: selectedProductCategory?.code,
      productId: selectedProductCategory?.id,
      currency: currency,
      sumInsured: +sumIssured,
      startDate: formattedDate,
      paymentTerms: selectedPayment,
      partnerId: selectedPartner,
      riskType: selectedCoverage,
      clientId,
      quoteLabel: label,
      refQuoteNo: "",
      branchId: selectedBranch
    }

    addQuote({ ...newQuote } as QuoteRequestType, {
      onSuccess: (data: any) => {
        setQuotes([...quotes, data]);
        setResponseMessage({ success: "Quote generated!" });
        setSelectedProductCategory(undefined);
        setSelectedBranch("");
        setSelectedCoverage("");
        setCurrency("");
        setSelectedPayment("");
        setSelectedBranch("");
        setSelectedPartner("")
        setSumIssured("")

        setTimeout(() => {
          handleNewQuote();
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
        refetchQuotes();
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
      open={newQuote}
      size={"lg"}
      handler={handleNewQuote}
      className=" bg-gray-100 "
    >
      <DialogHeader className="relative font-nun" placeholder={""}>
        <div className="flex flex-col">
          <span className=" font-bold">Generate a quote</span>
        </div>

        <button
          className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          onClick={handleNewQuote}
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

            <form className="pt-8" onSubmit={(e) => submitQuote(e)}>
              <div className="grid grid-flow-row grid-cols-2 gap-x-10 gap-y-8">
                <Select
                  label="Category"
                  className="text-xs"
                  placeholder={""}
                  //@ts-ignore
                  value={selectedProductCategory}
                  onChange={(value) => setSelectedProductCategory(value as unknown as InsuranceProduct)}
                >
                  {productCategories.map((category) => (
                    <Option
                      className="option"
                      value={category as any}
                      key={category.id}
                    >
                      {category.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Branch"
                  className="text-xs"
                  placeholder={""}
                  value={selectedBranch}
                  onChange={(value: any) => setSelectedBranch(value)}
                >
                  {branches.map((branche) => (
                    <Option
                      className="option"
                      value={branche.id}
                      key={branche.id}
                    >
                      {branche.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Partner"
                  className="text-xs"
                  placeholder={""}
                  value={selectedPartner}
                  onChange={(value: any) => setSelectedPartner(value)}
                >
                  {carriers.map((carrier) => (
                    <Option
                      className="option"
                      value={carrier.id}
                      key={carrier.id}
                    >
                      {carrier.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Coverage Type"
                  className="text-xs"
                  placeholder={""}
                  value={selectedCoverage}
                  onChange={(value: any) => setSelectedCoverage(value)}
                >
                  {coverageType.map((coverage) => (
                    <Option
                      className="option"
                      value={coverage.code}
                      key={coverage.id}
                    >
                      {coverage.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="Payment Terms"
                  className="text-xs"
                  placeholder={""}
                  value={selectedPayment}
                  onChange={(value: any) => setSelectedPayment(value)}
                >
                  {paymentTerms.map((term, index) => (
                    <Option
                      className="option"
                      value={term.code}
                      key={index}
                    >
                      {term.label}
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
                {/* <Datepicker
                        value={date}
                        onChange={handleDateChange}
                        useRange={false}
                        showShortcuts={false}
                        asSingle={true}
                        containerClassName="focus:outline-none"
                        inputClassName="border-0 border-b focus:ouline-none bg-transparent ring-0 outline-none text-xs text-gray-600"
                        placeholder="Transaction Date Range"
                      /> */}
                {/* <Input
                          label="Label"
                          className="text-xs"
                          crossOrigin={true}
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                        /> */}
                <Input
                  label="Sum Insured"
                  className="text-xs"
                  crossOrigin={true}
                  value={sumIssured}
                  onChange={(e) => setSumIssured(e.target.value)}
                />
                {/* <Input
                  type="date"
                  label="Date"
                  className="text-xs"
                  crossOrigin={true}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                /> */}
              </div>
              <div className="mt-8 grid place-items-end">
                <button className="secondary-btn" disabled={loadingAddingQuote}>
                  {loadingAddingQuote ? <LoadingSpinner label="loading" size="sm" lookup /> : "Get Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogBody>
    </MDialog>
  )
}

export default NewQuoteModal;
