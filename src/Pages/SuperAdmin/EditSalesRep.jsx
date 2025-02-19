import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import TabComponent from "../../Components/TabComponent";
import { SlLock } from "react-icons/sl";
import PersonalInfo from "../../Components/SuperAdmin/salesrep.jsx/PersonalInfo";
import Access from "../../Components/SuperAdmin/salesrep.jsx/Access";

export default function EditSalesRep() {
  useEffect(() => {
    document.title = "Edit Sales Rep";
  }, []);
  const tabData = [
    {
      label: (
        <div className="flex items-baseline gap-1">
          <FaUser />
          <p>Personal Information</p>
        </div>
      ),
      content: <PersonalInfo />,
    },
    {
      label: (
        <div className="flex items-baseline gap-1">
          <SlLock />
          <p>Access</p>
        </div>
      ),
      content: <Access />,
    },
  ];
  return (
    <>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Edit Sales Rep</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
      <div className="border border-[#A2A1A833] rounded-[10px] p-3">
        <TabComponent tabs={tabData} />
      </div>
    </>
  );
}
