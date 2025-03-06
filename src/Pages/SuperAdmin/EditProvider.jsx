import React from "react";
import EditClient from "../../Components/Common/EditClient";
import { useGetclientByIdQuery, useUpdateClientMutation } from "../../services/clients";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Components/MUI/Loader";
import { useGetproviderByIdQuery, useUpdateProviderMutation } from "../../services/serviceprovider";
import EditProvidercomponent from "../../Components/Common/EditProvider";

export default function EditProvider() {
    const navigate=useNavigate();
  const location = useLocation();
  const { Id } = location.state || {};


  const { data: providerData, isLoading, isError,error } = useGetproviderByIdQuery(Id);

  console.log(providerData?.user,"this is provider data")
  const [updateProvider, { isLoading: updateClientLoading }] = useUpdateProviderMutation();
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
      title: "Provider Not Found",
      text: error?.message || "Failed to get Provider. Please try again.",
    }).then(() => {
      navigate("/superadmin/providers");
    });
  }
  return (
    <div>
      <EditProvidercomponent
        updateClient={updateProvider}
        user={providerData?.user}
        oncancel={"/superadmin/providers"}
        onsave={"/superadmin/providers"}
      />
    </div>
  );
}
