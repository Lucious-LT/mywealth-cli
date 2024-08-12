import { type ApexOptions } from "apexcharts";
import { type Props } from "react-apexcharts";
import CardHeader from "~/components/layout/card-header";
import FixedDepositInvestments from "./fixed-deposit";
import DiscountedInstrumentInvestments from "./tbills";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MonthGain: React.FC<Props> = ({ }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: true
      }
    },

    stroke: {
      curve: "straight",
      width: 3
    },
    fill: {
      opacity: 0.1
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      min: 0
    },
    xaxis: {
      categories: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th"
      ]
    },
    colors: ["#60A5FA"],
    tooltip: {
      y: {
        formatter: function(val: number) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          return "$ " + val + " thousands";
        }
      }
    }
  };

  const series = [
    {
      name: "NAC",
      data: [73, 22, 43, 12, 33, 44, 32, 42, 53, 62],
    },
  ];
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={80}
      cl
    />
  );
};

const FixedIncome = () => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="mb-8">
          <CardHeader title="investment summary" />
        </div>

        <div className="custom-card grid grid-cols-3 gap-4">
          <div className="flex flex-auto flex-col">
            <div className="header">Total Invested</div>
            <div className="mt-3 flex items-end space-x-4">
              <div className="flex flex-col ">
                <div className="mb-1 text-2xl font-semibold leading-tight tracking-tight">
                  $17,663.00
                </div>
                <div className="sub-header">
                  <span>Available</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="font-meduim text-lg leading-tight tracking-tight text-gray-600">
                  +
                </span>
                <div className="flex flex-col">
                  <div className="font-meduim mb-1 text-lg leading-tight tracking-tight">
                    1,063.00
                  </div>
                  <div className="sub-header">
                    <span>Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-auto flex-col ">
            <div className="header">This Month</div>
            <div className="mt-3 flex items-end space-x-4">
              <div className="flex flex-col ">
                <div className="mb-1 text-2xl font-semibold leading-tight tracking-tight">
                  $17,663.00
                </div>
                <div className="sub-header">
                  <span>Total Profit</span>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="font-meduim text-lg leading-tight tracking-tight text-gray-600">
                  +
                </span>
                <div className="flex flex-col">
                  <div className="font-meduim mb-1 text-lg leading-tight tracking-tight">
                    1,063.00
                  </div>
                  <div className="sub-header">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span>Today's Profit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-auto flex-col ">
            <MonthGain />
          </div>
        </div>
        {/* -------------FIXED DEPOSITS------------- */}
        <div className="my-8">
          <FixedDepositInvestments />
        </div>
        {/* -------------TBILLS------------- */}
        <div className="my-8">
          <DiscountedInstrumentInvestments />
        </div>
      </div>
    </>
  );
};

// export function NewFixedDepositDialog() {}

export default FixedIncome;
