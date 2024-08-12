import InsureLayout from "~/components/layout/page/insure-layout";

const Stats = () => {
  return <div>Stats</div>;
};

Stats.getLayout = function(page: any) {
  return <InsureLayout>{page}</InsureLayout>;
};

export default Stats;
