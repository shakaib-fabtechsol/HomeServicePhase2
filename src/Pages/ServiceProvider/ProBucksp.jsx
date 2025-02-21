import React, { useEffect, useState } from "react";
import ProBucksChart from "../../Components/Provider/ProBucksChart";
import TabComponent from "../../Components/TabComponent";
import TransHistory from "../../Components/Provider/ProBucks/TransHistory";
import ReferralHistory from "../../Components/Provider/ProBucks/ReferralHistory";

export default function ProBucksp() {
  useEffect(() => {
    document.title = "ProBucks";
  }, []);
  const tabData = [
    { label: "Transaction History", content: <TransHistory /> },
    { label: "Referral History ", content: <ReferralHistory /> },
  ];

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartdata = {
    labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: [500, 700, 900, 600, 600, 750, 650, 700, 950, 650, 650, 750],
        backgroundColor: (context) => {
          const value = context.raw;
          return value > 800 ? "#0F91D2" : "#0F91D22E";
        },
        barThickness: 40,
      },
    ],
  };
  return (
    <div>
      <div className="p-3 border border-[#00000012] bg-[#00000003] rounded-[25px]">
        <div className="flex justify-center">
          <p className="text-xl font-semibold p-2 bg-[#00000008] w-full max-w-[250px] text-center rounded-[12px]">
            Pro Bucks Balance
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <p className="font-semibold text-center text-4xl">$ 1,600</p>
        </div>
        <div className="overflow-x-auto mt-6 pb-2">
          <div className="min-w-[600px] max-w-[1150px] mx-auto">
            <ProBucksChart data={chartdata} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <TabComponent tabs={tabData} />
      </div>
    </div>
  );
}
