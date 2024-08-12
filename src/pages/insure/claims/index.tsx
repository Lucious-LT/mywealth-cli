import { useEffect, useState } from "react";
import CardHeader from "~/components/layout/card-header";
import { CurrencyFormatter } from "~/components/util/currency-formatter";
import { DateToStringFormatter } from "~/components/util/date-formatter";
import InsureLayout from "~/components/layout/page/insure-layout";
import { NumberFormatter } from "~/components/util/number-formatter";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "~/components/util/spinner";
import { Claim, Policy as PolicyAccount } from "~/server/api/models/insurance";
import { CurrencyCode } from "~/server/api/models/accounting";
import { HiArrowNarrowRight, HiPlus } from "react-icons/hi";
import { Menu } from "@headlessui/react";
import { BsSliders2 } from "react-icons/bs";
import { motion } from "framer-motion";
import classNames from "classnames";
import NewClaimModal from "~/components/modals/new-claim-modal";

const Claims = () => {
  const { data: sessionData } = useSession();
  const clientId = sessionData?.user.clientId ?? "";

  // fetch currencies
  const { data: currenciesData, isLoading: loadingCurrencies } =
    api.insurance.getCurrencies.useQuery();

  const currencies: CurrencyCode[] = currenciesData ?? [];

  // fetch policies
  const { data: policiesData, isLoading: loadingPolicies } =
    api.insurance.getPoliciesForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  const policies: PolicyAccount[] = policiesData ?? [];

  // fetch cliams
  const { data: claimsData, isLoading: loadingClaimsData, refetch: refetchClaims } =
    api.insurance.getClaimsForClient.useQuery(clientId, {
      staleTime: 1000 * 60 * 5,
    });

  const [claims, setClaims] = useState<Claim[]>(claimsData ?? []);

  useEffect(() => {
    if (claimsData) {
      setClaims(claimsData);
    }
  }, [claimsData]);

  // Handle New Claim modal
  const [newClaim, setNewClaim] = useState(false);
  const handleNewClaim = () => {
    setNewClaim(!newClaim);
  }

  return (
    <>
      <div className="mb-8 relative">
        <div className="flex items-center ">
          <CardHeader title="My Claims" />
          <button className="primary-btn" onClick={handleNewClaim}>
            <HiPlus /> <span className="ml-2">New Claim</span>
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
      <div className={`${loadingPolicies && `items-center`} flex flex-col space-y-4 overflow-hidden`}>
        {loadingPolicies ?
          <LoadingSpinner size="lg" label="Loading Claims" lookup /> : claims && claims.length < 1 ?
            <div className="flex justify-center items-center text-xl">No Record</div> :
            claims?.length == 0 ?
              <div className="flex justify-center items-center text-xl">No Record Found</div> :
              claims?.map((claim) => (
                <div
                  className="relative cursor-default rounded-md  bg-gray-50 px-6 py-8 hover:shadow"
                  key={claim.id}
                >
                  <div className="flex items-center capitalize mb-2">
                    <span
                      className={classNames(
                        claim.status === "PAID" ? "pills-success"
                          : claim.status === "PENDING"
                            ? "pills-secondary"
                            : claim.status === "APPROVED"
                              ? "pills-primary"
                              : "pills-error",
                        "pills"
                      )}
                    >
                      {claim.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <div className="flex flex-auto flex-col space-y-1 text-sm font-bold">
                        <span
                          className="cursor-pointer text-primary hover:text-opacity-70 w-fit"
                        >
                          {`${claim.claimLabel} - ${claim.claimNo}`}
                        </span>
                        <span className="text-xs">
                          <span className="sub-header">Policy # - {" "}</span>
                          {claim.policyNo}
                        </span>
                        <span className="text-xs">
                          <span className="sub-header">Description - {" "}</span>
                          {claim.notes}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-4">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {claim.productType}
                            </span>
                            <span className="sub-header">Product Type</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(claim.dateProcessed as string)}
                          </span>
                          <span className="sub-header">Processed Date</span>
                        </div>
                        <div className="flex items-center font-normal text-gray-600">
                          <HiArrowNarrowRight />
                        </div>
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex flex-col space-y-1 text-sm ">
                            <span className="font-semibold">
                              {claim.refClaimNo ? claim.refClaimNo : "-"}
                            </span>
                            <span className="sub-header">Reference #</span>
                          </div>
                          <span className="font-semibold">
                            {DateToStringFormatter(claim.claimDate)}
                          </span>
                          <span className="sub-header">Claim Date</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex justify-start space-x-16">
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex items-center text-gray-900">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(claim.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(claim.claimAmount as number)}
                            </span>
                          </div>
                          <span className="sub-header">Claim Amount</span>
                          <div className="flex flex-col text-sm ">
                            <span className="font-semibold text-sm">
                              {`${DateToStringFormatter(claim.updatedAt.split("T")[0] as unknown as Date)} ${claim.updatedAt.split("T")[1]?.split(".")[0] as string}`}
                            </span>
                            <span className="sub-header">Last updated</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 text-sm ">
                          <div className="flex items-center text-gray-900">
                            <span className="text-base font-extrabold">
                              {CurrencyFormatter(claim.currency)}
                            </span>
                            <span className="font-semibold">
                              {NumberFormatter(claim.approvedAmount as number)}
                            </span>
                          </div>
                          <span className="sub-header">Approved Amount</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
        }
      </div>
      <>
        <NewClaimModal
          newClaim={newClaim}
          handleNewClaim={handleNewClaim}
          policies={policies}
          currencies={currencies}
          setClaims={setClaims}
          claims={claims}
          refetchClaims={refetchClaims}
        />
      </>
    </>
  );
};

Claims.getLayout = function (page: any) {
  return <InsureLayout>{page}</InsureLayout>;
};

export default Claims;
