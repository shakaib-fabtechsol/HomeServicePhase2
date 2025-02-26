import React from "react";
import EditClient from "../../Components/Common/EditClient";

export default function EditClientSr() {
  return (
    <div>
      <EditClient oncancel={"/sales/clients"} onsave={"/sales/clients"} />
    </div>
  );
}
