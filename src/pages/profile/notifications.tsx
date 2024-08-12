import { Typography } from "@material-tailwind/react";
import { notificationStats } from "~/components/data/notification-data";
import ProfileLayout from "~/components/layout/page/account-setting-layout";
import NotificationMedia from "~/components/ui/notification-media";


const Notifications = () => {
  return <>
    <div><Typography variant="h3" className="my-3" color="gray" placeholder="">
      General Notifications
      <Typography variant="small" className="mb-6 mt-0" color="gray" placeholder="">
        Select how you will be notified when the following changes occur.
      </Typography>
    </Typography>
    </div>
    <div>
      {notificationStats.map(stat => (
        <div className="flex py-8 pr-8 border-b-[1px] w-full justify-between items-center">
          <Typography variant="h6" color="gray" placeholder="">
            {stat.name}
          </Typography>
          <NotificationMedia />
        </div>
      ))}
    </div>
  </>
};

Notifications.getLayout = function(page: any) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
export default Notifications;
