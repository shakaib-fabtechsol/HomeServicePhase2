import * as React from 'react';
import { useEffect, useState } from "react";
import { LuTrendingUp } from "react-icons/lu";
import DoughnutChart from "../../Components/SuperAdmin/DoughnutChart";
import LineChart from "../../Components/SuperAdmin/LineChart";
import chevron from "../../assets/img/chevronDown.png";
import TableBlue from "../../Components/TableBlue";
import userimg from "../../assets/img/client1.png";

export default function Dashboardsr() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const cardsdata = [
    { title: "Total Revenue By Pro", value: "$3,318", percent: "+6.08%" },
    {
      title: "Total Commissions",
      value: "3,318",
      percent: "+6.08%",
    },
    { title: "Assigned Pros", value: "4,070", percent: "+6.08%" },
    { title: "New Pros", value: "300", percent: "+6.08%" },
    { title: "Recently Published Deals", value: "200", percent: "+6.08%" },
  ];

  const chartData = {
    labels: ["Cleaning", "Home Repair", "Electrical", "Plumbing"],
    datasets: [
      {
        label: "Revenue",
        data: [550, 400, 1500, 1500],
        backgroundColor: ["#0F91D2B2", "#43B442B2", "#FB8603B2", "#535862"],
        borderWidth: 1,
      },
    ],
  };

  const serviceHeader = [
    <p className="text-sm font-medium text-wrap">Name</p>,
    <p className="text-sm font-medium text-wrap">Email</p>,
    <p className="text-sm font-medium text-wrap">Phone</p>,
    <p className="text-sm font-medium text-wrap">Services Provided</p>,
    <p className="text-sm font-medium text-wrap">Revenue($)</p>,
    <p className="text-sm font-medium text-wrap">Rating</p>,
  ];

  const servicedata = [
    {
      img: userimg,
      name: "Myra Baker",
      email: "robin_mckinney@icloud.com",
      phone: "+8069452674047",
      services: "07",
      revenue: 20000,
      rating: "4.9",
    },
    {
      img: userimg,
      name: "Leland Huang",
      email: "willie_wheeler@yahoo.com",
      phone: "+8069452674047",
      services: "09",
      revenue: 10000,
      rating: "4.8",
    },
    {
      img: userimg,
      name: "Douglas Ford",
      email: "melody_castillo@icloud.com",
      phone: "+8069452674047",
      services: "10",
      revenue: 30000,
      rating: "4.7",
    },
  ];

  const serviceRows = servicedata.map((row) => [
    <div className="flex items-center gap-2">
      <img
        className="size-8 max-w-8 rounded-full object-cover"
        src={row.img}
        alt="img"
      />
      <p className="font-normal text-sm">{row.name}</p>
    </div>,
    <p className="font-normal text-sm">{row.email}</p>,
    <p className="font-normal text-sm">{row.phone}</p>,
    <p className="font-normal text-sm">{row.services}</p>,
    <p className="font-normal text-sm">{row.revenue}</p>,
    <p className="font-normal text-sm">{row.rating}</p>,
  ]);

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
          <p className="font-semibold text-sm">
            Revenue Breakdown by Top Service Category
          </p>
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
              <button className="border border-[#0F91D2] flex items-center gap-1 text-xs font-semibold p-2 rounded-[8px] text-[#0F91D2]">
                View All
              </button>
            </div>
          </div>
          <div className="mt-4">
            <TableBlue headers={serviceHeader} rows={serviceRows} />
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
                backgroundImage: `url(${chevron})`,
                backgroundPosition: "calc(100% - 10px)",
                backgroundSize: "10px",
              }}
              className="pe-7 text-sm bg-no-repeat appearance-none py-1 px-5 outline-none rounded-[8px] bg-[#0000000A] text-black"
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
