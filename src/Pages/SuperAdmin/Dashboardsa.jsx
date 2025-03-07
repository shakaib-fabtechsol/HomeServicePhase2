import React, { useEffect, useState } from "react";
import { LuTrendingUp } from "react-icons/lu";
import DoughnutChart from "../../Components/SuperAdmin/DoughnutChart";
import LineChart from "../../Components/SuperAdmin/LineChart";
import { BsCalendar } from "react-icons/bs";
import chevronblue from "../../assets/img/chevronblue.png";
import DoubleBarChart from "../../Components/SuperAdmin/DoubleBarChart";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { useGetSuperDashboardQuery } from "../../services/dashboard";
import Loader from "../../Components/MUI/Loader";
import RemoteError from "../../Components/Common/RemoteError";

export default function Dashboardsa() {
  const [inputselect, setInputSelect] = useState("sales");
  const [selectduration, setSelectDuration] = useState("week");
  const { data, isLoading: loading, isError, error } = useGetSuperDashboardQuery()
  useEffect(() => {
    document.title = "Home";
  }, []);

  console.log(data, "this is data for dashboard")

  const cardsdata = [
    { title: "Revenue Generated", value: data?.total_revenue_generated || 0, },
    {
      title: "Total Transactions Completed",
      value: data?.total_transactions || 0,

    },
    { title: "Total Service Providers", value: data?.total_service_providers, },
    { title: "Total Client", value: data?.total_customers, },
    { title: "Total Services Listed", value: data?.total_service_listed || 0, },
  ];

  const chartData = {
    labels: ["Number of Sales", "Number of Providers", "Number of Customers"],
    datasets: [
      {
        label: "Total",
        data: [data?.total_active_sales, data?.total_service_providers, data?.total_customers],
        backgroundColor: ["#0F91D2B2", "#FB8603B2", "#43B442B2"],
        borderWidth: 1,
      },
    ],
  };

  const linelabels = [];
  for (let i = 1; i <= 30; i++) {
    linelabels.push(i);
  }



  const getLastMonthLabels = () => {
    const labels = [];
    const today = new Date();
    const currentMonth = today.getMonth(); // Get current month
    const year = today.getFullYear();

    // Get month name abbreviation
    const monthName = new Date(year, currentMonth).toLocaleString("en-US", { month: "short" });

    // Get total days in the current month
    const lastDay = new Date(year, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      labels.push(` ${day}`);
    }

    return labels;
  };

  // const barlabel = getLastMonthLabels();

  const linechartData = {
    labels: getLastMonthLabels(),
    datasets: [
      {
        label: "This Month",
        data: data?.currentMonthActiveUser || [],
        borderColor: "#0F91D2",
        pointRadius: 0,
        tension: 0.1,
      },
      {
        label: "Previous month",
        data: data?.previousMonthActiveUser || [],
        borderColor: "#7AC979",
        pointRadius: 0,
        tension: 0,
      },
    ],
  };




  const barlabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weekly = {
    customer: {
      baralues: data?.addCurrentWeeklyCustomer || []
    },
    sales: {
      baralues: data?.addCurrentWeeklySales
    },
    provider: {
      baralues: data?.addCurrentWeeklyProvider
    }
  }
  const month = {
    customer: {
      baralues: data?.monthlyClient || []
    },
    sales: {
      baralues: data?.monthlySales
    },
    provider: {
      baralues: data?.monthlyProviders
    }
  }

  if (isError)
    return <RemoteError hasError={isError} message={error?.message} />;


  if (loading)
    return <Loader />
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-3xl">Dashboard</h2>
        </div>
        <div className="flex items-center p-2 border rounded-lg w-full sm:max-w-[320px]">
          <label>
            <CiSearch className="text-[#717680] text-xl" />
          </label>
          <input type="search" placeholder="Search" className="w-full px-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mt-8 xl:grid-cols-5 gap-6">
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
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-[#535862]">
                Total Active Users
              </p>
              <p className="text-xs font-semibold text-[#0F91D2]">+2.45%</p>
            </div>
            <div className="flex items-center flex-wrap-reverse gap-2 ms-auto">
              <div className="flex items-center gap-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-full bg-[#0F91D2]"></div>
                  <p className="text-xs text-[#535862]">This month</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-full bg-[#7AC979]"></div>
                  <p className="text-xs text-[#535862]">Previous month</p>
                </div>
              </div>
              <button className="bg-[#EFEFF0] flex items-center gap-1 text-xs font-semibold p-2 rounded-[8px] ms-auto">
                <BsCalendar className="text-sm" />
                <span>This Month</span>
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
            <p className="text-[#45464E] font-medium">Summary</p>
            <div>
              <select
                style={{
                  backgroundImage: `url(${chevronblue})`,
                  backgroundPosition: "calc(100% - 10px)",
                  backgroundSize: "10px",
                }}
                onChange={(e) => {
                  setInputSelect(e.target.value)
                }}
                className="pe-7 text-sm bg-no-repeat appearance-none py-1 px-5 outline-none rounded-[8px] bg-[#5570F114] text-[#0F91D2]"
                name=""
                id=""
                value={inputselect}
              >
                <option className="bg-white text-black" value="sales">
                  Sales
                </option>
                <option className="bg-white text-black" value="provider">
                  Providers
                </option>
                <option className="bg-white text-black" value="customer">
                  Client
                </option>
              </select>
            </div>
          </div>
          <div className="ms-auto">
            <select
              style={{
                backgroundImage: `url(${chevronblue})`,
                backgroundPosition: "calc(100% - 10px)",
                backgroundSize: "10px",
              }}
              onChange={(e) => {
                setSelectDuration(e.target.value)
              }}
              className="pe-7 text-sm bg-no-repeat appearance-none py-1 px-5 outline-none rounded-[8px] bg-[#5570F114] text-[#0F91D2]"
              name=""
              id=""
            >
              <option className="bg-white text-black" value="week">
                weekly
              </option>
              <option className="bg-white text-black" value="month">
                Monthly
              </option>
            </select>
          </div>
        </div>
        <div className="w-full overflow-x-auto mt-5">
          <DoubleBarChart labels={selectduration === "week" ? barlabels : getLastMonthLabels()} Values={selectduration === "week" ? weekly[inputselect]?.baralues || [] : month[inputselect]?.baralues || []} />
        </div>
      </div>
    </div>
  );
}

