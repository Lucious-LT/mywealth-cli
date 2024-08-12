import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { handler, size } from "@material-tailwind/react/types/components/dialog";
import classNames from "classnames";
import { ReactNode, SetStateAction } from "react";

const Modal = ({
  open,
  size,
  handler,
  reset,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  size?: size;
  handler: handler;
  reset?: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) => {
  return (
    <>
      <Dialog
        open={open}
        size={size}
        handler={handler}
        placeholder="Dialog"
        // className={classNames(
        //   size == "xxl"
        //     ? "min-w-screen max-w-screen m-0 h-full max-h-screen min-h-screen w-screen"
        //     : "",
        //   "bg-gray-100"
        // )}
        className="bg-gray-100"
      >
        <DialogHeader
          // className={classNames(
          //   size == "xxl" ? "h-full p-4" : "relative",
          //   "font-nun"
          // )}
          className="font-nun"
          placeholder="Dialog Header"
        >
          <div className="flex flex-col">
            <span className=" font-bold">{title}</span>
            <span className="text-sm text-gray-600">{subtitle}</span>
          </div>

          <button
            className="btn btn-circle btn-sm absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
            onClick={reset == undefined ? handler : reset}
          >
            x
          </button>
        </DialogHeader>
        <DialogBody className="h-full p-8 font-nun"
          placeholder="Dialog body">{children}</DialogBody>
      </Dialog>
    </>
  );
};
export default Modal;
