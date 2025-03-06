import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import pro1 from "../../assets/img/userimg.png";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import ConversationHeader from "./ConversationHeader";
import { getTimeDifferenceFromNow, transformDateToLocalString } from "../../utils";
const BASE_URL = import.meta.env.VITE_BASE_URL

export default function CallPro({ data }) {
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

  console.log( " CallPro data", data)

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

  const tablebody = data?.map((record, index) => [
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={`${BASE_URL}/uploads/${record?.customer?.personal_image}` || pro1}
        // src={record?.customer?.personal_image}
        alt={record?.customer?.name}
      />
      <div>
        <p className="font-semibold text-md">{record?.customer?.name}</p>
        <p>{record?.text}</p>
      </div>
    </div>,
    record?.customer?.location,
    record?.deal.service_title,
    transformDateToLocalString(record?.created_at),
    <div>
      <p className="font-bold text-md">{getTimeDifferenceFromNow(record?.created_at)}</p>
      <p>{record?.customer?.phone}</p>
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
