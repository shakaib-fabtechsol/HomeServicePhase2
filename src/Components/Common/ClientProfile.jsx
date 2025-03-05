import React from "react";
import { useGetsaleclientByIdQuery } from "../../services/clients";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../MUI/Loader";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL

export default function ClientProfile() {

  const location=useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const { data: clientData, isLoading, isError } = useGetsaleclientByIdQuery(id);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Client Not Found',
      text: clientData?.error?.message || 'Failed to get client. Please try again.',
    }).then(() => {
      navigate('/sales/clients');
    })
  }
  // name: clientData?.Customer?.name || "",
  // phone: clientData?.Customer?.phone || "",
  // email: clientData?.Customer?.email || "",
  // location: clientData?.Customer?.location || "",


  return (
    <div className="border border-[#A2A1A833] p-3 rounded-[10px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:pe-7 mt-4">
        <div className="flex flex-col gap-3 order-2 sm:order-1">
          <div>
            <p className="font-semibold text-[#181D27] text-lg">Name</p>
            <p className="text-[#535862] text-lg">{clientData?.Customer?.name || "NA"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#181D27] text-lg">
              Contact Email
            </p>
            <p className="text-[#535862] text-lg">{clientData?.Customer?.email || "NA"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#181D27] text-lg">Phone Number</p>
            <p className="text-[#535862] text-lg">{clientData?.Customer?.phone || "NA"}</p>
          </div>
          <div>
            <p className="font-semibold text-[#181D27] text-lg">Address</p>
            <p className="text-[#535862] text-lg">{clientData?.Customer?.location || "NA"}</p>
          </div>
        </div>
        <div className="flex order-1 sm:order-2">
          <div className="max-w-[200px] w-full mx-auto sm:me-0">
            <img
              className="w-full h-full object-cover aspect-square rounded-full"
              src={`${BASE_URL}/uploads/${clientData?.Customer?.personal_image}`}
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
