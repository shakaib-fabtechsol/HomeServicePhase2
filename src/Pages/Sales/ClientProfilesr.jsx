import React from "react";
import ClientProfile from "../../Components/Common/ClientProfile";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/MUI/Loader";
import Swal from "sweetalert2";
import { useGetsaleclientByIdQuery } from "../../services/clients";

export default function ClientProfilesr() {
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
  return (
    <div>
      <ClientProfile clientData={clientData} />
    </div>
  );
}
