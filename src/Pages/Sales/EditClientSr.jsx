import React from "react";
import EditClient from "../../Components/Common/EditClient";
import { useLocation } from "react-router-dom";
import { useGetsaleclientByIdQuery, useUpdatesaleClientMutation } from "../../services/clients";
import Loader from "../../Components/MUI/Loader";
import Swal from "sweetalert2";

export default function EditClientSr() {
  const location = useLocation();
  const { id } = location.state || {};
  const { data: clientData, isLoading, isError,error } = useGetsaleclientByIdQuery(id);
  const [updateClient, { isLoading: updateClientLoading }] = useUpdatesaleClientMutation();
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
       oncancel={"/sales/clients"} onsave={"/sales/clients"} />
    </div>
  );
}
