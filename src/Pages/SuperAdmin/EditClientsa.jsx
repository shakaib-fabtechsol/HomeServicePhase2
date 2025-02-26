import React from "react";
import EditClient from "../../Components/Common/EditClient";

export default function EditClientsa() {
  return (
    <div>
      <EditClient
        oncancel={"/superadmin/clients"}
        onsave={"/superadmin/clients"}
      />
    </div>
  );
}
