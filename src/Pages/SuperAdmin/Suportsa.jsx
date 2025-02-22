import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import client1 from "../../assets/img/client1.png";
import client2 from "../../assets/img/client2.png";
import client3 from "../../assets/img/client3.png";
import client4 from "../../assets/img/client4.png";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import { IoMdSave } from "react-icons/io";

export default function Supportsa() {
  useEffect(() => {
    document.title = "Support";
  }, []);
  const serviceProviders = [
    {
      logo: client1,
      id: "#ID234",
      name: "Ricky Smith",
      email: "dan_reid@icloud.com",
      subject: "Login Issue",
      message: "Unable to log in to my account.",
    },
    {
      logo: client2,
      id: "#ID234",
      name: "Frances Swann",
      email: "tracy_sullivan@yahoo.com",
      subject: "Login Issue",
      message: "Unable to log in to my account.",
    },
    {
      logo: client3,
      id: "#ID234",
      name: "James Hall",
      email: "delores_acosta@outlook.com",
      subject: "Login Issue",
      message: "Unable to log in to my account.",
    },
    {
      logo: client4,
      id: "#ID234",
      name: "Mary Freund",
      email: "myrna_wood@yahoo.com",
      subject: "Login Issue",
      message: "Unable to log in to my account.",
    },
  ];

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
    "Client ID",
    "Client Name",
    "Email",
    "Subject",
    "Message",
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
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={provider.logo}
        alt={provider.name}
      />
      <p>{provider.name}</p>
    </div>,
    provider.email,
    provider.subject,
    provider.message,
    <select className="form-select px-2 py-2 rounded-lg border focus-none">
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="resolved">Resolved</option>
    </select>,
    <button className="btn btn-success">
      <IoMdSave className="text-xl"/>
    </button>,
  ]);

  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Support</h2>
        <p className="text-gray-600">
          Track and manage complaints.
        </p>
      </div>
      <div>
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
            />
          </label>
          <div className="ms-auto">
            <button className="text-[#16151C] border flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <RiEqualizerLine /> <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Table headers={tableheader} rows={tablebody} />
      </div>
    </div>
  );
}
