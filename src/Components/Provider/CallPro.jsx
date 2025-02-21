import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import pro1 from "../../assets/img/userimg.png";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import ConversationHeader from "./ConversationHeader";

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
      <ConversationHeader
        title="Call Pro"
        subtitle="Manage and Respond to Messages Seamlessly"
      />
      <div className="mt-5">
        <Table headers={tableheader} rows={tablebody} />
      </div>
    </div>
  );
}
