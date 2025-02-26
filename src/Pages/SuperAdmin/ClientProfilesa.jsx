import React from "react";
import ClientProfile from "../../Components/Common/ClientProfile";

export default function ClientProfilesa() {
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Clients</h2>
        <p className="text-gray-600">Track and manage your clients.</p>
      </div>
      <ClientProfile />
    </div>
  );
}
