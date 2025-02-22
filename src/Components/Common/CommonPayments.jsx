import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
import logo from "../../assets/img/logo.png";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoCashSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import PaymentCard from "../../Components/PaymentCard";

export default function CommonPayments() {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        className={`w-[100px] py-1 rounded-full font-medium capitalize ${
          provider.status === "completed"
            ? "bg-[#DCEEE1] text-[#34A853]"
            : "bg-[#FAE9D9] text-[#DB6E00]"
        }`}
      >
        {provider.status}
      </button>
    </div>,
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <Link onClick={handleOpen}>
        <img
          className="w-5 max-w-5 object-conatin"
          src={provider.view}
          alt={provider.view}
        />
      </Link>
      <Link>
        <img
          className="w-5 max-w-5 object-conatin"
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px]">
          <div className="bg-white rounded-[12px] p-1">
            <div className="px-3 py-4 max-h-[calc(100dvh-40px)] overflow-y-auto scroll-x-hidden">
              <div className="flex justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="w-[100px] h-auto object-scale-down"
                />
              </div>
              <div className="p-3 bg-[#F8F8F8] mt-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">Invoice</p>
                  <div className="block">
                    <p className="text-xs">Invoice No.</p>
                    <p className="text-sm font-semibold">#ID234</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold">Customer:</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center mt-2">
                      <img
                        src={client1}
                        alt="client1"
                        className="w-[40px] h-[40px] object-cover rounded-full me-2"
                      />
                      <div className="block">
                        <p className="text-sm font-semibold">James Hall</p>
                        <p className="text-xs">
                          dennis416@gmail.com / (917) 339-6416
                        </p>
                      </div>
                    </div>
                    <div className="block">
                      <p className="text-xs">Date of Payment</p>
                      <p className="text-xs">Dec 4, 2024 2:27 pm</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold">Service Pro:</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center mt-2">
                      <img
                        src={client1}
                        alt="client1"
                        className="w-[40px] h-[40px] object-cover rounded-full me-2"
                      />
                      <div className="block">
                        <p className="text-sm font-semibold">Condol</p>
                        <p className="text-xs">
                          dennis416@gmail.com / (917) 339-6416
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Deliverables</p>
                <div className="my-2">
                  <span className="text-[#0F91D2] bg-[#DDF0F9] px-3 py-1 rounded-full">
                    Cleaning
                  </span>
                </div>
                <p>
                  Aliquam erat volutpat. Ut semper ipsum in vestibulum laoreet.
                </p>
              </div>
              <div className="mt-4 border-b">
                <p className="font-semibold">Services</p>
                <table className="w-full mt-4">
                  <thead className="text-xs ">
                    <tr className="align-middle">
                      <td className="p-3">Service Name</td>
                      <td className="p-3">Price</td>
                      <td className="p-3">Total</td>
                    </tr>
                  </thead>
                  <tbody className="text-xs ">
                    <tr className="align-middle">
                      <td className="p-3">Discription</td>
                      <td className="p-3">4,000.00</td>
                      <td className="p-3">4,000.00</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="p-3">Charges</td>
                      <td className="p-3">5 %</td>
                      <td className="p-3">3200.00</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="p-3"></td>
                      <td className="p-3">Total(USD)</td>
                      <td className="p-3 text-lg font-bold">3200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="reset"
                  className="border border-[#cdcdcd] rounded-lg w-full py-[10px] me-4 font-semibold bg-[#ffffff]"
                >
                  {" "}
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`border rounded-lg w-full py-[10px] text-white font-semibold bg-[#0F91D2]`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
