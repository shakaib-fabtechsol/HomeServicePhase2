import React from "react";
import ClientProfile from "../../Components/Common/ClientProfile";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetclientByIdQuery } from "../../services/clients";
import Swal from "sweetalert2";
import Loader from "../../Components/MUI/Loader";
export default function ClientProfilesa() {
  const location=useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const { data: clientData, isLoading, isError } = useGetclientByIdQuery(id);

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
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Clients</h2>
        <p className="text-gray-600">Track and manage your clients.</p>
      </div>
      <ClientProfile clientData={clientData} />
    </div>
  );
}
