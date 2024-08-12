import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
} from "@material-tailwind/react";
import { CiMobile1 } from "react-icons/ci";
import { CiDesktop } from "react-icons/ci";
import { HiOutlineDeviceTablet } from "react-icons/hi2";


export function WhereYouAreLogged({ data }: {
  data: {
    name: string
    device: "desktop" | "mobile" | "tab"
    location: string
    date: string
  }[]
}) {
  return (
    <Card placeholder="" className="w-full">
      <List placeholder="" className="border-[1px] rounded-md" >
        {data.map((device, index) => (
          <ListItem key={index} placeholder="" className={index != data.length - 1 ? "border-b-[1px]" : ""}>
            <ListItemPrefix placeholder="" >
              {device.device == "mobile" ? <CiMobile1 className="w-8 h-8" />
                : device.device == "desktop" ? <CiDesktop className="w-8 h-8" />
                  : <HiOutlineDeviceTablet className="w-8 h-8" />}
            </ListItemPrefix>
            <div>
              <Typography placeholder="" variant="h6" color="blue-gray">
                {device.name}
              </Typography>
              <Typography placeholder="" variant="small" color="gray" className="font-normal">
                {device.location}-{device.date}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
