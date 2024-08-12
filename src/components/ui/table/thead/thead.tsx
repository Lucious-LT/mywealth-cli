import { ReactNode } from "react";

const THead = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <thead>
        <tr className="table-header">{children}</tr>
      </thead>
    </>
  );
};
export default THead;
