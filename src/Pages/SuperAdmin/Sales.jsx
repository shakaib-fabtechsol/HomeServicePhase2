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
import { LuEye, LuPlus } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { HiXMark } from "react-icons/hi2";

export default function Sales() {
  useEffect(() => {
    document.title = "Sales Reps";
  }, []);

  const [addtaskopen, setaddtaskOpen] = React.useState(true);
  const handleaddtaskOpen = () => setaddtaskOpen(true);
  const handleaddtaskClose = () => setaddtaskOpen(false);

  const serviceProviders = [
    {
      logo: client1,
      id: "#ID234",
      name: "Ricky Smith",
      email: "dan_reid@icloud.com",
      phone: "+5997186491311",
    },
    {
      logo: client2,
      id: "#ID234",
      name: "Frances Swann",
      email: "tracy_sullivan@yahoo.com",
      phone: "+3822981276772",
    },
    {
      logo: client3,
      id: "#ID234",
      name: "James Hall",
      email: "delores_acosta@outlook.com",
      phone: "+2930285126591",
    },
    {
      logo: client4,
      id: "#ID234",
      name: "Mary Freund",
      email: "myrna_wood@yahoo.com",
      phone: "+0852672848459",
    },
    {
      logo: client5,
      id: "#ID234",
      name: "David Elson",
      email: "everett_wade@outlook.com",
      phone: "+5607223338746",
    },
    {
      logo: client6,
      id: "#ID234",
      name: "Patricia Sanders",
      email: "vivian_morrison@yahoo.com",
      phone: "+3559590545722",
    },
    {
      logo: client7,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
    },
    {
      logo: client7,
      id: "#ID234",
      name: "Dennis Callis",
      email: "ervin_hubbard@icloud.com",
      phone: "+6921978825644",
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
    "Sales Reps ID",
    "Client Name",
    "Email",
    "Phone",
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
    <div className="flex items-center gap-2">
      <Link to="/superadmin/salesrepd">
        <LuEye className="text-[20px]" />
      </Link>
      <Link to="/superadmin/editsalesrep">
        <SlPencil className="text-[20px]" />
      </Link>
      <button>
        <HiOutlineTrash className="text-[20px]" />
      </button>
    </div>,
  ]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Sales</h2>
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
            <button
              onClick={handleaddtaskOpen}
              className="text-white bg-[#0F91D2] border border-[#0F91D2] font-semibold text-sm flex items-center gap-2 py-2 px-4 rounded-[8px]"
            >
              <LuPlus className="text-lg" />
              <span>Invite Sales Rep</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Table headers={tableheader} rows={tablebody} />
      </div>
      <Modal
        open={addtaskopen}
        onClose={handleaddtaskClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[400px] -translate-y-1/2 outline-none">
          <div className="rounded-[12px] bg-white">
            <div className="py-2 px-3 flex items-center justify-between border-b border-[#00000080]">
              <p className="text-sm font-semibold">Invite Sales Rep</p>
              <button>
                <HiXMark />
              </button>
            </div>
            <div className="p-3">
              <label htmlFor="nameormail" className="text-sm text-black">
                Name or Email
              </label>
              <input
                className="border border-[#E5E0EB] block outline-none w-full p-2 rounded-[5px] mt-1"
                type="text"
                name="nameormail"
                id="nameormail"
                placeholder="Invite by name or email"
              />
              <div className="mt-3">
                  <button></button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
