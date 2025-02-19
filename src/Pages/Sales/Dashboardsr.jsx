import React from "react";
import { LuTrendingUp } from "react-icons/lu";
import DoughnutChart from "../../Components/SuperAdmin/DoughnutChart";
import LineChart from "../../Components/SuperAdmin/LineChart";
import { BsCalendar } from "react-icons/bs";
import chevronblue from "../../assets/img/chevronblue.png";

export default function Dashboardsr() {
  const cardsdata = [
    { title: "Revenue Generated", value: "$3,318", percent: "+6.08%" },
    {
      title: "Total Transactions Completed",
      value: "3,318",
      percent: "+6.08%",
    },
    { title: "Total Service Providers", value: "3,318", percent: "+6.08%" },
    { title: "Total Client", value: "3,318", percent: "+6.08%" },
    { title: "Total Services Listed", value: "3,318", percent: "+6.08%" },
  ];

  const chartData = {
    labels: ["Number of Deals", "Number of Providers", "Number of Customers"],
    datasets: [
      {
        label: "# of Votes",
        data: [550, 400, 1500],
        backgroundColor: ["#0F91D2B2", "#FB8603B2", "#43B442B2"],
        borderWidth: 1,
      },
    ],
  };

  const linelabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const linechartData = {
    labels: linelabels,
    datasets: [
      {
        label: "This Month",
        data: [50, 200, 200, 300, 260, 200, 340, 380, 420, 300, 250, 200],
        borderColor: "#0F91D2",
        pointRadius: 0,
        tension: 0.6,
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {cardsdata.map((card, index) => (
          <div
            key={index}
            className="p-3 bg-[#E6F1FD] flex flex-col justify-between rounded-[16px]"
          >
            <p className="text-sm">{card.title}</p>
            <div className="flex justify-between gap-1 mt-2 flex-wrap">
              <p className="font-semibold text-2xl">{card.value}</p>
              <div className="flex gap-1 items-center ms-auto">
                <p className="text-xs">{card.percent}</p>
                <LuTrendingUp className="text-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        <div className="border p-3 rounded-[24px] border-[#0000001A] bg-[#F9F9FA]">
          <p className="font-semibold text-sm">Active Users</p>
          <div className="mt-4">
            <DoughnutChart chartData={chartData} />
          </div>
        </div>
        <div className="border p-3 rounded-[24px] border-[#0000001A] lg:col-span-2 bg-[#F9F9FA] flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div>
              <p className="font-semibold text-sm text-[#535862]">
                Top Performing Service Providers
              </p>
            </div>
            <div className="ms-auto">
              <button className="bg-[#EFEFF0] flex items-center gap-1 text-xs font-semibold p-2 rounded-[8px]">
                View All
              </button>
            </div>
          </div>
          <div className="mt-4 h-full w-[99%]">
            <LineChart chartData={linechartData} />
          </div>
        </div>
      </div>
      <div className="border p-3 rounded-[24px] border-[#0000001A] bg-[#F9F9FA] mt-5">
        <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[#45464E] font-medium">Revenue Growth</p>
          </div>
          <div className="ms-auto">
            <select
              style={{
                backgroundImage: `url(${chevronblue})`,
                backgroundPosition: "calc(100% - 10px)",
                backgroundSize: "10px",
              }}
              className="pe-7 text-sm bg-no-repeat appearance-none py-1 px-5 outline-none rounded-[8px] bg-[#0000000A] text-[#0F91D2]"
              name=""
              id=""
            >
              <option className="bg-white text-black" value="">
                Yearly
              </option>
              <option className="bg-white text-black" value="">
                Last 30 days
              </option>
              <option className="bg-white text-black" value="">
                Last 7 days
              </option>
            </select>
          </div>
        </div>
        <div className="mt-5 h-[300px] w-[99%]">
          <LineChart chartData={linechartData} />
        </div>
      </div>
    </div>
  );
}
