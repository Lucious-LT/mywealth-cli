import { ReactNode } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const SuccessDisplay = ({children}: {children: ReactNode}) => {
  return (
    <>
      <BsCheckCircleFill className="text-5xl font-bold text-success" />
      <span className="text-5xl font-bold">Success</span>
      {children}
    </>
  );
};
export default SuccessDisplay;
