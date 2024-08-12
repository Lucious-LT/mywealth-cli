import { ReactNode } from "react";

const TBody = ({ children }: { children:ReactNode }) => {
  return <tbody className="table-body">{children}</tbody>;
};
export default TBody;
