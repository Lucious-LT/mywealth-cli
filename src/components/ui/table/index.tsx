import { ReactNode } from "react";

const Table = ({ children }: { children : ReactNode}) => {
  return (
    <section className=" hidden  text-gray-600 antialiased transition-all duration-500 ease-in-out md:block">
      <table className="table-main">{children}</table>
    </section>
  );
};
export default Table;
