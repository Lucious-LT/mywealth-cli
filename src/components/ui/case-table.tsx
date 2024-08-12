import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { capitalize } from "~/utils/format";

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
];

const TABLE_HEAD = ["Code", "Subject", "Status", "Priority", "Contact", "Date", ""];

const TABLE_ROWS = [
  {
    contact: "John Michael",
    priority: "critical",
    code: "0000000198",
    subject: "Fix list returns",
    status: "NEW",
    date: "23/04/18",
  },
  {
    contact: "Alexa Liras",
    priority: "low",
    code: "0000020721",
    subject: "Fix list returns",
    status: "ASSIGNED",
    date: "23/04/18",
  },
  {
    contact: "Laurent Perrier",
    priority: "medium",
    code: "0000004302",
    subject: "Fix list returns",
    status: "ASSIGNED",
    date: "19/09/17",
  },
  {
    contact: "Michael Levi",
    priority: "critical",
    code: "00000023012",
    subject: "Fix list returns",
    status: "RESOLVED",
    date: "24/12/08",
  },
  {
    contact: "Richard Gran",
    priority: "low",
    code: "0000000087",
    subject: "Fix list returns",
    status: "NEW",
    date: "04/10/21",
  },
];

export function CaseTable({ toggleModal }: { toggleModal: () => void }) {
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
            <Button placeholder="" variant="outlined" size="sm">
              view all
            </Button>
            <Button placeholder="" onClick={toggleModal} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New Case
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader placeholder="">
              {TABS.map(({ label, value }) => (
                <Tab key={value} placeholder="" value={value}>
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
      <CardBody placeholder="" className="overflow-scroll px-0">
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
            {TABLE_ROWS.map(
              ({ code, subject, status, priority, contact, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
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
                          {/* <Typography */}
                          {/*   placeholder="" */}
                          {/*   variant="small" */}
                          {/*   color="blue-gray" */}
                          {/*   className="font-normal opacity-70" */}
                          {/* > */}
                          {/*   {} */}
                          {/* </Typography> */}
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
                        {/* <Typography */}
                        {/*   placeholder="" */}
                        {/*   variant="small" */}
                        {/*   color="blue-gray" */}
                        {/*   className="font-normal opacity-70" */}
                        {/* > */}
                        {/*   {org} */}
                        {/* </Typography> */}
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
                        {contact}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton placeholder="" variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter placeholder="" className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" placeholder="" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" placeholder="" size="sm">
            Previous
          </Button>
          <Button variant="outlined" placeholder="" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
