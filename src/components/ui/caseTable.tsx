import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { Ticket } from "~/server/api/models/crm";
import { api } from "~/utils/api";
import { capitalize, shortenText } from "~/utils/format";
import { LoadingSpinner } from "../util/spinner";

const TABS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Assigned",
    value: "ASSIGNED",
  },
  {
    label: "Resolved",
    value: "RESOLVED",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const TABLE_HEAD = ["Code", "Subject", "Description", "Status", "Priority", "Contact", "Date", ""];

export function CaseTable({ toggleModal }: { toggleModal: () => void }) {

  const { data: sessionData } = useSession()
  const { data: caseList, isLoading: loadingCases } = api.crm.getTicketForClient.useQuery({ clientId: sessionData?.user?.clientId! })
  const [filteredList, setFilteredList] = useState<Ticket[]>([])

  useEffect(() => {
    setFilteredList(caseList!)
  }, [caseList])

  const filterCases = (value: string) => {
    if (value == "ALL") return setFilteredList(caseList!)
    setFilteredList(caseList?.filter(caseValue => caseValue.status == value) ?? [])
  }

  return (
    <Card placeholder="" className="h-full w-full">
      <CardHeader placeholder="" floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography placeholder="" variant="h5" color="blue-gray">
              Case list
            </Typography>
            <Typography placeholder="" color="gray" className="mt-1 font-normal">
              See information about all cases
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button placeholder="" onClick={toggleModal} className="flex items-center bg-primary gap-3" size="md">
              <HiOutlineDocumentPlus strokeWidth={2} className="h-4 w-4" /> Add New Case
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="ALL" className="w-full md:w-max">
            <TabsHeader placeholder="">
              {TABS.map(({ label, value }) => (
                <Tab key={value} placeholder="" onClick={() => filterCases(value)} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              crossOrigin={"true"}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder="" className="px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadingCases ? <td className="" colSpan={7}><div className="flex justify-center items-center pt-5"><LoadingSpinner size='lg' /></div></td>
              : caseList?.length == 0 ? <tr className="text-2xl font-semibold w-full text-center"><td className="pt-2" colSpan={7}>You have no cases</td></tr> : filteredList?.map(
                ({ code, subject, description, status, priority, contactLabel, openDate }, index) => {
                  const isLast = index === filteredList?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={code}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {code}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {subject}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {shortenText(description!, 70)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={status == "NEW" ? "blue" : status == "ASSIGNED" ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {capitalize(priority)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {contactLabel}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {openDate.split("T")[0]}
                        </Typography>
                      </td>
                      {/* <td className={classes}> */}
                      {/*   <Tooltip content="Edit User"> */}
                      {/*     <IconButton placeholder="" variant="text"> */}
                      {/*       <PencilIcon className="h-4 w-4" /> */}
                      {/*     </IconButton> */}
                      {/*   </Tooltip> */}
                      {/* </td> */}
                    </tr>
                  );
                },
              )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter placeholder="" className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" placeholder="" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" disabled placeholder="" className="border-primary text-primary" size="sm">
            Previous
          </Button>
          <Button variant="outlined" disabled placeholder="" className="border-primary text-primary" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
