import React, { useEffect } from "react";
import Table from "../../Components/Table";
import pro1 from "../../assets/img/userimg.png";
import ConversationHeader from "./ConversationHeader";
import { getTimeDifferenceFromNow, transformDateToLocalString } from "../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ConversationTable({ title, subtitle, data }) {
  // Function to export data as JSON
  useEffect(() => {
    document.title = title;
  }, []);

  const exportToJson = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, "_")}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableHeader = [
    "Name & Profile Image",
    "City & State",
    "Service Name",
    "Date & Time",
    "Phone Number",
  ];

  const tableBody = data?.map((record, index) => [
    <div className="flex items-center gap-3" key={`name-${index}`}>
      <img
        className="size-10 max-w-10 rounded-full object-cover bg-[#CFCFCF33]"
        src={record?.customer?.personal_image ? `${BASE_URL}/uploads/${record?.customer?.personal_image}` : pro1}
        alt={record?.customer?.name || "User"}
      />
      <div>
        <p className="font-semibold text-md">{record?.customer?.name}</p>
        <p>{record?.text}</p>
      </div>
    </div>,
    record?.customer?.location || "N/A",
    record?.deal?.service_title || "N/A",
    transformDateToLocalString(record?.created_at),
    <div key={`phone-${index}`}>
      <p className="font-bold text-md">{record?.created_at.slice(0,10)}</p>
      <p>{record?.customer?.phone || "N/A"}</p>
    </div>,
  ]);

  return (
    <div>
      <ConversationHeader exportToJson={exportToJson}  title={title} subtitle={subtitle} />
      <div className="mt-5 flex justify-between">
        
      </div>
      <div className="mt-5">
        <Table headers={tableHeader} rows={tableBody} />
      </div>
    </div>
  );
}
