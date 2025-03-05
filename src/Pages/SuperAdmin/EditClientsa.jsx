import React from "react";
import EditClient from "../../Components/Common/EditClient";
import { useGetclientByIdQuery, useUpdateClientMutation } from "../../services/clients";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Components/MUI/Loader";

export default function EditClientsa() {
  const location = useLocation();
  const { id } = location.state || {};
  const { data: clientData, isLoading, isError,error } = useGetclientByIdQuery(id);
  const [updateClient, { isLoading: updateClientLoading }] = useUpdateClientMutation();
  if (isLoading || updateClientLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Client Not Found",
      text:
      error?.message || "Failed to get client. Please try again.",
    });

  }
  return (
    <div>
      <EditClient
        updateClient={updateClient}
        clientData={clientData}
        oncancel={"/superadmin/clients"}
        onsave={"/superadmin/clients"}
      />
    </div>
  );
}
