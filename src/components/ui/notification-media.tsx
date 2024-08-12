import { notificationMedia } from "../data/notification-data";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { HiOutlineDeviceMobile } from "react-icons/hi";

const NotificationMedia = () => {
  return (
    <>
      <ul className="flex divide-x-2 border-2 font-semibold rounded-md">
        {notificationMedia.map((media) => (
          <li className="py-2 px-4 cursor-pointer flex justify-center items-center hover:bg-gray-100">
            {media.name == "Email" ? <MdOutlineEmail /> : media.name == "Browser" ? <TbWorldWww /> : <HiOutlineDeviceMobile />}
            <span className="ml-1">{media.name}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default NotificationMedia;
