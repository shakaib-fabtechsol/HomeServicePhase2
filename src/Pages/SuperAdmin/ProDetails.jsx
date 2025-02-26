import React, { useEffect, useState } from "react";
import ProfileComponent from '../../Components/ProfileComponent'

export default function ProDetails() {
  useEffect(() => {
    document.title = "Providers Details";
  }, []);
  return (
    <div>
      <ProfileComponent userRole="superadmin" serviceDetailTo="/superadmin/dealDetails"/>
    </div>
  )
}
