import { ReactNode } from "react";

const TBodyRow = ({ children }: { children:ReactNode }) => {
  return <tr className="table-row">{children}</tr>;
};
export default TBodyRow;
