import React from "react";
import { LuTrendingUp } from "react-icons/lu";
import DoughnutChart from "../../Components/SuperAdmin/DoughnutChart";
import LineChart from "../../Components/SuperAdmin/LineChart";
import chevron from "../../assets/img/chevronDown.png";
import Table from "../../Components/Table";
import ServiceDet from "../../assets/img/service-det.png";
import provider from "../../assets/img/client1.png";
import { Link } from "react-router-dom";

export default function Dashboardsr() {
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

  const tableHeader = [
    "Service",
    "Service Provider",
    "Category",
    "Published Date",
  ];

  const orders = [
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "Ricky Smith",
      prologo: provider,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$200",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
    {
      serviceimg: ServiceDet,
      serviceName: "Service Name",
      proname: "Frances Swann",
      prologo: provider,
      description: "Praesent tincidunt consectetur justo, at fermentum metus.",
      price: "$150",
      Category: "Residential",
      date: "Dec 21, 2024",
    },
  ];

  const tablerows = orders.map((order) => [
    <div className="flex items-center gap-2">
      <img
        src={order.serviceimg}
        alt=""
        className="w-[90px] max-w-[90px] h-[70px] rounded-lg object-cover"
      />
      <div>
        <p className="text-nowrap text-sm text-[#181D27]">
          {order.serviceName}
        </p>
        <p className="text-xs text-wrap text-[#535862] line-clamp-2 w-[200px]">
          {order.description}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[10px] text-[#535862]">Starting Price:</p>
          <p className="font-extrabold text-lg text-[#181D27]">{order.price}</p>
        </div>
      </div>
    </div>,
    <div className="flex items-center gap-2">
      <img
        className="size-9 max-w-9 object-cover rounded-full"
        src={order.prologo}
        alt="img"
      />
      <p>{order.proname}</p>
    </div>,
    <p className="text-[#181D27] text-sm">{order.Category}</p>,
    <p className="text-[#181D27] text-sm">{order.date}</p>,
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
        pointRadius: 5,
        backgroundColor: "#000000",
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
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div>
              <p className="font-semibold text-sm text-[#000000]">
                Recently published deals
              </p>
            </div>
            <div className="ms-auto">
              <Link to="/sales/recentdeals" className="border border-[#0F91D2] flex items-center gap-1 text-xs font-semibold p-2 rounded-[8px] text-[#0F91D2]">
                View All
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <Table headers={tableHeader} rows={tablerows} />
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
