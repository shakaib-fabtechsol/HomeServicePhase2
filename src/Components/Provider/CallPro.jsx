import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import pro1 from "../../assets/img/userimg.png";
import pro2 from "../../assets/img/pro2.png";
import pro3 from "../../assets/img/pro3.png";
import pro4 from "../../assets/img/pro4.png";
import pro5 from "../../assets/img/pro5.png";
import pro6 from "../../assets/img/pro6.png";
import pro7 from "../../assets/img/pro7.png";
import pro8 from "../../assets/img/pro8.png";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function CallPro() {
  useEffect(() => {
    document.title = "Conversations";
  }, []);
  const serviceConversations = [
    {
      logo: pro1,
      name: "James Hall",
      des: "Lorem ipsum dolor sit amet",
      city: "Los Angeles, CA",
      serviceName: "Deal name",
      date: "Dec 21, 2024 7:59 pm",
      phone: "+1 (812) 000-0000",
    },
    {
      logo: pro1,
      name: "James Hall",
      des: "Lorem ipsum dolor sit amet",
      city: "Los Angeles, CA",
      serviceName: "Deal name",
      date: "Dec 21, 2024 7:59 pm",
      phone: "+1 (812) 000-0000",
    },
    {
      logo: pro1,
      name: "James Hall",
      des: "Lorem ipsum dolor sit amet",
      city: "Los Angeles, CA",
      serviceName: "Deal name",
      date: "Dec 21, 2024 7:59 pm",
      phone: "+1 (812) 000-0000",
    },
    {
      logo: pro1,
      name: "James Hall",
      des: "Lorem ipsum dolor sit amet",
      city: "Los Angeles, CA",
      serviceName: "Deal name",
      date: "Dec 21, 2024 7:59 pm",
      phone: "+1 (812) 000-0000",
    },
  ];

  const [checkedRows, setCheckedRows] = useState(
    new Array(serviceConversations.length).fill(false)
  );

  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedRows(new Array(serviceConversations.length).fill(isChecked));
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
    "Name & Profile image",
    "City & State",
    "Service Name",
    "Date & time",
    "Phone Number",
  ];

  const tablebody = serviceConversations.map((provider, index) => [
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={provider.logo}
        alt={provider.name}
      />
      <div>
        <p className="font-semibold text-md">{provider.name}</p>
        <p>{provider.des}</p>
      </div>
    </div>,
    provider.city,
    provider.serviceName,
    provider.date,
    <div>
      <p className="font-bold text-md">Now</p>
      <p>{provider.phone}</p>
    </div>,
  ]);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Call Pro</h2>
        <p className="text-gray-600">
          Manage and Respond to Messages Seamlessly
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
            <button className="text-[#0F91D2] border border-[#0F91D2] flex items-center gap-2 py-2 px-4 rounded-[8px]">
              <MdOutlineFileDownload />
              <span>Export Data</span>
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
