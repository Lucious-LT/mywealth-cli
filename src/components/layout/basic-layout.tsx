import { ReactNode } from "react";
import Layout from ".";

export default function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="rounded-2xl bg-white p-5 dark:bg-black dark:bg-opacity-5 md:border-2 md:border-dashed md:border-gray-300 lg:p-20">
        <main>{children}</main>
      </div>
    </Layout>
  );
}