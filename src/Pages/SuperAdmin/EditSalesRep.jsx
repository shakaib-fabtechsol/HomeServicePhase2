import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import TabComponent from "../../Components/TabComponent";
import { SlLock } from "react-icons/sl";
import PersonalInfo from "../../Components/SuperAdmin/salesrep.jsx/PersonalInfo";
import Access from "../../Components/SuperAdmin/salesrep.jsx/Access";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetsaleByIdQuery, useUpdateSaleMutation } from "../../services/sales";
import Loader from "../../Components/MUI/Loader";

export default function EditSalesRep() {
  const [value,setValue]=useState(0)
  const location=useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetsaleByIdQuery(id);
  const [updateSale, { isLoading: updateClientLoading, isError: updateClientError }] =useUpdateSaleMutation()



  useEffect(() => {
    document.title = "Edit Sales Rep";
  }, []);
  const changetab=(tab)=>{
    setValue(tab);

  }




  const tabData = [
    {
      label: (
        <div className="flex items-baseline gap-1">
          <FaUser/>
          <p>Personal Information</p>
        </div>
      ),
      content: <PersonalInfo data={data?.GetSalesReps} id={id} updateSale={updateSale}  />,
    },
    {
      label: (
        <div className="flex items-baseline gap-1">
          <SlLock />
          <p>Access</p>
        </div>
      ),
      content: <Access data={data?.GetSalesReps} id={id} updateSale={updateSale} />,
    },
  ];
  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Client Not Found',
      text: clientData?.error?.message || 'Failed to get client. Please try again.',
    })
  }
  if (isLoading || updateClientLoading) {
    return (
      <div >
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Edit Sales Rep</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
      <div className="border border-[#A2A1A833] rounded-[10px] p-3">
        <TabComponent tabs={tabData} onChange={changetab} value={value} />
      </div>
    </>
  );
}
