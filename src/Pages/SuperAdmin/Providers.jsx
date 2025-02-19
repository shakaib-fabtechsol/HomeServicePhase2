import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import pro1 from "../../assets/img/pro1.png";
import pro2 from "../../assets/img/pro2.png";
import pro3 from "../../assets/img/pro3.png";
import pro4 from "../../assets/img/pro4.png";
import pro5 from "../../assets/img/pro5.png";
import pro6 from "../../assets/img/pro6.png";
import pro7 from "../../assets/img/pro7.png";
import pro8 from "../../assets/img/pro8.png";
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Providers() {
  useEffect(() => {
    document.title = "Providers";
  }, []);
  const serviceProviders = [
    {
      logo: pro1,
      id: "#ID234",
      name: "Ricky Smith",
      email: "dan_reid@icloud.com",
      phone: "+5997186491311",
      services: 10,
      rating: 4.2,
    },
    {
      logo: pro2,
      id: "#ID234",
      name: "Frances Swann",
      email: "tracy_sullivan@yahoo.com",
      phone: "+3822981276772",
      services: 8,
      rating: 4.8,
    },
    {
      logo: pro3,
      id: "#ID234",
      name: "James Hall",
      email: "delores_acosta@outlook.com",
      phone: "+2930285126591",
      services: 5,
      rating: 3.9,
    },
    {
      logo: pro4,
      id: "#ID234",
      name: "Mary Freund",
      email: "myrna_wood@yahoo.com",
      phone: "+0852672848459",
      services: 8,
      rating: 4.5,
    },
    {
      logo: pro5,
      id: "#ID234",
      name: "David Elson",
      email: "everett_wade@outlook.com",
      phone: "+5607223338746",
      services: 9,
      rating: 4.1,
    },
    {
      logo: pro6,
      id: "#ID234",
      name: "Patricia Sanders",
      email: "vivian_morrison@yahoo.com",
      phone: "+3559590545722",
      services: 6,
      rating: 4.7,
    },
    {
      logo: pro7,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      services: 44,
      rating: 4.7,
    },
    {
      logo: pro8,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      services: 44,
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
    "Service Provider Name & Logo",
    "Email",
    "Phone",
    "Number of Services",
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
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={provider.logo}
        alt={provider.name}
      />
      <p>{provider.name}</p>
    </div>,
    provider.email,
    provider.phone,
    provider.services,
    provider.rating,
    <div className="flex items-center gap-2">
      <Link to="/superadmin/prodetails">
        <LuEye className="text-[20px]" />
      </Link>
      <button>
        <SlPencil className="text-[20px]" />
      </button>
    </div>,
  ]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Providers</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
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
