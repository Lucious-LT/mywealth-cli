import { useEffect, useState } from "react";
import CardHeader from "~/components/layout/card-header";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import InsureLayout from "~/components/layout/page/insure-layout";
import { NumberFormatter } from "~/components/util/number-formatter";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "~/components/util/spinner";
import { 
  Claim, 
  Policy as PolicyAccount,
  Quote as QuoteAccount, 
  InsuranceProduct,
  Partner,
  Branch
} from "~/server/api/models/insurance";
import { CurrencyCode } from "~/server/api/models/accounting";
import { HiArrowNarrowRight, HiPlus } from "react-icons/hi";
import { Menu } from "@headlessui/react";
import { BsSliders2 } from "react-icons/bs";
import { motion } from "framer-motion";
import classNames from "classnames";
import NewQuoteModal from "~/components/modals/new-quote-modal";

const Quotes = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  // fetch quotes data
  const { data: quotesData, isLoading: loadingQuotes, refetch: refetchQuotes } =
    api.insurance.getQuotesForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  const [quotes, setQuotes] = useState<QuoteAccount[]>(quotesData ?? []);

  // fetch currencies
  const { data: currenciesData, isLoading: loadingCurrencies } =
    api.insurance.getCurrencies.useQuery();

  const currencies: CurrencyCode[] = currenciesData ?? [];

  // fetch product categories
  const { data: productCategoriesData, isLoading: loadingProductCatgeories } =
    api.insurance.getProductCatgeories.useQuery();

  const productCategories: InsuranceProduct[] = productCategoriesData ?? [];

  // fetch partners
  const { data: partnersData, isLoading: loadingPartners } =
    api.insurance.getPartners.useQuery();

  const carriers: Partner[] = partnersData ?? [];

  // fetch branches
  const { data: branchesData, isLoading: loadingBranches } =
    api.insurance.getBranches.useQuery();

  const branches: Branch[] = branchesData ?? [];

  useEffect(() => {
    if (quotesData) {
      setQuotes(quotesData);
    }
  }, [quotesData]);

  // Handle New Quote modal
  const [newQuote, setNewQuote] = useState(false);
  const handleNewQuote = () => {
    setNewQuote(!newQuote);
  }

  return (
    <>
      <div className="mb-8 relative">
        <div className="flex items-center ">
          <CardHeader title="My Quotes" />
          <button className="primary-btn" onClick={handleNewQuote}>
            <HiPlus /> <span className="ml-2">New Quote</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 flex justify-between">
          <div className="relative">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="secondary-btn flex items-center">
                    <BsSliders2 />
                    <span className="ml-2">Filter</span>
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      as={motion.div}
                      initial={{ height: "0", opacity: "0" }}
                      animate={{ height: "auto", opacity: "1" }}
                      transition={{ duration: "0.15" }}
                      className="absolute right-0 z-10 mt-2 divide-y-1 divide-gray-200 rounded-sm bg-gray-50 text-center text-xs shadow transition duration-500 ease-in-out focus:outline-none"
                    >
                      {/* {statusFilter &&
                        statusFilter.map((status, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                className={`${active ? "text-primary" : ""
                                  } block whitespace-nowrap px-2 py-2`}
                                value={status.value}
                                onClick={handleFixedDepositStatusFilter}
                              >
                                {capitalize(status.name.replaceAll("-", " "))}
                              </button>
                            )}
                          </Menu.Item>
                        ))} */}
                    </Menu.Items>
                  )}
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <div className={`${loadingQuotes && `items-center`} flex flex-col space-y-4 overflow-hidden`}>
        {loadingQuotes ?
          <LoadingSpinner size="lg" label="Loading Quotes" lookup /> : quotes && quotes.length < 1 ?
            <div className="flex justify-center items-center text-xl">No Record</div> :
            quotes?.length == 0 ?
              <div className="flex justify-center items-center text-xl">No Record Found</div> :
              quotes?.map((quote) => (
                <div
                  className="relative cursor-default rounded-md  bg-gray-50 px-6 py-8 hover:shadow"
                  key={quote?.id}
                >
                  <div className="flex items-center capitalize mb-2">
                    <span
                      className={classNames(
                        quote?.status === "CONVERTED" ? "pills-success"
                          : quote?.status === "PENDING"
                            ? "pills-secondary"
                            : quote?.status === "CANCELLED"
                              ? "pills-primary"
                              : "pills-error",
                        "pills"
                      )}
                    >
                      {quote?.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <div className="flex flex-auto flex-col space-y-1 text-sm font-bold">
                        <span
                          className="cursor-pointer text-primary hover:text-opacity-70 w-fit"
                        >
                          {`${quote?.quoteLabel} - ${quote?.quoteNo}`}
                        </span>
                        <span className="text-xs flex">
                          <span className="sub-header">Premium - {" "}</span>
                          <span className="flex">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(quote?.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(quote?.premium as number)}
                            </span>
                          </span>
                        </span>
                        <span className="text-xs">
                          <span className="sub-header">Description - {" "}</span>
                          {quote?.notes}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-4">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {quote?.productType}
                            </span>
                            <span className="sub-header">Product Type</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(quote?.startDate as string)}
                          </span>
                          <span className="sub-header">Start Date</span>
                        </div>
                        <div className="flex items-center font-normal text-gray-600">
                          <HiArrowNarrowRight />
                        </div>
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {quote?.refQuoteNo ? quote?.refQuoteNo : "-"}
                            </span>
                            <span className="sub-header">Reference #</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(quote?.endDate)}
                          </span>
                          <span className="sub-header">End Date</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-16">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex items-center text-gray-900">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(quote?.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(quote?.scheduledAmount as number)}
                            </span>
                          </div>
                          <span className="sub-header">Scheduled Amount</span>
                          <div className="flex flex-col text-sm ">
                            <span className="font-semibold text-sm">
                              {`${DateToStringFormatter(quote?.updatedAt.split("T")[0] as unknown as Date)} ${quote?.updatedAt.split("T")[1]?.split(".")[0] as string}`}
                            </span>
                            <span className="sub-header">Last updated</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex items-center text-gray-900">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(quote?.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(quote?.sumInsured as number)}
                            </span>
                          </div>
                          <span className="sub-header">Sum Insurred</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
        }
      </div>
      <>
        <NewQuoteModal
          newQuote={newQuote}
          handleNewQuote={handleNewQuote}
          productCategories={productCategories}
          carriers={carriers}
          branches={branches}
          currencies={currencies}
          setQuotes={setQuotes}
          quotes={quotes}
          refetchQuotes={refetchQuotes}
          clientId={clientId}
          sessionData={sessionData}
        />
      </>
    </>
  );
};

Quotes.getLayout = function (page: any) {
  return <InsureLayout>{page}</InsureLayout>;
};

export default Quotes;
