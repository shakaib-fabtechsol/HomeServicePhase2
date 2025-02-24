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
import { FiSearch } from "react-icons/fi";
import { RiEqualizerLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Clients() {
  useEffect(() => {
    document.title = "Clients";
  }, []);
  const serviceProviders = [
    {
      logo: client1,
      id: "#ID234",
      name: "Ricky Smith",
      email: "dan_reid@icloud.com",
      phone: "+5997186491311",
      address: "4300 Lakeville Road, Geneseo NY 14454",
    },
    {
      logo: client2,
      id: "#ID234",
      name: "Frances Swann",
      email: "tracy_sullivan@yahoo.com",
      phone: "+3822981276772",
      address: "591 Memorial Dr, Chicopee MA 1020",
    },
    {
      logo: client3,
      id: "#ID234",
      name: "James Hall",
      email: "delores_acosta@outlook.com",
      phone: "+2930285126591",
      address: "5399 W Genesse St, Camillus NY 13031",
    },
    {
      logo: client4,
      id: "#ID234",
      name: "Mary Freund",
      email: "myrna_wood@yahoo.com",
      phone: "+0852672848459",
      address: "30 Memorial Drive, Avon MA 2322",
    },
    {
      logo: client5,
      id: "#ID234",
      name: "David Elson",
      email: "everett_wade@outlook.com",
      phone: "+5607223338746",
      address: "1400 County Rd 64, Horseheads NY 14845",
    },
    {
      logo: client6,
      id: "#ID234",
      name: "Patricia Sanders",
      email: "vivian_morrison@yahoo.com",
      phone: "+3559590545722",
      address: "4300 Lakeville Road, Geneseo NY 14454",
    },
    {
      logo: client7,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      address: "121 Worcester Rd, Framingham MA 1701",
    },
    {
      logo: client7,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
      address: "4300 Lakeville Road, Geneseo NY 14454",
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
    "Phone",
    "Address",
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
    provider.address,
    <div className="flex items-center gap-2">
      <Link to="/superadmin/prodetails">
        <LuEye className="text-[20px]" />
      </Link>
      <Link to="/superadmin/editclient">
        <SlPencil className="text-[20px]" />
      </Link>
    </div>,
  ]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Clients</h2>
        <p className="text-gray-600">
          Track and manage your clients.
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
              placeholder="Search"
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
