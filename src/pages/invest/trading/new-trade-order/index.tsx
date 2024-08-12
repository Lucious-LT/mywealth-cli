import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Dialog as MDialog,
  DialogBody,
  DialogHeader,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Combobox, Transition } from "@headlessui/react";
import { Equity, Fund, Market } from "~/server/api/models/position";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import { InvestmentAccount } from "~/server/api/models/investing";
import EquityOrderTab from "~/components/new-trade-order/equity-order";
import MutualFundOrder from "~/components/new-trade-order/mutual-fund-order";
import BondOrder from "~/components/new-trade-order/bond-order";

export default function NewTradeOrder({
  open,
  setOpen,
  account,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  account: InvestmentAccount;
}) {
  const { data: markets } = api.position.getMarketList.useQuery();
  let market: Market[] | null = null;

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(
    market ? market[0] : null
  );
  const [marketQuery, setMarketQuery] = useState("");

  const {
    data: equity,
  } = api.position.listEquityByMarketCode.useQuery(
    selectedMarket?.marketCode!,
    { enabled: selectedMarket != null }
  );
  let equityList: Equity[] | null = null;

  if (markets) {
    market = markets.content!;
  }

  if (equity) {
    equityList = equity.content!;
  }

  const filteredMarket =
    marketQuery === ""
      ? market
      : market?.filter((market) =>
        market.marketCode
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(marketQuery.toLowerCase().replace(/\s+/g, ""))
      );

  const { data: funds } =
    api.position.getFundList.useQuery();
  let fundList: Fund[] | null = null;

  if (funds) {
    const content = funds.content!;
    fundList = content;
  }

  useEffect(() => {
    if (market && market[0]) {
      setSelectedMarket(market[0]);
    }
  }, [market]);

  return (
    <>
      <MDialog
        placeholder={""}
        open={open}
        size={"xxl"}
        handler={() => setOpen(!open)}
        className="min-w-screen max-w-screen z-0 m-0 w-screen bg-gray-100"
      >
        <DialogHeader className="relative font-nun" placeholder={""}>
          <span>Place an order</span>
          <button
            className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
            onClick={() => setOpen(false)}
          >
            x
          </button>
        </DialogHeader>

        <DialogBody className="bg-inherit p-4 font-nun" placeholder={""}>
          <div className=" w-1/2">
            <label className="text-xs text-gray-700">Select Market</label>
            <div className="flex items-center gap-4 ">
              <div>
                <Combobox value={selectedMarket} onChange={setSelectedMarket}>
                  <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-md border-1 border-blue-gray-300 bg-white text-left sm:text-xs">
                      <Combobox.Input
                        className="w-full border-0 py-2 pl-3 pr-10 text-xs leading-5 text-gray-900 focus:border-l-4 focus:border-primary"
                        displayValue={(market: Market) =>
                          market?.marketCode ?? ""
                        }
                        onChange={(e) => setMarketQuery(e.target.value)}
                      />
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
                      afterLeave={() => setMarketQuery("")}
                    >
                      <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                        {filteredMarket?.length === 0 && marketQuery !== "" ? (
                          <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredMarket?.map((market) => (
                            <Combobox.Option
                              key={market.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-2 pr-4 ${active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900"
                                }`
                              }
                              value={market}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`flex justify-between truncate uppercase ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    <span className="font-extrabold text-gray-900">
                                      {market.marketCode}
                                    </span>
                                    {/* <span className=" text-gray-500">
                                      {market.description}
                                    </span> */}
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
              </div>
              <div className="">
                <span className="text-xl font-bold uppercase">
                  {`${selectedMarket?.marketCode ?? ""} - ${selectedMarket?.description ?? ""
                    }`}
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs">
            <Tabs value="equity" id={"Equity"}>
              <TabsHeader className="bg-transparent py-4" placeholder={""}>
                <Tab value="equity" className="py-3 text-xs" placeholder={""}>
                  Equity
                </Tab>
                <Tab value="mutual-funds" className="py-3 text-xs" placeholder={""}>
                  Mutual Funds
                </Tab>
                <Tab value="bonds" className="py-3 text-xs" placeholder={""}>
                  Bonds
                </Tab>
              </TabsHeader>
              <TabsBody placeholder={""}>
                <EquityOrderTab
                  selectedMarket={selectedMarket}
                  account={account}
                />
                <MutualFundOrder
                  selectedMarket={selectedMarket}
                  account={account}
                />
                <BondOrder selectedMarket={selectedMarket} account={account} />
              </TabsBody>
            </Tabs>
          </div>
        </DialogBody>
      </MDialog>
    </>
  );
}
