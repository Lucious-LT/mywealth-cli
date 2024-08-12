import { Fragment, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";



export function CustomSelect({
  state,
  newState,
  entity,
  inputLabel
}: {
  state:any;
  newState:any;
    entity: Array<object>;
  inputLabel:string
}) {
  // const [selected, setSelected] = useState(entity[0]);

  return (
    // <Listbox value={selected} onChange={setSelected}>
    //   <div className="relative mt-1">
    //     <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
    //       {/* <span className="block truncate">{selected.name}</span> */}
    //       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    //         <ChevronUpDownIcon
    //           className="h-5 w-5 text-gray-400"
    //           aria-hidden="true"
    //         />
    //       </span>
    //     </Listbox.Button>
    //     <Transition
    //       as={Fragment}
    //       leave="transition ease-in duration-100"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    //         {entity.map((item:any, itemIdx:number) => (
    //           <Listbox.Option
    //             key={itemIdx}
    //             className={({ active }) =>
    //               `relative cursor-default select-none py-2 pl-10 pr-4 ${
    //                 active ? "bg-amber-100 text-amber-900" : "text-gray-900"
    //               }`
    //             }
    //             value={item}
    //           >
    //             {({ selected }) => (
    //               <>
    //                 <span
    //                   className={`block truncate ${
    //                     selected ? "font-medium" : "font-normal"
    //                   }`}
    //                 >
    //                   {item.name}
    //                 </span>
    //                 {selected ? (
    //                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
    //                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                   </span>
    //                 ) : null}
    //               </>
    //             )}
    //           </Listbox.Option>
    //         ))}
    //       </Listbox.Options>
    //     </Transition>
    //   </div>
    // </Listbox>

    <div>
      <label className="text-sm font-bold text-primary">{inputLabel}</label>
      <Listbox value={state} onChange={newState}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-md border-1 border-gray-100 bg-white text-left sm:text-sm">
            <Listbox.Button className="w-full border-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:border-l-4 focus:border-primary">
              <span className="block truncate text-left">{state.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {entity.map((item:any, itemIdx:number) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          state ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export function CustomSearchSelect({ entity }: { entity: any }) {
  const [selected, setSelected] = useState(entity[0]);
  const [query, setQuery] = useState("");

  const filteredentity =
    query === ""
      ? entity
      : entity.filter((item: any) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    // <div className="]">
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(item: any) => item.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
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
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredentity.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredentity.map((item: any) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
    // </div>
  );
}


export function CustomSelect2() {
  // @ts-ignore
  return (
    <><div>
  <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
  <div className="relative mt-2">
    <button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      <span className="flex items-center">
        <span className="ml-3 block truncate">Tom Cook</span>
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    {/* <!--
      SelectOption popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
    {/* @ts-ignore */}
    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
      {/* <!--
        SelectOption option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
      --> */}
      <li className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
        <div className="flex items-center">
          {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
          <span className="font-normal ml-3 block truncate">Wade Cooper</span>
        </div>

        {/* <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        --> */}
        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </span>
      </li>

      {/* <!-- More items... --> */}
    </ul>
  </div>
</div></>
  )
}

export default function Data() {
  return (<></>);
}