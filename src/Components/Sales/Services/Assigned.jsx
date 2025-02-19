import React, { useState } from "react";
import Table from "../../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import pro1 from "../../../assets/img/pro1.png";
import pro2 from "../../../assets/img/pro2.png";
import pro3 from "../../../assets/img/pro3.png";
import pro4 from "../../../assets/img/pro4.png";
import pro5 from "../../../assets/img/pro5.png";
import pro6 from "../../../assets/img/pro6.png";
import pro7 from "../../../assets/img/pro7.png";
import pro8 from "../../../assets/img/pro8.png";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Assigned() {
  const serviceProviders = [
    {
      id: "#ID234",
      email: "dan_reid@icloud.com",
      phone: "+5997186491311",
      services: 10,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.2,
    },
    {
      id: "#ID234",
      email: "tracy_sullivan@yahoo.com",
      phone: "+3822981276772",
      services: 8,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.8,
    },
    {
      id: "#ID234",
      email: "delores_acosta@outlook.com",
      phone: "+2930285126591",
      services: 5,
      compercent: "20%",
      comtotal: "$200",
      rating: 3.9,
    },
    {
      id: "#ID234",
      email: "myrna_wood@yahoo.com",
      phone: "+0852672848459",
      services: 8,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.5,
    },
    {
      id: "#ID234",
      email: "everett_wade@outlook.com",
      phone: "+5607223338746",
      services: 9,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.1,
    },
    {
      id: "#ID234",
      email: "vivian_morrison@yahoo.com",
      phone: "+3559590545722",
      services: 6,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.7,
    },
    {
      id: "#ID234",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      services: 44,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.7,
    },
    {
      id: "#ID234",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      services: 44,
      compercent: "20%",
      comtotal: "$200",
      rating: 4.7,
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
    "Service Provider ID",
    "Email",
    "Phone",
    "Number of Services",
    "Percentage Commission",
    "Total Commission",
    "Rating",
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
    provider.email,
    provider.phone,
    provider.services,
    provider.compercent,
    provider.comtotal,
    provider.rating,
    <Link className="text-[#0F91D2] underline underline-offset-[3px]">
      View Reviews
    </Link>,
  ]);
  return (
    <div>
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
