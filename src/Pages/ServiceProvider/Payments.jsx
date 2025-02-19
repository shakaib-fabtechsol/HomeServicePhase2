import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import client1 from "../../assets/img/client1.png";
import client2 from "../../assets/img/client2.png";
import client3 from "../../assets/img/client3.png";
import client4 from "../../assets/img/client4.png";
import client5 from "../../assets/img/client5.png";
import client6 from "../../assets/img/client6.png";
import client7 from "../../assets/img/client7.png";
import fileview from "../../assets/img/fileview.png";
import download from "../../assets/img/download.png";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoCashSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import PaymentCard from "../../Components/PaymentCard";

export default function Payments() {
  useEffect(() => {
    document.title = "Payments";
  }, []);
  const cards = [
    {
      title: "Total Payouts",
      trend: "up",
      percentage: "10.0",
      amount: "300,000",
    },
    {
      title: "Total Receivables",
      trend: "up",
      percentage: "10.0",
      amount: "150,000",
    },
    {
      title: "Pending Payments",
      trend: "down",
      percentage: "8.2",
      amount: "80,000",
    },
  ];

  const serviceProviders = [
    {
      logo: client1,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Ricky Smith",
      email: "dan_reid@icloud.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Payout",
      status: "completed",
      view: fileview,
      download: download,
    },
    {
      logo: client2,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Frances Swann",
      email: "tracy_sullivan@yahoo.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Receivable",
      status: "completed",
      view: fileview,
      download: download,
    },
    {
      logo: client3,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "James Hall",
      email: "delores_acosta@outlook.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Receivable",
      status: "completed",
      view: fileview,
      download: download,
    },
    {
      logo: client4,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Mary Freund",
      email: "myrna_wood@yahoo.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Payout",
      status: "pending",
      view: fileview,
      download: download,
    },
    {
      logo: client5,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "David Elson",
      email: "everett_wade@outlook.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Payout",
      status: "completed",
      view: fileview,
      download: download,
    },
    {
      logo: client6,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Patricia Sanders",
      email: "vivian_morrison@yahoo.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Receivable",
      status: "pending",
      view: fileview,
      download: download,
    },
    {
      logo: client7,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Receivable",
      status: "pending",
      view: fileview,
      download: download,
    },
    {
      logo: client7,
      id: "#ID234",
      date: "Dec 30, 2024 10:18 am",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      service: "Service Name",
      serviceDescprition: "Descprition",
      type: "Payout",
      status: "pending",
      view: fileview,
      download: download,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const [checkedRows, setCheckedRows] = useState(
    new Array(serviceProviders.length).fill(false)
  );

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(serviceProviders.length).fill(isChecked));
  };

  const handleRowChange = (index) => (event) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = event.target.checked;
    setCheckedRows(newCheckedRows);
  };

  const isAllChecked = checkedRows.every(Boolean);
  const isIndeterminate =
    checkedRows.some(Boolean) && !checkedRows.every(Boolean);

  const tableheader = [
    <FormControlLabel
      key="parent-checkbox"
      control={
        <Checkbox
          sx={{
            color: "#34A853",
            "&.Mui-checked": {
              color: "#34A853",
            },
            "&.MuiCheckbox-indeterminate": {
              color: "#34A853",
            },
            py: 0,
          }}
          checked={isAllChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
      }
    />,
    "ID",
    "Date",
    "Customer",
    "Service",
    "Payment Type",
    "Status",
    "Action",
  ];

  const tablebody = serviceProviders.map((provider, index) => [
    <FormControlLabel
      key={`checkbox-${index}`}
      control={
        <Checkbox
          sx={{
            color: "#34A853",
            "&.Mui-checked": {
              color: "#34A853",
            },
            py: 0,
          }}
          checked={checkedRows[index]}
          onChange={handleRowChange(index)}
        />
      }
    />,
    provider.id,
    provider.date,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={provider.logo}
        alt={provider.name}
      />
      <div>
        <p>{provider.name}</p>
        <p>{provider.email}</p>
      </div>
    </div>,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <div>
        <p>{provider.service}</p>
        <p>{provider.serviceDescprition}</p>
      </div>
    </div>,
    provider.type,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <button
        className={`w-[100px] py-1 rounded-full font-medium ${
          provider.status === "completed"
            ? "bg-[#DCEEE1] text-[#34A853]"
            : "bg-[#FAE9D9] text-[#DB6E00]"
        }`}
      >
        {provider.status}
      </button>
    </div>,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <Link>
        <img
          className="w-[20px] h-auto object-cover"
          src={provider.view}
          alt={provider.view}
        />
      </Link>
      <Link>
        <img
          className="w-[20px] h-auto object-cover"
          src={provider.download}
          alt={provider.download}
        />
      </Link>
    </div>,
  ]);
  return (
    <div>
      <div className="my-2">
        <h2 className="font-semibold text-3xl myhead">Payments/ Payouts </h2>
        <p className="myblack">
          Manage and Track All Your Transactions Seamlessly.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label
            className="flex items-center border w-full sm:max-w-[300px] rounded-[8px] overflow-hidden"
            htmlFor="search"
          >
            <FiSearch className="ms-2" />
            <input
              className="w-full p-2 outline-none"
              type="search"
              name="search"
              id="search"
              placeholder="Search"
            />
          </label>
          <div className="flex items-center justify-end gap-3 ">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#16151C] border flex items-center gap-2 py-2 px-4 rounded-[8px] bg-white"
              >
                <RiEqualizerLine /> <span>More filters</span>
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Filter 1
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Filter 2
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Filter 3
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button className="text-[#16151C] border flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <IoMdDownload /> <span>Download Statement</span>
            </button>
            <button className="bg-[#34A853] text-[#fff] border border-[#34A853] flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <IoCashSharp /> <span>Setup Auto Payouts </span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <PaymentCard
              key={card.title}
              title={card.title}
              trend={card.trend}
              percentage={card.percentage}
              amount={card.amount}
            />
          ))
        ) : (
          <p>No favorites found</p>
        )}
      </div>
      <div className="mt-6">
        <Table headers={tableheader} rows={tablebody} />
      </div>
    </div>
  );
}
