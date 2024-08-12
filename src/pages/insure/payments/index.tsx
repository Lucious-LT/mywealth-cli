import InsureLayout from "~/components/layout/page/insure-layout";

const Payments = () => {
  return <div>Payments</div>;
};

Payments.getLayout = function(page: any) {
  return <InsureLayout>{page}</InsureLayout>;
};

export default Payments;
